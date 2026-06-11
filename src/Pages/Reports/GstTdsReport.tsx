import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
// import { useSubProductList } from "../../Utils/hooks/useSubProductList";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { useEffect, useRef, useState } from "react";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GST_TDS_REPORT_KEY, GST_TDS_REPORT_URL, GstTdsheaders, GstTdsReportInitialValues, GstTdsReportSchema, GstTdsReportTableType, transformToGstTdsReportPayload } from "../../Config/Reports/GstTdsReportConfig";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { RefreshIcon } from "../../assets/Icons";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { colors } from "../../theme/colors";

const GstTdsReport = () => {

  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState<any>(null);

  const dataRef = useRef<GstTdsReportTableType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    GstTdsheaders.map((h) => h.key as string)
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const [viewSubmitted, setViewSubmitted] = useState(false);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<GstTdsReportTableType>({
      method: "POST",
      key: GST_TDS_REPORT_KEY,
      url: viewSubmitted ? `${GST_TDS_REPORT_URL}/view` : undefined,
      payload,
      refreshKey,
    });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {

    setPayload(() => ({
      ...transformToGstTdsReportPayload(values), // top filters
      ...(submittedFilter || {}),                      // keep inline filters
    }));

    // setRefreshKey((prev) => prev + 1);
    setViewSubmitted(true);
  }, 3000);

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "GstTds-report");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    if (selectAll) {
      setVisibleColumns(GstTdsheaders.map((h) => h.key as string));
    } else {
      setVisibleColumns([]);
    }
  };

  const handleRefresh = () => {
    // Reset redux pagination / master state
    dispatch(resetMaster(GST_TDS_REPORT_KEY));

    // Reset table view state
    setVisibleColumns(GstTdsheaders.map((h) => h.key as string));
    setFilterVisible(false);
    setFilterValues({});
    setSubmittedFilter(null);

    setPayload(transformToGstTdsReportPayload(GstTdsReportInitialValues));

    setRefreshKey((prev) => prev + 1);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: GST_TDS_REPORT_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
      })
    );
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (submittedFilter) {
      setPayload((prev: any) => ({ ...prev, ...submittedFilter }));
    }
  }, [submittedFilter])

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Gst/Tds Report
      </TextComponent>

      <GenericMasterToolbar
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={GstTdsheaders}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      <Formik
        key={refreshKey}
        initialValues={GstTdsReportInitialValues}
        validationSchema={Yup.object(GstTdsReportSchema)}
        enableReinitialize
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {
          const { productDropdownData, loadingProductList, refetchProducts } = useProductSubProduct({});

          const { hierarchyList, loadingHierarchyList, subHierarchyList, loadingSubHierarchyList, subHierarchyKey } = useHierarchySubHierarchy({
            selectedHierarchyCode: values.hierarchy,
            onSubHierarchyReset: () => setFieldValue("hierarchyId", "")
          })

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 5, md: 3, lg: 2.5 }}>
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

                <Grid.Col span={{ base: 3, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    placeholder="Select Product"
                    size="xs"
                    // withAsterisk
                    // required
                    allowDeselect={true}
                    searchable={true}
                    data={productDropdownData}
                    disabled={loadingProductList}
                    rightSection={
                      <>
                        {loadingProductList && (
                          <Loader size={14} color="blue" />
                        )}
                        {!loadingProductList && productDropdownData.length < 1 && (
                          <div
                            onClick={refetchProducts}
                            className="cursor-pointer"
                            style={{ pointerEvents: "auto", display: "flex", alignItems: "center" }}
                            title="Refresh Products"
                          >
                            <RefreshIcon />
                          </div>
                        )}
                      </>
                    }
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="reportType"
                    size="xs"
                    label="Report Type"
                    placeholder="Select Report Type"
                    // withAsterisk
                    // required
                    allowDeselect={true}
                    data={[
                      { label: "GST", value: "GST" },
                      { label: "TDS", value: "TDS" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 4, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="hierarchy"
                    size="xs"
                    label="Hierarchy"
                    placeholder="Select Hierarchy"
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    data={hierarchyList}
                    disabled={loadingHierarchyList}
                    // withAsterisk
                    // required
                    allowDeselect={true}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 5, md: 3, lg: 2 }}>
                  <FormikSelectComponent
                    key={subHierarchyKey}
                    name="hierarchyId"
                    size="xs"
                    label="Hierarchy ID"
                    placeholder="Select Hierarchy ID"
                    data={subHierarchyList?.map((item: any) => ({
                      label: item.displayName,
                      value: String(item.id),
                    }))}
                    allowDeselect={true}
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    disabled={loadingSubHierarchyList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="walletType"
                    size="xs"
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    allowDeselect={true}
                    nothingFoundMessage="Nothing Found"
                    data={[
                      { label: "PREPAID", value: "PREPAID" },
                      { label: "POSTPAID", value: "POSTPAID" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 3, md: 10, lg: 1.5 }}>
                  <div className="flex justify-end items-center mt-4">
                    {<ButtonComponent
                      fontSize="14"
                      fullWidth={false}
                      radius={6}
                      size="sm"
                      borderColor={colors.text.inverse}
                      variant="filled"
                      type="submit"
                      bgColor={colors.brand.primary}
                      textColor={colors.text.inverse}
                    >
                      VIEW
                    </ButtonComponent>}
                  </div>
                </Grid.Col>
              </Grid>
            </Form>
          )
        }}

      </Formik>

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={GstTdsheaders.length} />
      ) : (
        <GenericMasterTable<GstTdsReportTableType>
          data={data}
          headers={GstTdsheaders.filter((h) =>
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
      )}
    </div>
  );
};

export default GstTdsReport;
