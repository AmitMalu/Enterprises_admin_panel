import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import {
  initialValues,
  MASTER_KEY,
  MASTER_URL,
  ProductFormType,
  transformFormToCreateProductPayload,
  transformFormToUpdateProductPayload,
  transformProductToFormData,
  validationSchema,
} from "../../Config/Master/ProductConfig";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { booleanSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";

type ProductFormProps = { mode: "add" | "edit" };

const ProductForm = ({ mode }: ProductFormProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = useThrottleMasterFormSubmit<ProductFormType>({
    mode,
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateProductPayload,
    transformUpdatePayload: transformFormToUpdateProductPayload,
    successNavigatePath: "/master/product",
    entityName: "Product",
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

          setFormData(transformProductToFormData(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/product");
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
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {mode === "edit" ? "Edit Product" : "Add Product"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Product"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="name"
                label="Name"
                placeholder="Enter Name"
                withAsterisk
                maxLength={50}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="productCode"
                label="Product Code"
                placeholder="Enter Product Code"
                withAsterisk
                maxLength={30}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="productCodeForScheme"
                label="Product Code For Scheme"
                placeholder="Enter Product Code For Scheme"
                withAsterisk
                maxLength={30}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isShow"
                label="Is Show"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="hasCharges"
                label="Has Charges"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isCommissions"
                label="Is Commissions"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isInventory"
                label="Is Inventory"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isSettlement"
                label="Is Settlement"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isVirtual"
                label="Is Virtual"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isVisible"
                label="Is Visible"
                placeholder="Select"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="reverseTx"
                label="Reverse Tx"
                placeholder="Select Reverse Tx"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="productGroup"
                label="Product Group"
                placeholder="Enter Product Group"
                withAsterisk
                maxLength={50}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="clusterMode"
                label="Cluster Mode"
                placeholder="Select Cluster Mode"
                withAsterisk
                data={booleanSelectData}
              />
            </Grid.Col>

            {mode === "edit" && (
              <>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="blocked"
                    label="Blocked"
                    placeholder="Select"
                    withAsterisk
                    data={booleanSelectData}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="active"
                    label="Active"
                    placeholder="Select"
                    withAsterisk
                    data={booleanSelectData}
                  />
                </Grid.Col>
              </>
            )}

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
      </Formik>
    </div>
  );
};

export default ProductForm;
