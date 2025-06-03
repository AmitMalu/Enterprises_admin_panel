import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TextComponent from "../../../../Components/Atoms/TextComponent";
import BreadCrumb from "../../../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../../../Components/Molecules/FormikSelectComponent";
import {
  initialValues,
  SubProductFormType,
  validationSchema,
} from "../../../../Config/Master/SubProductFormConfig";

const SubProductForm = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState<SubProductFormType>(initialValues);
  const booleanSelectData = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const handleSubmit = (values: SubProductFormType) => {
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
                name="id"
                label="ID"
                placeholder="Enter ID"
                withAsterisk
                required
                disabled={mode === "edit" ? true : false}
                maxLength={50}
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
                name="productId"
                label="Product ID"
                placeholder="Enter Product ID"
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
              <FormikTextInputComponent
                name="settlementName"
                label="Settlement Name"
                placeholder="Enter Settlement Name"
                withAsterisk
                required
                maxLength={100}
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

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="product"
                label="Product"
                placeholder="Enter Product"
                withAsterisk
                required
                maxLength={50}
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
                name="isActive"
                label="Is Active"
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
