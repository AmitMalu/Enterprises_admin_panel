import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import { useSubProductList } from "../../Utils/hooks/useSubProductList";
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

const TransactionReport = () => {

  const [reportPayload, setReportPayload] = useState<any>(null);
  const dataRef = useRef<TransactionReportTableType[] | null>(null);

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

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Transaction Report
      </TextComponent>

      <GenericMasterToolbar
        onExport={handleExportClick}
        loading={loading}
        error={error ? error.toString() : null}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={TransactionReportSchema}
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {
          const { subProductDropdownData, loadingSubProductList } = useSubProductList()
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
                    name="subProduct"
                    size="xs"
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    withAsterisk
                    required
                    data={subProductDropdownData?.map(item => ({
                      label: item?.label,
                      value: item?.label
                    }))}
                    disabled={loadingSubProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 4, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="hierarchy"
                    size="xs"
                    label="Hierarchy"
                    placeholder="Select Hierarchy"
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
                    placeholder="Select Hierarchy ID"
                    data={subHierarchyList}
                    disabled={loadingSubHierarchyList}
                    withAsterisk
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
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

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="status"
                    size="xs"
                    label="Status"
                    placeholder="Select Status"
                    data={[
                      { label: "ALL", value: "ALL" },
                      { label: "FAILED", value: "FAILED" },
                      { label: "SUCCESS", value: "SUCCESS" },
                      { label: "PENDING", value: "PENDING" },
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
        />
      )}
    </div>
  );
};

export default TransactionReport;
