import React, { useEffect, useState } from "react";
import {
  initialValues,
  OperatorFormType,
  validationSchema,
} from "./OperatorFormConfig";
import { useLocation, useParams } from "react-router-dom";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";

const OperatorForm = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState<OperatorFormType>(initialValues);
  const booleanSelectData = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const handleSubmit = (values: OperatorFormType) => {
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
        {mode === "edit" ? "Edit Operator Master Form" : "Operator Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Operator"} text="Master" />

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
                placeholder="ID"
                withAsterisk
                maxLength={51}
                disabled={mode === "edit" ? true : false}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="operatorAlias"
                label="Operator Alias"
                placeholder="Enter Operator Alias"
                withAsterisk
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="operatorCategory"
                label="Operator Category"
                placeholder="Enter Operator Category"
                withAsterisk
                required
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="operatorCode"
                label="Operator Code"
                placeholder="Enter Operator Code"
                withAsterisk
                required
                maxLength={31}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="operatorName"
                label="Operator Name"
                placeholder="Enter Operator Name"
                withAsterisk
                required
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="productCode"
                label="Product Code"
                placeholder="Enter Product Code"
                withAsterisk
                required
                maxLength={31}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="productId"
                label="Product ID"
                placeholder="Enter Product ID"
                withAsterisk
                required
                maxLength={31}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="subProductCode"
                label="Sub Product Code"
                placeholder="Enter Sub Product Code"
                withAsterisk
                required
                maxLength={31}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="subProductId"
                label="Sub Product ID"
                placeholder="Enter Sub Product ID"
                withAsterisk
                required
                maxLength={31}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="alias"
                label="Alias"
                placeholder="Enter Alias"
                withAsterisk
                required
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="cardBinNo"
                label="Card BIN Number"
                placeholder="Enter Card BIN Number"
                required={false}
                maxLength={21}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <FormikSelectComponent
                name="isActive"
                label="Is Active"
                allowDeselect={false}
                placeholder="Select Is Active"
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

export default OperatorForm;
