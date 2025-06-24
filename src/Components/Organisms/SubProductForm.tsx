import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextComponent from "../../Components/Atoms/TextComponent";
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
import { booleanSelectData, handleMasterFormSubmit } from "../../Utils/utils";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";

type SubProductFormProps = { mode: "add" | "edit" };

const SubProductForm = ({ mode }: SubProductFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SubProductFormType>(initialValues);
  const { productDropdownData, loadingProductList } = useProductSubProduct({});

  const handleSubmit = (values: SubProductFormType) => {
    handleMasterFormSubmit({
      mode,
      id,
      values,
      dispatch,
      navigate,
      resetFormData: () => setFormData(initialValues),
      masterKey: MASTER_KEY,
      masterUrl: MASTER_URL,
      transformCreatePayload: transformFormToCreateSubProductPayload,
      transformUpdatePayload: transformFormToUpdateSubProductPayload,
      successNavigatePath: "/master/sub-product",
      entityName: "sub Products",
    });
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      if (mode === "edit" && id) {
        try {
          const data = await dispatch(
            fetchMasterById({ key: MASTER_KEY, endpoint: MASTER_URL, id })
          ).unwrap();

          setFormData(transformSubProductToFormData(data));
        } catch (err: any) {
          toast.error(err);
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
        {mode === "edit"
          ? "Edit Sub Product Master Form"
          : "Sub Product Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Sub Product"} text="Master" />

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
                name="productId"
                label="Product"
                placeholder="Select Product"
                withAsterisk
                required
                data={productDropdownData} //this will be replace with actual api data list {productName: "abc", productCode: "123", productId: 12}
                disabled={loadingProductList}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="walletType"
                label="Wallet Type"
                placeholder="Enter Wallet Type"
                withAsterisk
                required
                maxLength={50}
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
                name="enabled"
                label="Enabled"
                placeholder="Select"
                withAsterisk
                allowDeselect={false}
                data={booleanSelectData}
              />
            </Grid.Col>
          </Grid>

          <div className="flex justify-end mt-4">
            <ButtonComponent
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
            </ButtonComponent>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SubProductForm;
