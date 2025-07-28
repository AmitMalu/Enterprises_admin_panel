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
  transformFormToCreateVendorPayload,
  transformFormToUpdateVendorPayload,
  transformVendorToFormData,
  validationSchema,
  VendorFormType,
} from "../../Config/Master/VendorConfig";
import {
  booleanSelectData,
  prioritySelectDataInNumbers,
  pubPvtSelectData,
} from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { toast } from "react-toastify";
import { fetchMasterById, fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";

type VendorFormProps = { mode: "add" | "edit" };

const VendorForm = ({ mode }: VendorFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<VendorFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [whiteLabelAdminList, setWhiteLabelAdminList] = useState<{ label: string; value: string }[]>([]);
  const hasFetchedRef = useRef(false);

  const handleSubmit = useThrottleMasterFormSubmit<VendorFormType>({
    mode,
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateVendorPayload,
    transformUpdatePayload: transformFormToUpdateVendorPayload,
    successNavigatePath: "/master/vendor",
    entityName: "Vendor",
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

          setFormData(transformVendorToFormData(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/vendor");
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
        title={mode === "edit" ? "Edit Vendor" : "Add Vendor"}
        backPath="/master/vendor"
      />
      {/* Sub Heading */}
      <BreadCrumb type={"Vendor"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const {
            productDropdownData,
            loadingProductList,
          } = useProductSubProduct({});


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
                    name="vendorName"
                    label="Vendor Name"
                    placeholder="Enter Vendor Name"
                    withAsterisk
                    required
                    maxLength={50}
                    allowSpecialChar={false}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="vendorCode"
                    label="Vendor Code"
                    placeholder="Enter Vendor Code"
                    withAsterisk
                    required
                    maxLength={50}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    placeholder="Select Product"
                    withAsterisk
                    required
                    data={productDropdownData}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="modesSupported"
                    label="Modes Supported"
                    placeholder="Enter Mode Supported"
                    withAsterisk
                    maxLength={50}
                    allowSpecialChar={true}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="priority"
                    label="Priority"
                    placeholder="Select Priority"
                    withAsterisk
                    allowDeselect={false}
                    data={prioritySelectDataInNumbers}
                  />
                </Grid.Col>

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

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="active"
                    label="Is Active"
                    placeholder="Select Active Status"
                    allowDeselect={false}
                    withAsterisk
                    data={booleanSelectData}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="bankType"
                    label="Bank Type"
                    placeholder="Select Bank Type"
                    withAsterisk
                    allowDeselect={false}
                    data={pubPvtSelectData}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="website"
                    label="Website Url"
                    placeholder="Enter Website URL"
                    withAsterisk
                    maxLength={100}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="logo"
                    label="logo Url"
                    placeholder="Enter logo URL"
                    withAsterisk
                    maxLength={100}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="parameter"
                    label="Parameter"
                    placeholder="Enter Parameter"
                    withAsterisk
                    maxLength={100}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default VendorForm;
