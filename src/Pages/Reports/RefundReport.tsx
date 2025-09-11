import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { REFUND_REPORT_KEY, REFUND_REPORT_URL, refundReportHeaders, refundReportInitialValues, refundReportSchema, RefundReportTableType, transformToRefundReportPayload } from "../../Config/Reports/RefundReportConfig";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { RefreshIcon } from "../../assets/Icons";

const RefundReport = () => {

  const dispatch = useAppDispatch();
  const [reportFilter, setReportFilter] = useState<Record<string, any> | null>(null);
  const [reportUrl, setReportUrl] = useState<string>(REFUND_REPORT_URL);
  const dataRef = useRef<RefundReportTableType[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    refundReportHeaders.map((h) => h.key as string)
  );

  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const combinedFilter = {
    ...(reportFilter || {}),
    ...(submittedFilter || {}),
  };

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<RefundReportTableType>({
      key: REFUND_REPORT_KEY,
      url: shouldFetch ? reportUrl : "",
      filter: shouldFetch ? combinedFilter : null,
      refreshKey,
      method: "GET",
    });

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: REFUND_REPORT_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: 10 },
      })
    );
    setSubmittedFilter({ [key]: value });
  };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Refund-report");
  };

  const throttledSubmit = useThrottledFormSubmit((values: any) => {

    const filterPayload = transformToRefundReportPayload(values);
    setReportFilter(filterPayload);
    setReportUrl(`${REFUND_REPORT_URL}/search`);
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
    dispatch(resetMaster(REFUND_REPORT_KEY));
    setVisibleColumns(refundReportHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
    setFilterValues({});
    setFilterVisible(false);
    setSubmittedFilter(null)
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        REFUND REPORT
      </TextComponent>

      <Formik
        initialValues={refundReportInitialValues}
        validationSchema={Yup.object(refundReportSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {

          const { hierarchyList, loadingHierarchyList, refetchHierarchy } = useHierarchySubHierarchy({});

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 5, md: 3, lg: 3 }} >
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
                    name="hierarchyType"
                    size="xs"
                    label="Hierarchy Type"
                    placeholder="Select Hierarchy Type"
                    data={hierarchyList}
                    disabled={loadingHierarchyList}
                    withAsterisk
                    required
                    rightSection={
                      <>
                        {loadingHierarchyList && (
                          <Loader size={14} color="blue" />
                        )}
                        {!loadingHierarchyList && hierarchyList.length < 1 && (
                          <div
                            onClick={refetchHierarchy}
                            className="cursor-pointer"
                            style={{ pointerEvents: "auto", display: "flex", alignItems: "center" }}
                            title="Refresh Hierarchy List"
                          >
                            <RefreshIcon />
                          </div>
                        )}
                      </>
                    }
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 3, md: 3, lg: 3 }}>
                  <FormikSelectComponent
                    name="walletType"
                    size="xs"
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    allowDeselect
                    data={[
                      { label: "PREPAID", value: "PREPAID" },
                      { label: "POSTPAID", value: "POSTPAID" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 3, md: 3, lg: 3 }}>
                  <div className="flex justify-end items-end h-full gap-2">
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

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onRefresh={handleRefresh}
                      onColumnChange={handleToggleColumn}
                      onExport={handleExportClick}
                      onFilter={() => setFilterVisible((prev) => !prev)}
                      headers={refundReportHeaders}
                      visibleColumns={visibleColumns}
                      loading={loading}
                      error={error ? error.toString() : null}
                    />
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
          <ShimmerTableRows rowCount={6} columnCount={refundReportHeaders.length} />
        ) : (
          <GenericMasterTable<RefundReportTableType>
            data={data}
            headers={refundReportHeaders.filter((h) =>
              visibleColumns.includes(h.key as string)
            )}
            pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            filterVisible={filterVisible}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            onFilterSubmit={handleFilterSubmit}
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

export default RefundReport;
