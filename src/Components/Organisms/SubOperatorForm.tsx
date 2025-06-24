import React, { useEffect, useState } from "react";
import TextComponent from "../Atoms/TextComponent";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import {
  initialValues,
  MASTER_KEY,
  MASTER_URL,
  SubOperatorFormType,
  transformFormToCreateSubOperatorPayload,
  transformFormToUpdateSubOperatorPayload,
  transformSubOperatorToFormData,
  validationSchema,
} from "../../Config/Master/SubOperatorConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { booleanSelectData, handleMasterFormSubmit } from "../../Utils/utils";
import ButtonComponent from "../Atoms/ButtonComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { useOperatorSubOperator } from "../../Utils/hooks/useOperatorSubOperator";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";

type ProductFormProps = { mode: "add" | "edit" };

const SubOperatorForm = ({ mode }: ProductFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SubOperatorFormType>(initialValues);

  const handleSubmit = (values: SubOperatorFormType) => {
    handleMasterFormSubmit({
      mode,
      id,
      values,
      dispatch,
      navigate,
      resetFormData: () => setFormData(initialValues),
      masterKey: MASTER_KEY,
      masterUrl: MASTER_URL,
      transformCreatePayload: transformFormToCreateSubOperatorPayload,
      transformUpdatePayload: transformFormToUpdateSubOperatorPayload,
      successNavigatePath: "/master/sub-operator",
      entityName: "Sub-Operator",
    });
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      if (mode === "edit" && id) {
        try {
          const data = await dispatch(
            fetchMasterById({ key: MASTER_KEY, endpoint: MASTER_URL, id })
          ).unwrap();

          setFormData(transformSubOperatorToFormData(data));
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
          ? "Edit Sub-Operator Master"
          : "Sub-Operator Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Sub-Operator"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<any>) => {
          const { operatorDropdownData, loadingOperatorList } =
            useOperatorSubOperator({});

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="subOperatorName"
                    label="Sub Operator Name"
                    placeholder="Enter Operator Name"
                    withAsterisk
                    maxLength={51}
                    allowSpecialChar={false}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="operatorCode"
                    label="Operator"
                    value={formik.values.operatorName}
                    placeholder="Select Operator"
                    withAsterisk
                    required
                    data={operatorDropdownData}
                    disabled={loadingOperatorList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="category"
                    label="Category"
                    placeholder="Enter Category"
                    withAsterisk
                    required
                    maxLength={51}
                    allowSpecialChar={true}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="isBlocked"
                    label="Is Blocked"
                    allowDeselect={false}
                    placeholder="Select Is Blocked"
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
          );
        }}
      </Formik>
    </div>
  );
};

export default SubOperatorForm;
