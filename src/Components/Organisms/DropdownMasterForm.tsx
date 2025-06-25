import { Form, Formik } from "formik";
import ButtonComponent from "../Atoms/ButtonComponent";
import TextComponent from "../Atoms/TextComponent";
import BreadCrumb from "../Molecules/BreadCrumb";
import {
  DropdownFormType,
  initialValues,
  MASTER_KEY,
  MASTER_URL,
  transformFormToCreateDropdownPayload,
  transformFormToUpdateDropdownPayload,
  validationSchema,
} from "../../Config/Master/DropdownConfig";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { handleMasterFormSubmit } from "../../Utils/utils";

const DropdownMasterForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<DropdownFormType>(initialValues);

  const handleSubmit = (values: DropdownFormType) => {
    handleMasterFormSubmit({
      id,
      values,
      dispatch,
      navigate,
      resetFormData: () => setFormData(initialValues),
      masterKey: MASTER_KEY,
      masterUrl: MASTER_URL,
      transformCreatePayload: transformFormToCreateDropdownPayload,
      transformUpdatePayload: transformFormToUpdateDropdownPayload,
      successNavigatePath: "/master/dropdown",
      entityName: "Master",
    });
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {"Dropdown Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Dropdown"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <FormikTextInputComponent
                name="imMasterName"
                label="Master Name"
                placeholder="Enter Master Name"
                withAsterisk
                required
                maxLength={100}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <FormikTextInputComponent
                name="imSubMasterName"
                label="Sub Master Name"
                placeholder="Enter Sub Master Name"
                withAsterisk
                required
                maxLength={100}
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

export default DropdownMasterForm;
