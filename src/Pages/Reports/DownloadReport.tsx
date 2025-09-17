import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Grid, Tooltip } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { DOWNLOAD_REPORT_KEY, DOWNLOAD_REPORT_URL, downloadReportHeaders, downloadReportInitialValues, downloadReportSchema, DownloadReportTableType, transformToDownloadReportPayload } from "../../Config/Reports/DownloadReportConfig";
import FormikDatePicker from "../../Components/Molecules/FormikDatePicker";
import { DownloadIcon } from "../../assets/Icons";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { downloadFileThunk } from "../../Redux/Features/Masters/MastersThunk";

const DownloadReport = () => {

  const dispatch = useAppDispatch();
  const [reportFilter, setReportFilter] = useState<Record<string, any> | null>(null);
  const dataRef = useRef<DownloadReportTableType[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    downloadReportHeaders.map((h) => h.key as string)
  );

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<DownloadReportTableType>({
      key: DOWNLOAD_REPORT_KEY,
      url: shouldFetch ? `${DOWNLOAD_REPORT_URL}/list` : "",
      filter: shouldFetch ? reportFilter : null,
      refreshKey,
      method: "GET",
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Download-report");
  };

  const throttledSubmit = useThrottledFormSubmit((values: any) => {

    const filterPayload = transformToDownloadReportPayload(values);
    setReportFilter(filterPayload);
    setShouldFetch(true);
  }, 3000);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(DOWNLOAD_REPORT_KEY));
    setVisibleColumns(downloadReportHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  const handleDownload = (item: DownloadReportTableType) => {
    dispatch(
      downloadFileThunk({
        url: `${API_ENDPOINTS.REPORTS.REPORT}/download/${item.id}`,
        filename: item.fileName, // or .csv/.pdf etc.
      })
    );
  }

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        DOWNLOAD REPORT
      </TextComponent>

      <Formik
        initialValues={downloadReportInitialValues}
        validationSchema={Yup.object(downloadReportSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 5, md: 3, lg: 3 }} >
                  <FormikDatePicker
                    name="date"
                    label="Date"
                    placeholder="Select a Date"
                    size="xs"
                    required
                    maxDate={new Date}
                    valueFormat="YYYY-MM-DD"
                    leftIcon={<IconCalendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onRefresh={handleRefresh}
                      onColumnChange={handleToggleColumn}
                      onExport={handleExportClick}
                      headers={downloadReportHeaders}
                      visibleColumns={visibleColumns}
                      loading={loading}
                      error={error ? error.toString() : null}
                    />
                    <ButtonComponent
                      fontSize="14"
                      fullWidth={false}
                      radius={6}
                      style={{ height: 30 }}
                      size="sm"
                      borderColor="#fff"
                      variant="filled"
                      type="submit"
                      disabled={loading}
                      bgColor="#C30305"
                      textColor="#FFFFFF"
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
          <ShimmerTableRows rowCount={6} columnCount={downloadReportHeaders.length} />
        ) : (
          <GenericMasterTable<DownloadReportTableType>
            data={data}
            headers={downloadReportHeaders.filter((h) =>
              visibleColumns.includes(h.key as string)
            )}
            renderExtraHeader={() => <></>} // empty header for action column/>
            renderExtraRowCell={(item) => (
              <div className="flex justify-center gap-2 min-w-10">

                <Tooltip
                  label="Download Report" withArrow={false}
                  styles={{
                    tooltip: {
                      backgroundColor: 'grey',
                      color: 'white',
                      fontSize: '12px',
                    }
                  }}
                >
                  <span
                    onClick={() => handleDownload(item)}
                    className="cursor-pointer"
                  >
                    <DownloadIcon />
                  </span>
                </Tooltip>
              </div>
            )}
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

export default DownloadReport;
