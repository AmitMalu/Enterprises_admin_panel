import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
// import { useSubProductList } from "../../Utils/hooks/useSubProductList";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { headers, initialValues, TransactionReportSchema, TransactionReportTableType, transformToTransactionReportPayload, TRANX_REPORT_KEY, TRANX_REPORT_URL } from "../../Config/Reports/TransactionReportConfig";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useFetchReportList } from "../../Utils/hooks/useFetchReportList";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { useEffect, useRef, useState } from "react";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import { setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { RefreshIcon } from "../../assets/Icons";

const TransactionReport = () => {
  const dispatch = useAppDispatch();

  const [reportPayload, setReportPayload] = useState<any>(null);
  const dataRef = useRef<TransactionReportTableType[] | null>(null);
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
  } = useFetchReportList<TransactionReportTableType>({
    key: TRANX_REPORT_KEY,
    url: `${TRANX_REPORT_URL}/view`,
    payload: reportPayload,
  });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    const payload = transformToTransactionReportPayload(values);
    setReportPayload(payload);
  }, 3000);

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Transaction-report");
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: TRANX_REPORT_KEY,
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
        Transaction Report
      </TextComponent>

      <GenericMasterToolbar
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        loading={loading}
        error={error ? error.toString() : null}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={TransactionReportSchema}
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
            onSubHierarchyReset: () => setFieldValue("subHierarchy", "")
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

                <Grid.Col span={{ base: 4, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="hierarchy"
                    size="xs"
                    label="Hierarchy"
                    searchable={true}
                    placeholder="Select Hierarchy Type"
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
                    name="subHierarchy"
                    size="xs"
                    label="Hierarchy ID"
                    allowDeselect={true}
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    placeholder="Select Hierarchy ID"
                    data={subHierarchyList?.map((item: any) => ({
                      label: item.displayName,
                      value: String(item.id),
                    }))}
                    disabled={loadingSubHierarchyList}
                  // withAsterisk
                  // required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="walletType"
                    size="xs"
                    required
                    nothingFoundMessage="Nothing Found"
                    withAsterisk
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    data={[
                      { label: "PREPAID", value: "PREPAID" },
                      { label: "POSTPAID", value: "POSTPAID" },
                    ]}
                  />
                </Grid.Col>

                {/* <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="status"
                    size="xs"
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    label="Status"
                    placeholder="Select Status"
                    data={[
                      { label: "ALL", value: "ALL" },
                      { label: "FAILED", value: "REJECTED" },
                      { label: "SUCCESS", value: "SUCCESS" },
                      { label: "PENDING", value: "PENDING" },
                    ]}
                  />
                </Grid.Col> */}

                <Grid.Col span="auto">
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
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<TransactionReportTableType>
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
          filterVisible={filterVisible}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
        />
      )}
    </div>
  );
};

export default TransactionReport;
