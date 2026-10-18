import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { headers, initialValues, LOGS_REPORT_KEY, LOGS_REPORT_URL, LogsReportSchema, LogsReportTableType, transformToLogsReportFilter } from "../../Config/ReportLogs/LogsConfig";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { DownloadIcon } from "../../assets/Icons";
import { colors } from "../../theme/colors";

const Logs = () => {

  const [reportFilter, setReportFilter] = useState<Record<string, any> | null>(null);
  const [reportUrl, setReportUrl] = useState<string>(LOGS_REPORT_URL);
  const dataRef = useRef<LogsReportTableType[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<LogsReportTableType>({
      key: LOGS_REPORT_KEY,
      url: shouldFetch ? reportUrl : "",
      filter: shouldFetch ? reportFilter : null,
      method: "POST",
      defaultPageSize: 50
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Logs-report");
  };

  const throttledSubmit = useThrottledFormSubmit((values: any) => {

    const filterPayload = transformToLogsReportFilter(values);
    setReportFilter(filterPayload);

    if (values.logType) {
      setReportUrl(`${LOGS_REPORT_URL}/${values.logType}`);
    }
    setShouldFetch(true); //enable fetch only after form submit
  }, 3000);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        Logs
      </TextComponent>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(LogsReportSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 8, md: 3, lg: 3 }} >
                  <FormikDateRangePicker
                    name="dateRange"
                    label="Date Range"
                    placeholder="Select Date Range"
                    size="xs"
                    shortcuts
                    required
                    leftIcon={<IconCalendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 4, md: 3, lg: 3 }} >
                  <FormikSelectComponent
                    name="logType"
                    placeholder="Select log type"
                    label="Log Type"
                    size="xs"
                    allowDeselect={true}
                    searchable={true}
                    nothingFoundMessage="Not Found"
                    withAsterisk
                    required
                    data={[
                      { label: "Login Logs", value: "login-logs-json" },
                      { label: "Heirarchy Logs", value: "hierarchy-logs-json" },
                      { label: "Callback Logs", value: "callback-logs-json" },
                      { label: "Audit Logs", value: "audit-logs-json" },
                      { label: "Vendor Logs", value: "vendor-logs-json" },
                      { label: "System Logs", value: "im-logs-json" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <div className="flex h-full w-full items-end justify-end gap-2">
                    <ButtonComponent
                      style={{ padding: "4px 8px", height: 28 }}
                      radius={1}
                      textColor={colors.text.primary}
                      borderColor={colors.border.strong}
                      fontSize="14"
                      throttleMs={5000}
                      bgColor={colors.text.inverse}
                      onClick={handleExportClick}
                      leftIcon={<DownloadIcon />}
                      disabled={!!loading || !!error}
                    >
                      Export
                    </ButtonComponent>

                    <ButtonComponent
                      fontSize="14"
                      fullWidth={false}
                      radius={6}
                      style={{ height: 30 }}
                      size="sm"
                      borderColor={colors.text.inverse}
                      variant="filled"
                      type="submit"
                      disabled={loading}
                      bgColor={colors.brand.primary}
                      textColor={colors.text.inverse}
                    >
                      VIEW
                    </ButtonComponent>
                  </div>
                </Grid.Col>
              </Grid>
            </Form>
          )
        }}

      </Formik>

      {
        loading ? (
          // Render shimmer
          <ShimmerTableRows rowCount={6} columnCount={headers.length} />
        ) : (
          <GenericMasterTable<LogsReportTableType>
            data={data}
            headers={headers}
            pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSize={pagination.pageSize}
            pageSizeOptions={pageSizeSelectData}
            message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
          />
        )
      }
    </div >
  );
};

export default Logs;
