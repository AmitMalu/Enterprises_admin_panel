import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  initialValues,
  OperatorFormType,
  validationSchema,
} from "../../Config/Master/OperatorConfig";
import {
  handleOperatorFormSubmit,
  transformOperatorToFormData,
} from "../../Redux/Features/Masters/OperatorMaster/utils";
import { clearSelectedOperator } from "../../Redux/Features/Masters/OperatorMaster/slice";
import { fetchOperatorById } from "../../Redux/Features/Masters/OperatorMaster/thunks";
import { booleanSelectData } from "../../Utils/utils";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";

const OperatorForm = ({ mode }: { mode: string }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedOperator } = useAppSelector(
    (state) => state.masters.operator
  );

  const [formData, setFormData] = useState<OperatorFormType>(initialValues);

  const handleSubmit = (values: OperatorFormType) => {
    handleOperatorFormSubmit(mode, id, values, dispatch, navigate, setFormData);
  };

  // Fetch Data by Id when Edit
  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(fetchOperatorById(id));
    }

    return () => {
      // Only clear form and selected Operator on unmount in "edit" mode
      if (mode === "edit") {
        setFormData(initialValues); // Reset form data on unmount
        dispatch(clearSelectedOperator()); // Reset selected Operator in the store
      }
    };
  }, [id, dispatch, mode]);

  // Set data to the form when Edit Mode
  useEffect(() => {
    if (selectedOperator && mode === "edit") {
      setFormData(transformOperatorToFormData(selectedOperator));
    }
  }, [selectedOperator, mode]);

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
        {(formik: FormikProps<any>) => {
          const {
            productDropdownData,
            loadingProductList,
            subProductDropdownData,
            loadingSubProductList,
            subProductKey,
          } = useProductSubProduct({
            selectedProductId: formik.values.productId,
            selectedSubProductId: formik.values.subProductId,
            onSubProductReset: () => formik.setFieldValue("subProductId", ""),
          });

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
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
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    value={formik.values.productId}
                    placeholder="Select Product"
                    withAsterisk
                    required
                    data={productDropdownData}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="subProductId"
                    key={subProductKey}
                    value={formik.values.subProductId}
                    data={subProductDropdownData}
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    withAsterisk
                    required
                    disabled={loadingSubProductList}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default OperatorForm;
