import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useVendor } from "../../Utils/hooks/useVendor";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import * as Yup from "yup"
import { RefreshIcon } from "../../assets/Icons";
import { SETTLEMENT_REPORT_URL, settlementReportFilterInitialValues, settlementReportFilterValidationSchema, settlementReportHeaders, SettlementReportTableType, transformToUnSettledTranxReportPayload, UNSETTLED_REPORT_KEY } from "../../Config/Reports/SettlementReportConfig";

const UnSettledTransReport = () => {

  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState<any>(null);

  const dataRef = useRef<SettlementReportTableType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    settlementReportHeaders.map((h) => h.key as string)
  );

  const [formValues, setFormValues] = useState(settlementReportFilterInitialValues);
  const [viewSubmitted, setViewSubmitted] = useState(false);


  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<SettlementReportTableType>({
      method: "POST",
      key: UNSETTLED_REPORT_KEY,
      url: viewSubmitted ? `${SETTLEMENT_REPORT_URL}/settlement` : undefined,
      payload,
      refreshKey,
    });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    setFormValues(values);
    const payload = transformToUnSettledTranxReportPayload(values);
    setPayload(payload);
    setRefreshKey((prev) => prev + 1);
    setViewSubmitted(true);
  }, 3000);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "UnSettled-Report");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(UNSETTLED_REPORT_KEY));
    setVisibleColumns(settlementReportHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    return () => {
      setFormValues(settlementReportFilterInitialValues); // Reset form data on unmount
    }
  }, []);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">

      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        UNSETTLED TRANSACTION REPORT
      </TextComponent>

      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={Yup.object(settlementReportFilterValidationSchema)}
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {
          const {
            productDropdownData,
            loadingProductList,
            subProductDropdownData,
            loadingSubProductList,
            subProductKey,
            refetchProducts
          } = useProductSubProduct({
            selectedProductId: values.productId,
            selectedSubProductId: values.subProductId,
            onSubProductReset: () => setFieldValue("subProductId", ""),
            isSettlement: true
          });

          const { vendorDropdownData, loadingVendorList } = useVendor();

          return (
            <Form className="flex flex-col gap-2 mt-4">
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
                    key={values.productId}
                    name="productId"
                    label="Product"
                    value={values.productId}
                    placeholder="Select Product"
                    nothingFoundMessage="No Product Found"
                    size="xs"
                    withAsterisk
                    required
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

                <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
                  <FormikSelectComponent
                    name="subProductId"
                    key={`${subProductKey}-${values.productId}`}
                    value={values.subProductId}
                    data={subProductDropdownData}
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    nothingFoundMessage="No SubProduct Found for Selected Product"
                    size="xs"
                    withAsterisk
                    // required
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
                    name="walletType"
                    size="xs"
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    data={[
                      { label: "PREPAID", value: "PREPAID" },
                      { label: "POSTPAID", value: "POSTPAID" },
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
        headers={settlementReportHeaders}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={settlementReportHeaders.length} />
      ) : (
        <GenericMasterTable<SettlementReportTableType>
          data={data}
          headers={settlementReportHeaders.filter((h) =>
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
        />
      )}

    </div >
  );
};

export default UnSettledTransReport;
