import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import {
  initialValues,
  MASTER_KEY,
  MASTER_URL,
  SubProductFormType,
  transformFormToCreateSubProductPayload,
  transformFormToUpdateSubProductPayload,
  transformSubProductToFormData,
  validationSchema,
} from "../../Config/Master/SubProductConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { booleanSelectData, settlementTimeData, walletTypeSelectData } from "../../Utils/utils";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { toast } from "react-toastify";
import { fetchMasterById, fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";

type SubProductFormProps = { mode: "add" | "edit" };

const SubProductForm = ({ mode }: SubProductFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SubProductFormType>(initialValues);
  const { productDropdownData, loadingProductList } = useProductSubProduct({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [whiteLabelAdminList, setWhiteLabelAdminList] = useState<{ label: string; value: string }[]>([]);
  const hasFetchedRef = useRef(false);


  const handleSubmit = useThrottleMasterFormSubmit<SubProductFormType>({
    mode,
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateSubProductPayload,
    transformUpdatePayload: transformFormToUpdateSubProductPayload,
    successNavigatePath: "/master/sub-product",
    entityName: "sub Products",
  });

  useEffect(() => {
    const fetchAndSet = async () => {
      if (mode === "edit" && id) {
        setLoading(true);
        setFetchError(null);
        try {
          const data = await dispatch(
            fetchMasterById({ key: MASTER_KEY, endpoint: MASTER_URL, id })
          ).unwrap();

          setFormData(transformSubProductToFormData(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/sub-product");
          }, 2000);
        }
        finally {
          setLoading(false);
        }
      }
    };

    fetchAndSet();

    return () => {
      // Only clear form and selected product on unmount in "edit" mode
      if (mode === "edit") {
        setFormData(initialValues); // Reset form data on unmount
      }
    };
  }, [dispatch, id, mode]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

      <BackHeader
        title={mode === "edit" ? "Edit Sub Product" : "Add Sub Product"}
        backPath="/master/sub-product"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Sub Product"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values }) => {

          useEffect(() => {
            const fetchAdminDropdownList = async () => {
              if (values.isWhiteLabelAdmin && !hasFetchedRef.current) {
                try {
                  const data = await dispatch(
                    fetchMasterDropdown({ url: `/api/white-labels/admin-dropdown` })
                  ).unwrap();

                  const formattedData: { label: string; value: string }[] = data?.map((item: any) => ({
                    label: String(item.displayName),
                    value: String(item.whiteLabelId)
                  }));

                  setWhiteLabelAdminList(formattedData)
                  hasFetchedRef.current = true;

                } catch (err: any) {
                  toast.error(err);
                }
                finally {
                  setLoading(false);
                }
              } else if (!values.isWhiteLabelAdmin) {
                setWhiteLabelAdminList([]); // Reset on false
                hasFetchedRef.current = false; // Allow refetch if toggled again
              }
            };

            fetchAdminDropdownList();
          }, [values.isWhiteLabelAdmin, dispatch]);

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="subProductTitle"
                    label="Sub Product Title"
                    placeholder="Enter Sub Product Title"
                    withAsterisk
                    required
                    maxLength={100}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="subProductCode"
                    label="Sub Product Code"
                    placeholder="Enter Sub Product Code"
                    withAsterisk
                    maxLength={50}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="product"
                    label="Product"
                    placeholder="Select Product"
                    withAsterisk
                    required
                    searchable
                    data={productDropdownData} //this will be replace with actual api data list {productName: "abc", productCode: "123", productId: 12}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="walletType"
                    label="Wallet Type"
                    placeholder="Enter Wallet Type"
                    allowDeselect={false}
                    data={walletTypeSelectData}
                    withAsterisk
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="isSettlement"
                    label="Is Settlement"
                    placeholder="Select"
                    withAsterisk
                    allowDeselect={false}
                    data={booleanSelectData}
                  />
                </Grid.Col>

                {values.isSettlement && <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="settlementTime"
                    label="Settlement Time"
                    placeholder="Select"
                    withAsterisk
                    allowDeselect={false}
                    data={settlementTimeData}
                  />
                </Grid.Col>}

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="isWhiteLabelAdmin"
                    label="Is WL-Admin"
                    placeholder="Select"
                    withAsterisk
                    allowDeselect={false}
                    data={booleanSelectData}
                  />
                </Grid.Col>

                {values.isWhiteLabelAdmin && <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="whiteLabelAdminId"
                    label="WL-Admin Id"
                    placeholder="Select"
                    withAsterisk
                    allowDeselect={false}
                    data={whiteLabelAdminList || []}
                  />
                </Grid.Col>}

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="userField1"
                    label="User Field 1"
                    placeholder="Enter User Field 1"
                    maxLength={50}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="userField2"
                    label="User Field 2"
                    placeholder="Enter User Field 2"
                    maxLength={50}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="userField3"
                    label="User Field 3"
                    placeholder="Enter User Field 3"
                    maxLength={50}
                  />
                </Grid.Col>


                {mode === "edit" && (
                  <>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                      <FormikSelectComponent
                        name="isActive"
                        label="Is Active"
                        placeholder="Select"
                        withAsterisk
                        allowDeselect={false}
                        data={booleanSelectData}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                      <FormikSelectComponent
                        name="isBlocked"
                        label="Is Blocked"
                        placeholder="Select"
                        withAsterisk
                        allowDeselect={false}
                        data={booleanSelectData}
                      />
                    </Grid.Col>
                  </>
                )}

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="isVisible"
                    label="Is Visible"
                    placeholder="Select"
                    withAsterisk
                    allowDeselect={false}
                    data={booleanSelectData}
                  />
                </Grid.Col>
              </Grid>

              <div className="flex justify-end mt-4">
                {!loading && !fetchError && <ButtonComponent
                  fullWidth={false}
                  radius={6}
                  borderColor="#fff"
                  variant="filled"
                  type="submit"
                  bgColor="#C30305"
                  textColor="#FFFFFF"
                  style={{ padding: "10px 30px" }}
                >
                  SUBMIT
                </ButtonComponent>}
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default SubProductForm;
