import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import {
  initialValues,
  MASTER_KEY,
  MASTER_URL,
  OperatorFormType,
  transformFormToCreateOperatorPayload,
  transformFormToUpdateOperatorPayload,
  transformOperatorToFormData,
  validationSchema,
} from "../../Config/Master/OperatorConfig";
import { booleanSelectData } from "../../Utils/utils";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";

type OperatorFormProps = { mode: "add" | "edit" };

const OperatorForm = ({ mode }: OperatorFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OperatorFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = useThrottleMasterFormSubmit<OperatorFormType>({
    mode,
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateOperatorPayload,
    transformUpdatePayload: transformFormToUpdateOperatorPayload,
    successNavigatePath: "/master/operator",
    entityName: "Operators",
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

          setFormData(transformOperatorToFormData(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/operator");
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
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
      <BackHeader
        title={mode === "edit" ? "Edit Operator" : "Add Operator"}
        backPath="/master/operator"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Biller / Operator"} text="Platform Setup" />

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
            onSubProductReset: () => formik.setFieldValue("subProductId", ""),
          });

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">

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
                    name="operatorCategory"
                    label="Operator Category"
                    placeholder="Select Operator Category"
                    data={[{ label: "CARD", value: "CARD" }, { label: "ONLINE", value: "ONLINE" }]}
                    withAsterisk
                    required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    // value={formik.values.productId}
                    placeholder="Select Product"
                    withAsterisk
                    required
                    allowDeselect={true}
                    searchable={true}
                    data={productDropdownData}
                    disabled={loadingProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="subProductId"
                    key={subProductKey}
                    // value={formik.values.subProductId}
                    data={subProductDropdownData}
                    label="Sub Product"
                    placeholder="Select Sub Product"
                    allowDeselect={true}
                    searchable={true}
                    withAsterisk
                    required
                    disabled={loadingSubProductList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="alias"
                    label="Description"
                    placeholder="Enter Description"
                    // withAsterisk
                    // required
                    maxLength={51}
                    allowSpecialChar={false}
                  />
                </Grid.Col>

                {/* <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="cardBinNo"
                    label="Card BIN Number"
                    placeholder="Enter Card BIN Number"
                    required={false}
                    maxLength={21}
                    allowNumber={true}
                    allowCharacter={false}
                    allowSpecialChar={false}
                  />
                </Grid.Col> */}

                {mode === "edit" &&
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikSelectComponent
                      name="isActive"
                      label="Is Active"
                      allowDeselect={false}
                      placeholder="Select Is Active"
                      withAsterisk
                      data={booleanSelectData}
                    />
                  </Grid.Col>}
              </Grid>

              <div className="flex justify-end mt-4">
                {!loading && !fetchError && <ButtonComponent
                  fullWidth={false}
                  radius={6}
                  borderColor={colors.text.inverse}
                  variant="filled"
                  type="submit"
                  bgColor={colors.brand.primary}
                  textColor={colors.text.inverse}
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

export default OperatorForm;
