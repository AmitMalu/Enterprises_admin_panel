import { toast } from "react-toastify";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Checkbox, Grid, Loader } from "@mantine/core";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar, IconCancel } from "@tabler/icons-react";
import { GiCheckMark } from "react-icons/gi";
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
import { updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import { RefreshIcon } from "../../assets/Icons";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { transformToUpdateTransPayload, UPDATE_TRANS_KEY, UPDATE_TRANS_URL, updateTransHeaders, updateTransInitialValues, UpdateTransTableType, UpdateTransValidationSchema } from "../../Config/Funding/UpdateTransConfig";

const UpdateTransaction = () => {

  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState<any>(null);

  const dataRef = useRef<UpdateTransTableType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    updateTransHeaders.map((h) => h.key as string)
  );

  const [formValues, setFormValues] = useState(updateTransInitialValues);
  const [walletType, setWalletType] = useState<string>("");
  const [viewSubmitted, setViewSubmitted] = useState(false);
  const [loadingActionSubmit, setLoadingActionSubmit] = useState(false);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<UpdateTransTableType>({
      method: "POST",
      key: UPDATE_TRANS_KEY,
      url: viewSubmitted ? `${UPDATE_TRANS_URL}/settlement` : undefined,
      payload,
      refreshKey,
    });

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    setFormValues(values);
    const payload = transformToUpdateTransPayload(values);
    setPayload(payload);
    setWalletType(values.walletType);
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
    exportToCsv(currentData, "Pending-Transaction");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(UPDATE_TRANS_KEY));
    setVisibleColumns(updateTransHeaders.map((h) => h.key as string));
    setSelectedIds([]);
    setRefreshKey((prev) => prev + 1);
  };

  const handleToggleAll = (checked: boolean, data: UpdateTransTableType[]) => {
    if (checked) {
      setSelectedIds(data.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (checked: boolean, id: string | number) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSettlementAction = async (action: "APPROVE" | "REJECT") => {
    if (!selectedIds.length) return;
    setLoadingActionSubmit(true); // set which row is loading
    try {
      await dispatch(updateMasterItem({
        key: UPDATE_TRANS_KEY,
        url: `${API_ENDPOINTS.COMMON.TRANSACTION}/update-status`,
        data: {
          transactionIds: selectedIds,
          newStatus: action,
          // walletType: walletType
        },
        mode: "POST",
      })).unwrap();

      toast.success(`Settlement ${action === "APPROVE" ? "APPROVED" : "REJECTED"} successfully!`);
      setSelectedIds([]);
      handleRefresh()
    } catch (err: any) {
      toast.error(`Failed to Update Settlement.`);
      console.error(err);
    } finally {
      setLoadingActionSubmit(false);
    }
  }

  useEffect(() => {
    return () => {
      setFormValues(updateTransInitialValues); // Reset form data on unmount
    }
  }, []);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* {viewSubmitted ? (
        <BackHeader
          title="PRE-SETTLEMENT"
          onBack={() => {
            setViewSubmitted(false);
            setPayload(null);
            setSelectedIds([]);
            setWalletType("");
            dispatch(resetMaster(SETTLEMENT_KEY));
          }}
        />
      ) : ( */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        UPDATE TRANSACTION
      </TextComponent>
      {/* )} */}

      <Formik
        initialValues={formValues}
        enableReinitialize
        validationSchema={Yup.object(UpdateTransValidationSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {
          // const {
          //   productDropdownData,
          //   loadingProductList,
          //   subProductDropdownData,
          //   loadingSubProductList,
          //   subProductKey,
          //   refetchProducts
          // } = useProductSubProduct({
          //   selectedProductId: values.productId,
          //   selectedSubProductId: values.subProductId,
          //   onSubProductReset: () => setFieldValue("subProductId", ""),
          //   isSettlement: true
          // });

          // const { vendorDropdownData, loadingVendorList } = useVendor();

          return (
            <Form className="flex flex-col gap-2 mt-4">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 3, xs: 4, md: 4, lg: 2.5 }}>
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

                {/* <Grid.Col span={{ base: 6, xs: 4, md: 4, lg: 2 }}>
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
                </Grid.Col> */}

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onRefresh={handleRefresh}
                      onColumnChange={handleToggleColumn}
                      onExport={handleExportClick}
                      headers={updateTransHeaders}
                      visibleColumns={visibleColumns}
                      loading={loading || loadingActionSubmit}
                      error={error ? error.toString() : null}
                    />
                    <ButtonComponent
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
                    </ButtonComponent>
                  </div>
                </Grid.Col>
              </Grid>
            </Form>
          )
        }}
      </Formik>

      {selectedIds?.length ? <div className="flex gap-2 items-end justify-end mt-1">
        <ButtonComponent
          style={{ padding: "4px 20px", height: 32 }}
          radius={2}
          textColor="#fff"
          borderColor="#fff"
          fontSize="16"
          throttleMs={5000}
          bgColor="#BF0204"
          onClick={() => handleSettlementAction("REJECT")}
          leftIcon={<IconCancel />}
          disabled={
            loadingActionSubmit ||
            !!loading ||
            !!error ||
            !data?.length ||
            !selectedIds?.length
          }
        >
          REJECT
        </ButtonComponent>
        <ButtonComponent
          style={{ padding: "4px 20px", height: 32 }}
          radius={2}
          textColor="#FFF"
          borderColor="#fff"
          fontSize="16"
          throttleMs={5000}
          bgColor="#28A745"
          onClick={() => handleSettlementAction("APPROVE")}
          leftIcon={<GiCheckMark size={16} color="#FFF" />}
          disabled={
            loadingActionSubmit ||
            !!loading ||
            !!error ||
            !data?.length ||
            !selectedIds?.length
          }
        >
          ACCEPT
        </ButtonComponent>
      </div> : null}

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={updateTransHeaders.length} />
      ) : (
        <GenericMasterTable<UpdateTransTableType>
          data={data}
          headers={updateTransHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => (
            <div className="flex justify-center gap-2 min-w-10">
              <Checkbox
                checked={selectedIds.length === data.length && data.length > 0}
                indeterminate={
                  selectedIds.length > 0 && selectedIds.length < data.length
                }
                onChange={(e) => handleToggleAll(e.currentTarget.checked, data)}
                disabled={loadingActionSubmit}
              />
            </div>
          )}
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 min-w-10">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onChange={(e) => handleToggleRow(e.currentTarget.checked, item.id)}
                disabled={loadingActionSubmit}
              />
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

export default UpdateTransaction;
