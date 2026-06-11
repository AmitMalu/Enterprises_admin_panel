import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch } from "../../Redux/hooks";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { LEDGER_REPORT_KEY, LEDGER_REPORT_URL, LedgerReportHeaders, ledgerReportInitialValues, LedgerReportTableType, LedgerReportValidationSchema } from "../../Config/Reports/LedgerReportConfig";
import { IconCalendar } from "@tabler/icons-react";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import moment from "moment";
import { colors } from "../../theme/colors";

const LedgerReport = () => {

  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<Record<string, any> | null>(null);

  const dataRef = useRef<LedgerReportTableType[] | null>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const [formValues, setFormValues] = useState(ledgerReportInitialValues);
  const [viewSubmitted, setViewSubmitted] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    LedgerReportHeaders.map((h) => h.key as string)
  );

  const { data,
    loading,
    pagination,
    error,
    setPage,
    setPageSize } =
    useFetchMasterList<LedgerReportTableType>({
      key: LEDGER_REPORT_KEY,
      url: viewSubmitted ? `${LEDGER_REPORT_URL}/view` : "",
      filter: viewSubmitted ? filter : null,
      method: "GET",
      refreshKey,
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;

    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Ledger-report");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    if (selectAll) {
      setVisibleColumns(LedgerReportHeaders.map((h) => h.key as string));
    } else {
      setVisibleColumns([]);
    }
  };

  const handleRefresh = () => {
    dispatch(resetMaster(LEDGER_REPORT_KEY));
    setVisibleColumns(LedgerReportHeaders.map((h) => h.key as string));
    setFilterVisible(false);
    setFilterValues({});
    const [fromDate, toDate] = formValues.dateRange || [];
    const filters = {
      fromDate: moment(fromDate).format("YYYY-MM-DD"),
      toDate: moment(toDate).format("YYYY-MM-DD"),
    }
    setFilter(filters);
    setSubmittedFilter(null);
    setRefreshKey((prev) => prev + 1);
  };

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    setFormValues(values);
    const [fromDate, toDate] = values.dateRange || [];
    const filters = {
      fromDate: moment(fromDate).format("YYYY-MM-DD"),
      toDate: moment(toDate).format("YYYY-MM-DD"),
    }
    setFilter(filters);
    setRefreshKey((prev) => prev + 1);
    setViewSubmitted(true);
  }, 3000);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: LEDGER_REPORT_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
      })
    );
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    return () => {
      setFormValues(ledgerReportInitialValues); // Reset form data on unmount
    }
  }, []);

  useEffect(() => {
    if (submittedFilter) {
      setFilter((prev: any) => ({ ...prev, ...submittedFilter }));
    }
  }, [submittedFilter])


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        Ledger Report
      </TextComponent>

      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={Yup.object(LedgerReportValidationSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {

          return (
            <Form className="flex flex-col gap-2 mt-4">
              <Grid gutter="sm">
                <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }} >
                  <FormikDateRangePicker
                    name="dateRange"
                    label="Date Range"
                    placeholder="Select Date Range"
                    size="xs"
                    shortcuts
                    required
                    maxDate={new Date()}
                    minDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
                    leftIcon={<IconCalendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onRefresh={handleRefresh}
                      onColumnChange={handleToggleColumn}
                      onToggleAll={handleToggleAllColumns}
                      onExport={handleExportClick}
                      onFilter={() => setFilterVisible((prev) => !prev)}
                      headers={LedgerReportHeaders}
                      visibleColumns={visibleColumns}
                      loading={loading}
                      error={error ? error.toString() : null}
                    />
                    <ButtonComponent
                      fontSize="14"
                      fullWidth={false}
                      radius={6}
                      style={{ height: 34 }}
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
          <ShimmerTableRows rowCount={6} columnCount={LedgerReportHeaders.length} />
        ) : (
          <GenericMasterTable<LedgerReportTableType>
            data={data}
            headers={LedgerReportHeaders.filter((h) =>
              visibleColumns.includes(h.key as string)
            )}
            pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSize={pagination.pageSize}
            pageSizeOptions={pageSizeSelectData}
            message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
            filterVisible={filterVisible}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            onFilterSubmit={handleFilterSubmit}
          />
        )
      }
    </div >
  );
};

export default LedgerReport;
