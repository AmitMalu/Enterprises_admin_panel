import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TextComponent from "../../../../Components/Atoms/TextComponent";
import BreadCrumb from "../../../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import FormikSwitchComponent from "../../../../Components/Molecules/FormikSwitchComponent";
import {
  initialValues,
  ProductType,
  validationSchema,
} from "../../../../Config/Master/ProductFormConfig";
import FormikSelectComponent from "../../../../Components/Molecules/FormikSelectComponent";

const ProductForm = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState<ProductType>(initialValues);
  const booleanSelectData = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const handleSubmit = (values: ProductType) => {
    console.log("Submitted values:", values);
  };

  useEffect(() => {
    if (mode === "edit") {
      if (location.state) {
        setFormData(location.state);
      }
    }
  }, [id, location.state, mode]);

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
                name="id"
                label="Id"
                disabled={mode === "edit" ? true : false}
                placeholder="Enter ID"
                withAsterisk
                maxLength={50}
              />
            </Grid.Col>

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
              <FormikTextInputComponent
                name="hasCharges"
                label="Has Charges"
                placeholder="Enter Charges Info"
                withAsterisk
                maxLength={20}
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
              <FormikTextInputComponent
                name="reverseTx"
                label="Reverse Tx"
                placeholder="Enter Reverse Tx"
                withAsterisk
                maxLength={20}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="walletType"
                label="Wallet Type"
                placeholder="Enter Wallet Type"
                withAsterisk
                maxLength={30}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="subProducts"
                label="Sub Products"
                placeholder="Enter Sub Products"
                withAsterisk
                maxLength={50}
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
              <FormikTextInputComponent
                name="clusterMode"
                label="Cluster Mode"
                placeholder="Enter Cluster Mode"
                withAsterisk
                maxLength={30}
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
