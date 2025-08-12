import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Checkbox, Grid } from "@mantine/core";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { preSettlementHeaders, PreSettlementTableType, SETTLEMENT_KEY, settlementFilterInitialValues } from "../../Config/Funding/SettlementConfig";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useVendor } from "../../Utils/hooks/useVendor";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";

const Settlement = () => {

  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState<any>(null);
  const dataRef = useRef<PreSettlementTableType[] | null>(null);
  // const [filterVisible, setFilterVisible] = useState(false);
  // const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    preSettlementHeaders.map((h) => h.key as string)
  );
  const [submittedFilter, setSubmittedFilter] = useState<{
    key: string;
    value: any;
  } | null>(null);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<PreSettlementTableType>({
      method: "POST",
      key: SETTLEMENT_KEY,
      // url: `${SETTLEMENT_URL}/view`,
      payload: payload,
      filter: submittedFilter,
      refreshKey,
      autoFetch: false,
    });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    // const payload = transformToSettlementPayload(values);
    setPayload(values);
  }, 3000);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // const handleFilterChange = (key: string, value: any) => {
  //   setFilterValues((prev) => ({ ...prev, [key]: value }));
  // };

  // const handleFilterSubmit = (key: string, value: any) => {
  //   dispatch(
  //     setPagination({
  //       key: SETTLEMENT_KEY,
  //       pagination: { ...pagination, currentPage: 1, pageSize: 5 },
  //     })
  //   );
  //   setSubmittedFilter({ key, value });
  // };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "product-master");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(SETTLEMENT_KEY));
    // setFilterValues({});
    setSubmittedFilter(null);
    setVisibleColumns(preSettlementHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
    // setFilterVisible(false);
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Settlement
      </TextComponent>

      <Formik
        initialValues={settlementFilterInitialValues}
        validationSchema={null}
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {
          const {
            productDropdownData,
            loadingProductList,
            subProductDropdownData,
            loadingSubProductList,
            subProductKey,
          } = useProductSubProduct({
            selectedProductId: values.productId,
            onSubProductReset: () => setFieldValue("subProductId", ""),
          });

          const { vendorDropdownData, loadingVendorList } = useVendor();

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2.5 }}>
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

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    value={values.productId}
                    placeholder="Select Product"
                    size="xs"
                    withAsterisk
                    required
                    data={productDropdownData}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
                  <FormikSelectComponent
                    name="subProductId"
                    key={subProductKey}
                    value={values.subProductId}
                    data={subProductDropdownData}
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    size="xs"
                    disabled={loadingSubProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
                  <FormikSelectComponent
                    name="vendorId"
                    label="Vendor"
                    value={values.vendorId}
                    placeholder="Select Vendor"
                    size="xs"
                    data={vendorDropdownData}
                    disabled={loadingVendorList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
                  <FormikSelectComponent
                    name="reportType"
                    size="xs"
                    label="Report Type"
                    placeholder="Select Report Type"
                    required
                    withAsterisk
                    data={[
                      { label: "PRE SETTLEMENT", value: "PRE_SETTLEMENT" },
                      { label: "HISTORY", value: "HISTORY" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 1.5 }}>
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

      <GenericMasterToolbar
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        // onFilter={() => setFilterVisible((prev) => !prev)}
        headers={preSettlementHeaders}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={preSettlementHeaders.length} />
      ) : (
        <GenericMasterTable<PreSettlementTableType>
          data={data}
          headers={preSettlementHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => (
            <div className="flex justify-center gap-2 min-w-10">
              <span
                className="cursor-pointer"
              >
                <Checkbox />
              </span>
            </div>
          )}
          renderExtraRowCell={() => (
            <div className="flex justify-center gap-2 min-w-10">
              <span
                className="cursor-pointer"
              >
                <Checkbox />
              </span>
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
      )}
    </div>
  );
};

export default Settlement;
