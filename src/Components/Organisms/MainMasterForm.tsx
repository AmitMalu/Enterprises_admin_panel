import { Form, Formik } from "formik";
import ButtonComponent from "../Atoms/ButtonComponent";
import TextComponent from "../Atoms/TextComponent";
import BreadCrumb from "../Molecules/BreadCrumb";
import {
  initialValues,
  MainMasterFormType,
  MASTER_KEY,
  MASTER_URL,
  transformFormToCreateMainMasterPayload,
  transformFormToUpdateMainMasterPayload,
  validationSchema,
} from "../../Config/Master/MainMasterConfig";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";

type MainMasterFormProps = { mode: "add" | "edit" };

const MainMasterForm = ({ mode }: MainMasterFormProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MainMasterFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleSubmit = useThrottleMasterFormSubmit<MainMasterFormType>({
    id,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: MASTER_KEY,
    addUrl: MASTER_URL,
    updateUrl: MASTER_URL,
    transformCreatePayload: transformFormToCreateMainMasterPayload,
    transformUpdatePayload: transformFormToUpdateMainMasterPayload,
    successNavigatePath: "/master/main",
    entityName: "Master"
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

          setFormData(data);
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/master/main");
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
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {mode === "edit" ? "Edit Main Master Form" : "Main Master Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Main"} text="Master" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
              <FormikTextInputComponent
                name="imMasterName"
                label="Master Name"
                placeholder="Enter Master Name"
                withAsterisk
                required
                maxLength={100}
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
      </Formik>
    </div>
  );
};

export default MainMasterForm;
