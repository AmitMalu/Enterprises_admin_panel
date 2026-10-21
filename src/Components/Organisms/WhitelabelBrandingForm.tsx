import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ActionIcon, Grid, Image, Loader, Tooltip } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import FormikColorInput from "../Molecules/FormikColorInput";
import FormikFileInput from "../Molecules/FormikFileInput";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterById, fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import {
  WhitelabelBrandingFormType,
  initialValues,
  TENANT_KEY,
  TENANT_URL,
  transformToFormDataInit,
  transformFormToCreatePayload,
  transformFormToUpdatePayload,
  validationSchema,
} from "../../Config/Management/WhitelabelBrandingConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import PopupModal from "../Atoms/PopupModal";
import { colors } from "../../theme/colors";
import wlBrandingExample from "../../assets/Images/wl_branding_example_2.png";

type WhitelabelBrandingFormProps = { mode: "add" | "edit" };

const WhitelabelBrandingForm = ({ mode }: WhitelabelBrandingFormProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<WhitelabelBrandingFormType>(initialValues);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [wlDropdownData, setWlDropdownData] = useState<any[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [previewOpened, setPreviewOpened] = useState(false);

  const handleSubmit = useThrottleMasterFormSubmit<WhitelabelBrandingFormType>({
    mode: "add",
    id,
    useFormData: true,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: TENANT_KEY,
    addUrl: `${TENANT_URL}/create`,
    updateUrl: `${TENANT_URL}/create`,
    transformCreatePayload: transformFormToCreatePayload,
    transformUpdatePayload: transformFormToUpdatePayload,
    successNavigatePath: "/management/whitelabel-branding",
    entityName: "Whitelabel Branding",
  });

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        setDropdownLoading(true);
        const result = await dispatch(
          fetchMasterDropdown({ url: API_ENDPOINTS.COMMON.HIERARCHY_WL })
        ).unwrap();
        const mapped = (result || []).map((item: any) => ({
          value: String(item.id),
          label: String(item.displayName),
        }));
        setWlDropdownData(mapped);
      } catch (error) {
        console.error("Failed to fetch WL dropdown:", error);
        toast.error("Failed to load White Label options");
      } finally {
        setDropdownLoading(false);
      }
    };

    fetchDropdown();
  }, []);

  useEffect(() => {
    const fetchAndSet = async () => {
      if (mode === "edit" && id) {
        setLoading(true);
        setFetchError(null);
        try {
          const data = await dispatch(
            fetchMasterById({ key: TENANT_KEY, endpoint: TENANT_URL, id })
          ).unwrap();

          setFormData(transformToFormDataInit(data));
        } catch (err: any) {
          toast.error(err);
          setFetchError(err);
          setTimeout(() => {
            navigate("/management/whitelabel-branding");
          }, 2000);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSet();

    return () => {
      if (mode === "edit") {
        setFormData(initialValues);
      }
    };
  }, [dispatch, id, mode]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
      <BackHeader
        title={mode === "edit" ? "Edit Whitelabel Branding" : "Add Whitelabel Branding"}
        backPath="/management/whitelabel-branding"
      />

      <BreadCrumb type={"Brand Studio"} text="Network" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl relative">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12 }} className="flex justify-end">
                  <Tooltip label="Preview how fields appear on portal">
                    <ActionIcon
                      variant="light"
                      color="gray"
                      size="lg"
                      className="absolute top-3 right-3"
                      onClick={() => setPreviewOpened(true)}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </ActionIcon>
                  </Tooltip>
                </Grid.Col>

                {/* White Label Dropdown */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikSelectComponent
                    name="whiteLabelId"
                    label="White Label"
                    placeholder="Select White Label"
                    data={wlDropdownData}
                    nothingFoundMessage="Nothing found"
                    allowDeselect={true}
                    searchable={true}
                    disabled={dropdownLoading}
                    rightSection={dropdownLoading ? <Loader size="xs" /> : null}
                    withAsterisk
                    required
                  />
                </Grid.Col>

                {/* Domain Name */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="domainName"
                    label="Domain Name"
                    placeholder="e.g. portal.abc.com"
                    withAsterisk
                    maxLength={30}
                  />
                </Grid.Col>

                {/* Tenant Code */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="tenantCode"
                    label="Tenant Code"
                    placeholder="e.g. myportal"
                    withAsterisk
                    maxLength={10}
                    minLength={3}
                  />
                </Grid.Col>

                {/* Portal Title */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="portalTitle"
                    label="Portal Title"
                    placeholder="Enter Portal Title"
                    maxLength={15}
                  />
                </Grid.Col>

                {/* Welcome Text */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="welcomeText"
                    label="Welcome Text"
                    placeholder="Enter Welcome Text"
                    maxLength={60}
                  />
                </Grid.Col>

                {/* Company Name */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikTextInputComponent
                    name="companyName"
                    label="Company Name"
                    placeholder="Enter Company Name"
                    maxLength={20}
                  />
                </Grid.Col>

                {/* Primary Color */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikColorInput
                    name="primaryColor"
                    label="Primary Color"
                    placeholder="Pick or enter color"
                    withAsterisk={false}
                  />
                </Grid.Col>

                {/* Secondary Color */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikColorInput
                    name="secondaryColor"
                    label="Secondary Color"
                    placeholder="Pick or enter color"
                    withAsterisk={false}
                  />
                </Grid.Col>

                {/* isActive - only in edit mode */}
                {/* {mode === "edit" && (
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikSelectComponent
                      name="isActive"
                      label="Active"
                      placeholder="Select"
                      withAsterisk
                      data={[
                        { value: "1", label: "Active" },
                        { value: "0", label: "Inactive" },
                      ]}
                    />
                  </Grid.Col>
                )} */}

                {/* Logo */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="logo"
                    label="Logo"
                    placeholder="Select Logo"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </Grid.Col>

                {/* Favicon */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="faviconFile"
                    label="Favicon"
                    placeholder="Select Favicon"
                    accept="image/x-icon, image/png, image/jpeg, image/jpg"
                  />
                </Grid.Col>

                {/* Background */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="background"
                    label="Background"
                    placeholder="Select Background"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </Grid.Col>

                {/* Login Artwork */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="loginArtwork"
                    label="Login Artwork"
                    placeholder="Select Login Artwork"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </Grid.Col>

                {/* Terms & Conditions */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="terms"
                    label="Terms & Conditions"
                    placeholder="Select PDF"
                    accept="application/pdf"
                  />
                </Grid.Col>

                {/* Privacy Policy */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="privacy"
                    label="Privacy Policy"
                    placeholder="Select PDF"
                    accept="application/pdf"
                  />
                </Grid.Col>

                {/* Refund Policy */}
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  <FormikFileInput
                    name="refund"
                    label="Refund Policy"
                    placeholder="Select PDF"
                    accept="application/pdf"
                  />
                </Grid.Col>
              </Grid>

              <div className="flex justify-end mt-4">
                {!loading && !fetchError && (
                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    borderColor={colors.text.inverse}
                    variant="filled"
                    type="submit"
                    bgColor={colors.brand.primary}
                    textColor={colors.text.inverse}
                    style={{ padding: "10px 30px" }}
                  >
                    {mode === "edit" ? "Update" : "Save"}
                  </ButtonComponent>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>

      <PopupModal
        opened={previewOpened}
        onClose={() => setPreviewOpened(false)}
        title="Field Reference Guide"
        size="xl"
      >
        <Image
          src={wlBrandingExample}
          alt="Whitelabel branding field reference"
          fit="contain"
          radius="md"
        />
      </PopupModal>
    </div>
  );
};

export default WhitelabelBrandingForm;
