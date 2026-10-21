import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Grid, Loader, Tooltip } from "@mantine/core";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import * as Yup from "yup";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { PENDING_KYC_KEY, PENDING_KYC_URL, pendingKycHeaders, pendingKycInitialValues, pendingKycSchema, PendingKycTableType } from "../../Config/Management/PendingKycConfig";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import { EyeIcon, RefreshIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";

const PendingKyc = () => {

  const [filter, setFilter] = useState<Record<string, any> | null>(null);
  const dataRef = useRef<PendingKycTableType[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<PendingKycTableType>({
      key: PENDING_KYC_KEY,
      url: shouldFetch ? `${PENDING_KYC_URL}/search` : "",
      method: "POST",
      payload: filter ? filter : null,
    });

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Pending-Kyc");
  };

  const handleSubmit = (values: any) => {
    const cleanedFilter = {
      ...(values.searchKeyword?.trim() ? { searchKeyword: values.searchKeyword.trim() } : {}),
      ...(values.hierarchyType != null && values.hierarchyType !== "" ? { hierarchyType: values.hierarchyType } : {}),
    };

    setFilter(cleanedFilter);
    setShouldFetch(true);
  }

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        KYC REVIEW
      </TextComponent>

      <Formik
        enableReinitialize
        initialValues={pendingKycInitialValues}
        validationSchema={Yup.object(pendingKycSchema)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, submitForm }) => {

          const { hierarchyList, loadingHierarchyList, refetchHierarchy } = useHierarchySubHierarchy({});

          return (
            <Form className="flex flex-col gap-2 mt-4">
              <Grid gutter="sm">
                <Grid.Col span={{ base: 4, md: 4, lg: 3 }} >
                  <FormikTextInputComponent
                    name="searchKeyword"
                    placeholder="Search By Hierarchy ID, Mobile"
                    label="Search"
                    size="xs"
                    onChange={(e: any) => {
                      setFieldValue("searchKeyword", e.target.value);
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        if (e.target.value.trim() !== "") {
                          setFieldValue("hierarchyType", null); // clear other filter
                          submitForm();
                        }
                      }
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 4, md: 3, lg: 3 }} >
                  <FormikSelectComponent
                    name="hierarchyType"
                    label="Hierarchy Type"
                    placeholder="Search By Hierarchy Type"
                    size="xs"
                    searchable={true}
                    allowDeselect={true}
                    onChange={(val: any) => {
                      if (val !== null) {
                        setFieldValue("searchKeyword", ""); // clear other filter
                        setFieldValue("hierarchyType", val);
                        submitForm();
                      }
                    }}
                    data={hierarchyList}
                    disabled={loadingHierarchyList}
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

                <Grid.Col span="auto">
                  <div className="flex justify-end items-end h-full gap-2">
                    <GenericMasterToolbar
                      onExport={handleExportClick}
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
          <ShimmerTableRows rowCount={6} columnCount={pendingKycHeaders.length} />
        ) : (
          <GenericMasterTable<PendingKycTableType>
            data={data}
            headers={pendingKycHeaders}
            renderExtraHeader={() => <>View Documents</>} // empty header for action column/>
            renderExtraRowCell={(item) => (
              <div className="flex justify-center gap-2 min-w-10">
                <Tooltip
                  label="View Documents" withArrow={false}
                  styles={{
                    tooltip: {
                      backgroundColor: 'grey',
                      color: 'white',
                      fontSize: '12px',
                    }
                  }}
                >
                  <span
                    onClick={() => navigate(`/management/kyc-pending/${item.hierarchyId}`)}
                    className="cursor-pointer"
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
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
        )
      }
    </div >
  );
};

export default PendingKyc;
