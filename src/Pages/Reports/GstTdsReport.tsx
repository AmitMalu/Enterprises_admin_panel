import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import { useSubProductList } from "../../Utils/hooks/useSubProductList";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useFetchReportList } from "../../Utils/hooks/useFetchReportList";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { useEffect, useRef, useState } from "react";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GST_TDS_REPORT_KEY, GST_TDS_REPORT_URL, GstTdsheaders, GstTdsReportInitialValues, GstTdsReportSchema, GstTdsReportTableType, transformToGstTdsReportPayload } from "../../Config/Reports/GstTdsReportConfig";
import { setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { RefreshIcon } from "../../assets/Icons";

const GstTdsReport = () => {

  const dispatch = useAppDispatch();

  const [reportPayload, setReportPayload] = useState<any>(null);
  const dataRef = useRef<GstTdsReportTableType[] | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  // const [refreshKey, setRefreshKey] = useState(0);
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);


  const {
    data,
    loading,
    pagination,
    error,
    setPage,
    setPageSize
  } = useFetchReportList<GstTdsReportTableType>({
    key: GST_TDS_REPORT_KEY,
    url: `${GST_TDS_REPORT_URL}/view`,
    payload: reportPayload,
  });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    const payload = transformToGstTdsReportPayload(values);
    setReportPayload(payload);
  }, 3000);

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "GstTds-report");
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
      setReportPayload((prev: any) => ({ ...prev, ...submittedFilter }));
    }
  }, [submittedFilter])

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Gst/Tds Report
      </TextComponent>

      <GenericMasterToolbar
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        loading={loading}
        error={error ? error.toString() : null}
      />

      <Formik
        initialValues={GstTdsReportInitialValues}
        validationSchema={Yup.object(GstTdsReportSchema)}
        onSubmit={(values) => {
          setFilterValues({})
          setSubmittedFilter(null)
          throttledSubmit(values)
        }}
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
                    leftIcon={<IconCalendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 3, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    placeholder="Select Product"
                    size="xs"
                    withAsterisk
                    required
                    allowDeselect={false}
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
                    required
                    withAsterisk
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
                    allowDeselect={true}
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    data={hierarchyList}
                    disabled={loadingHierarchyList}
                    withAsterisk
                    required
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
                    required
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
                      borderColor="#fff"
                      variant="filled"
                      type="submit"
                      bgColor="#C30305"
                      textColor="#FFFFFF"
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
          headers={GstTdsheaders}
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
