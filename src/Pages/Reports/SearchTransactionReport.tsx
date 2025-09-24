import { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv } from "../../Utils/utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { SEARCH_TRANSACTION_REPORT_KEY, SEARCH_TRANSACTION_REPORT_URL, searchTransInitialValues, SearchTransReportData, SearchTransReportHeaders, SearchTransReportSchema, SearchTransReportTableType } from "../../Config/Reports/SearchTransReportConfig";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import { CustomTab } from "../../Components/Molecules/CustomTab";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch } from "../../Redux/hooks";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";

const SearchTransactionReport = () => {

  const [reportFilter, setReportFilter] = useState<Record<string, any> | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("transaction");
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    SearchTransReportHeaders.map((h) => h.key as string)
  );

  const tabList = [
    { value: "transaction", label: "Transaction Details" },
    { value: "wallet", label: "Wallet Details" },
  ];

  const { data, loading, error } =
    useFetchMasterList<SearchTransReportData>({
      key: SEARCH_TRANSACTION_REPORT_KEY,
      url: shouldFetch ? `${SEARCH_TRANSACTION_REPORT_URL}/view` : "",
      filter: shouldFetch ? reportFilter : null,
      method: "GET",
      refreshKey,
      expectArray: false,
      skipPagination: true,     // don't send page & size
      returnFullData: true,     // return response.data directly
    });

  const filteredData = data ? (activeTab === "transaction" ? data.transactionDetails : data.walletDetails) : [];

  const handleExportClick = () => {
    if (!filteredData || filteredData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }

    const fileName = activeTab === "transaction"
      ? "transaction-details-report"
      : "wallet-details-report";
    exportToCsv(filteredData, fileName);
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
      if (selectAll) {
        setVisibleColumns(SearchTransReportHeaders.map((h) => h.key as string));
      } else {
        setVisibleColumns([]);
      }
    };

  const handleRefresh = () => {
    dispatch(resetMaster(SEARCH_TRANSACTION_REPORT_KEY));
    setVisibleColumns(SearchTransReportHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    setReportFilter(values);
    setShouldFetch(true); //enable fetch only after form submit
  }, 3000);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        Search Transaction Report
      </TextComponent>

      <Formik
        initialValues={searchTransInitialValues}
        validationSchema={Yup.object(SearchTransReportSchema)}
        onSubmit={throttledSubmit}
      >
        {() => {

          return (
            <Form className="flex flex-col gap-2 mt-4">
              <Grid gutter="sm">
                <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }} >
                  <FormikTextInputComponent
                    name="transactionId"
                    placeholder="Search By Transaction ID"
                    label="Transaction ID"
                    size="sm"
                    required
                    withAsterisk
                    maxLength={20}
                  />
                </Grid.Col>

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onRefresh={handleRefresh}
                      onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
                      onExport={handleExportClick}
                      headers={SearchTransReportHeaders}
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

      <CustomTab
        className="mt-6"
        tabList={tabList}
        value={activeTab}
        onChange={(val) => {
          if (val !== null) {
            setActiveTab(val);
          }
        }}
        grow={true}
        borderColor="#ccc"
        activeBg="#fff"
        activeColor="#CA4343"
      />

      {
        loading ? (
          // Render shimmer
          <ShimmerTableRows rowCount={6} columnCount={SearchTransReportHeaders.length} />
        ) : (
          <GenericMasterTable<SearchTransReportTableType>
            data={filteredData}
            headers={SearchTransReportHeaders.filter((h) =>
              visibleColumns.includes(h.key as string)
            )}
          // pagination
          // currentPage={pagination.currentPage}
          // totalPages={pagination.totalPages}
          // onPageChange={setPage}
          // onPageSizeChange={setPageSize}
          // pageSize={pagination.pageSize}
          // pageSizeOptions={pageSizeSelectData}
          // message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
          />
        )
      }
    </div >
  );
};

export default SearchTransactionReport;
