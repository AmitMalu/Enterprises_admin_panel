import { useEffect, useState } from "react";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
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
import { booleanSelectData } from "../../Utils/utils";
import ButtonComponent from "../Atoms/ButtonComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { useOperatorSubOperator } from "../../Utils/hooks/useOperatorSubOperator";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";

type ProductFormProps = { mode: "add" | "edit" };

const SubOperatorForm = ({ mode }: ProductFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SubOperatorFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = useThrottleMasterFormSubmit<SubOperatorFormType>({
    mode,
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateSubOperatorPayload,
    transformUpdatePayload: transformFormToUpdateSubOperatorPayload,
    successNavigatePath: "/master/sub-operator",
    entityName: "Sub-Operator",
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

          setFormData(transformSubOperatorToFormData(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/sub-operator");
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

      <BackHeader
        title={mode === "edit"
          ? "Edit Sub-Operator"
          : "Add Sub-Operator"}
        backPath="/master/sub-operator"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Sub-Operator"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {() => {
          const { operatorDropdownData, loadingOperatorList } =
            useOperatorSubOperator({});

          type OperatorDropdownItem = { label: string; value: string; code: string };
          const dropdownDataWithCodeAsValue = (operatorDropdownData as OperatorDropdownItem[] | undefined)?.map(item => ({
            label: item.label,
            value: item.code, // override
          }));

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
                    allowDeselect={true}
                    searchable={true}
                    // value={formik.values.operatorName}
                    placeholder="Select Operator"
                    withAsterisk
                    required
                    data={dropdownDataWithCodeAsValue}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default SubOperatorForm;
