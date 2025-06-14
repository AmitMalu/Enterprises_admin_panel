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
  ProductFormType,
  ProductType,
  validationSchema,
} from "../../Config/Master/ProductConfig";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchProductById } from "../../Redux/Features/Masters/ProductMaster/thunks";
import {
  handleProductFormSubmit,
  transformProductToFormData,
} from "../../Redux/Features/Masters/ProductMaster/utils";
import { clearSelectedProduct } from "../../Redux/Features/Masters/ProductMaster/slice";
import { booleanSelectData } from "../../Utils/utils";

const ProductForm = ({ mode }: { mode: string }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProduct } = useAppSelector((state) => state.masters.product);

  const [formData, setFormData] = useState<ProductFormType>(initialValues);

  const handleSubmit = (values: ProductFormType) => {
    handleProductFormSubmit(mode, id, values, dispatch, navigate, setFormData);
  };

  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchProductById(id));
    }

    return () => {
      // Only clear form and selected product on unmount in "edit" mode
      if (mode === "edit") {
        setFormData(initialValues); // Reset form data on unmount
        dispatch(clearSelectedProduct()); // Reset selected product in the store
      }
    };
  }, [id, dispatch, mode]);

  useEffect(() => {
    if (selectedProduct && mode === "edit") {
      setFormData(transformProductToFormData(selectedProduct));
    }
  }, [selectedProduct, mode]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {mode === "edit" ? "Edit Product Master Form" : "Product Master Form"}
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

export default ProductForm;
