import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useState } from "react";
import { initialValues, USER_TYPE_KEBAB_CASE_MAP, UserTypeUpperSnakeCase, FIELD_VISIBILITY_MAP, getValidationSchema } from "../../Config/Management/UserAuthConfig";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import BackHeader from "../Molecules/BackHeader";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { booleanSelectData } from "../../Utils/utils";
import { updateUser } from "../../Redux/Features/Management/Thunk";
import { colors } from "../../theme/colors";
import FormikFileInput from "../Molecules/FormikFileInput";
import { useAddressFromZipcode } from "../../Utils/hooks/useAddressFromZipcode";

const AddressFields = ({
  formik,
  prefix,
  visibleFields,
  readOnly,
  addressLabel = "Address",
  zipCodeLabel = "Zip Code",
  cityLabel = "City",
  stateLabel = "State",
  addressPlaceholder = "Enter Your Address",
}: {
  formik: FormikProps<any>;
  prefix: string;
  visibleFields: string[];
  readOnly: boolean;
  addressLabel?: string;
  zipCodeLabel?: string;
  cityLabel?: string;
  stateLabel?: string;
  addressPlaceholder?: string;
}) => {
  const { location, loading, error } = useAddressFromZipcode(formik.values?.[prefix]?.zipCode);

  useEffect(() => {
    if (formik.values?.[prefix]?.zipCode && !loading) {
      if (location.state || location.city) {
        formik.setValues((prev: any) => ({
          ...prev,
          [prefix]: {
            ...prev[prefix],
            state: location.state || "",
            city: location.city || "",
          },
        }));
        formik.setFieldError(`${prefix}.state`, "");
        formik.setFieldError(`${prefix}.city`, "");
      } else {
        formik.setValues((prev: any) => ({
          ...prev,
          [prefix]: {
            ...prev[prefix],
            state: "",
            city: "",
          },
        }));
      }
    }
  }, [location.state, location.city, formik.values?.[prefix]?.zipCode, loading]);

  useEffect(() => {
    if (error) {
      formik.setFieldError(`${prefix}.zipCode`, error);
    } else {
      formik.setFieldError(`${prefix}.zipCode`, "");
    }
  }, [error]);

  return (
    <Grid gutter="lg">
      {visibleFields.includes("address") && (
        <Grid.Col span={{ base: 12 }}>
          <FormikTextInputComponent
            name={`${prefix}.address`}
            label={addressLabel}
            placeholder={addressPlaceholder}
            withAsterisk
            required
            minLength={15}
            maxLength={100}
            disabled={readOnly}
          />
        </Grid.Col>
      )}
      {visibleFields.includes("zipCode") && (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            name={`${prefix}.zipCode`}
            label={zipCodeLabel}
            placeholder="Enter Zip Code"
            withAsterisk
            required
            disabled={readOnly || !!loading}
            maxLength={6}
            allowSpecialChar={false}
            allowCharacter={false}
            allowSpace={false}
            error={error}
            rightSection={loading ? <Loader size={16} /> : null}
          />
        </Grid.Col>
      )}
      {visibleFields.includes("state") && (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            value={formik.values?.[prefix]?.state || ""}
            key={`state-${prefix}-${formik.values?.[prefix]?.state || "empty"}`}
            name={`${prefix}.state`}
            label={stateLabel}
            placeholder="Auto-filled from Zip Code"
            withAsterisk
            disabled
            rightSection={loading ? <Loader size={16} /> : null}
          />
        </Grid.Col>
      )}
      {visibleFields.includes("city") && (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            value={formik.values?.[prefix]?.city || ""}
            key={`city-${prefix}-${formik.values?.[prefix]?.city || "empty"}`}
            name={`${prefix}.city`}
            label={cityLabel}
            placeholder="Auto-filled from Zip Code"
            withAsterisk
            required
            disabled
            rightSection={loading ? <Loader size={16} /> : null}
          />
        </Grid.Col>
      )}
    </Grid>
  );
};

const OnboardedUserForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string, type: UserTypeUpperSnakeCase }>();
  const userType = type ? USER_TYPE_KEBAB_CASE_MAP[type] : undefined;

  // Determine if form is in edit or view mode based on URL pattern
  const isEditMode = window.location.pathname.includes("/edit/");
  const readOnly = !isEditMode;
  const [formData, setFormData] = useState<any>(initialValues);
  const [originalPayload, setOriginalPayload] = useState<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Get field visibility config based on user type
  const fieldConfig = userType ? FIELD_VISIBILITY_MAP[userType] : FIELD_VISIBILITY_MAP["retailer"];

  // Save changes handler used when user edits fields inline
  const saveChanges = async (values: any, resetForm: any) => {
    if (isSubmitting) return;
    if (!id || !userType) {
      toast.error("Invalid user data");
      return;
    }
    if (!originalPayload) {
      toast.error("Original data not loaded");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...originalPayload,
      ...values,
    };

    const files = {
      aadhaarCardFrontImage: values.aadhaarCardFrontImage,
      aadhaarCardBackImage: values.aadhaarCardBackImage,
      shopImage: values.shopImage,
      panCardImage: values.panCardImage,
      businessProofImage: values.businessProofImage,
    };

    // Remove the files from the JSON payload so they can be appended individually
    delete payload.aadhaarCardFrontImage;
    delete payload.aadhaarCardBackImage;
    delete payload.shopImage;
    delete payload.panCardImage;
    delete payload.businessProofImage;

    try {
      await dispatch(updateUser({ userType, payload, id, files })).unwrap();
      toast.success("User details updated successfully");
      setOriginalPayload(payload);
      setFormData(payload);
      resetForm({ values: payload });
      navigate("/management/user/onboarded");
    } catch (err: any) {
      toast.error(err || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!id || !userType) {
      toast.error("Invalid user data");
      navigate("/management/user/onboarded");
      return;
    }

    const fetchAndSet = async () => {
      if (id && userType) {
        setLoading(true);
        setFetchError(null);
        try {
          const endpoint = API_ENDPOINTS.MANAGEMENT.USER_CREATE[userType];

          const data = await dispatch(
            fetchMasterById({ key: "USER_AUTH", endpoint, id })
          ).unwrap();
          // Store original payload to preserve structure on edit
          setOriginalPayload(data);
          setFormData(data);
        } catch (err: any) {
          const errorMessage = err || "Something went wrong";
          toast.error(errorMessage);
          setFetchError(errorMessage);
          setTimeout(() => {
            navigate("/management/user/onboarded");
          }, 2000);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSet();

    return () => {
      setFormData(initialValues);
      setOriginalPayload(null);
    };
  }, [dispatch, id]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">

      <BackHeader
        title={isEditMode ? "Edit Onboarded User" : "Onboarded User Form"}
        backPath="/management/user/onboarded"
      />

      {/* Sub Heading */}
      <BreadCrumb type={isEditMode ? "Edit Onboarded User" : "Onboarded User"} text="Management" />

      <Formik
        initialValues={formData}
        validationSchema={userType ? getValidationSchema(userType) : null}
        onSubmit={(values, { resetForm }) => saveChanges(values, resetForm)}
        enableReinitialize
      >
        {(formik) => {
          const { values, dirty, errors } = formik;
          console.log(values, "chec");
          console.log(errors, "errors");

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">

              {/* Basic Information Section */}
              {fieldConfig.basic.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
                  <Grid gutter="lg">
                    {fieldConfig.basic.includes("name") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="name"
                          label="Name"
                          placeholder="Type Name"
                          withAsterisk
                          minLength={2}
                          maxLength={50}
                          allowNumber={false}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("title") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="title"
                          label="Title"
                          placeholder="Enter Title"
                          withAsterisk
                          required
                          maxLength={51}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {/* {fieldConfig.basic.includes("abbreviation") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="abbreviation"
                          label="Abbreviation/Prefix"
                          placeholder="Enter Abbreviation"
                          withAsterisk
                          capitalize
                          maxLength={3}
                          allowNumber={false}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )} */}
                    {fieldConfig.basic.includes("emailId") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="emailId"
                          label="Email ID"
                          placeholder="Enter Your Email Address"
                          withAsterisk
                          maxLength={50}
                          disabled={readOnly}
                          toLowerCase
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("mobileNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="mobileNumber"
                          label="Mobile Number"
                          placeholder="Enter Your Mobile Number"
                          withAsterisk
                          maxLength={10}
                          allowSpecialChar={false}
                          allowCharacter={false}
                          disabled={true}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("dob") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="dob"
                          label="Date of Birth"
                          placeholder="YYYY-MM-DD"
                          type="date"
                          withAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("shopNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="shopNumber"
                          label="Shop Number"
                          placeholder="Enter Your Shop Number"
                          withAsterisk
                          required
                          maxLength={20}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("businessNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="businessNumber"
                          label="Business Number"
                          placeholder="Enter Your Business Number"
                          withAsterisk
                          required
                          maxLength={20}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("aadhaarNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="aadhaarNumber"
                          label="Aadhaar Number"
                          placeholder="Enter Your Aadhaar Number"
                          withAsterisk
                          required
                          maxLength={15}
                          allowSpace={false}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("panNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="panNumber"
                          label="Pan Number"
                          placeholder="Enter Your Pan Number"
                          withAsterisk
                          capitalize
                          required
                          maxLength={15}
                          allowSpace={false}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("isAdmin") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikSelectComponent
                          name="isAdmin"
                          label="Is WL-Admin"
                          allowDeselect={false}
                          placeholder="Select Is WL-Admin"
                          withAsterisk
                          data={booleanSelectData}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.basic.includes("userName") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="userName"
                          label="Username"
                          placeholder="Enter Username"
                          withAsterisk
                          required
                          maxLength={51}
                          allowSpecialChar={true}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
                </div>
              )}

              {/* Address Section */}
              {fieldConfig.address.length > 0 && (
                <div className="mb-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Primary Address</h3>
                  <AddressFields
                    formik={formik}
                    prefix="address"
                    visibleFields={fieldConfig.address}
                    readOnly={readOnly}
                  />
                </div>
              )}

              {/* Outlet Address Section */}
              {fieldConfig.outletAddress.length > 0 && (
                <div className="mb-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Outlet/Company Address</h3>
                  <Grid gutter="lg">
                    {fieldConfig.outletAddress.includes("outletName") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.outletName"
                          label="Outlet Name"
                          placeholder="Enter Outlet Name"
                          withAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.outletAddress.includes("companyName") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.companyName"
                          label="Company Name"
                          placeholder="Enter Your Company Name"
                          withAsterisk
                          required
                          maxLength={150}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.outletAddress.includes("companyType") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.companyType"
                          label="Company Type"
                          placeholder="Enter Your Company Type"
                          withAsterisk
                          required
                          maxLength={150}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
                  <AddressFields
                    formik={formik}
                    prefix="outletAddress"
                    visibleFields={fieldConfig.outletAddress.filter(f => ["address", "city", "state", "zipCode"].includes(f))}
                    readOnly={readOnly}
                    addressLabel="Company Address"
                    addressPlaceholder="Enter Your Company Address"
                    cityLabel="Outlet City"
                    stateLabel="Outlet State"
                    zipCodeLabel="Outlet Zip Code"
                  />
                </div>
              )}

              {/* Bank Details Section */}
              {fieldConfig.bank.length > 0 && (
                <div className="mb-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Bank Details</h3>
                  <Grid gutter="lg">
                    {fieldConfig.bank.includes("bankName") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="bankDetails.bankName"
                          label="Bank Name"
                          placeholder="Enter Your Bank Name"
                          withAsterisk
                          required
                          maxLength={50}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.bank.includes("bankHolderName") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="bankDetails.bankHolderName"
                          label="Bank Holder Name"
                          placeholder="Enter Bank Holder Name"
                          withAsterisk
                          maxLength={50}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.bank.includes("bankAccountNumber") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="bankDetails.bankAccountNumber"
                          label="Bank Account Number"
                          placeholder="Enter Your bank Account Number"
                          withAsterisk
                          required
                          maxLength={18}
                          allowSpecialChar={false}
                          allowCharacter={false}
                          allowSpace={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.bank.includes("ifscCode") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="bankDetails.ifscCode"
                          label="Bank IFSC Code"
                          placeholder="Enter Your bank IFSC Code"
                          withAsterisk
                          required
                          capitalize
                          maxLength={11}
                          allowSpecialChar={false}
                          allowSpace={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
                </div>
              )}

              {/* Other Fields Section (Retailer-specific, Enterprise-specific) */}
              {fieldConfig.other.length > 0 && (
                <div className="mb-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Details</h3>
                  <Grid gutter="lg">
                    {fieldConfig.other.includes("longitude") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="longitude"
                          label="Longitude"
                          placeholder="Enter longitude"
                          allowCharacter={false}
                          allowSpace={false}
                          fullWidth
                          withAsterisk
                          maxLength={11}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.other.includes("latitude") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="latitude"
                          label="Latitude"
                          placeholder="Enter latitude"
                          allowCharacter={false}
                          allowSpace={false}
                          fullWidth
                          withAsterisk
                          maxLength={11}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.other.includes("domainURL") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="websiteURL"
                          label="Login Domain URL"
                          placeholder="Enter Your Login Domain Url"
                          withAsterisk
                          required
                          maxLength={100}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.other.includes("businessDesc") && (
                      <Grid.Col className="" span={{ base: 12 }}>
                        <FormikTextInputComponent
                          name="businessDesc"
                          label="Business Description"
                          placeholder="Enter Your Business Description"
                          withAsterisk
                          required
                          maxLength={100}
                          allowSpecialChar={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
                </div>
              )}

              {/* Documents Section */}
              <div className="mb-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Documents</h3>
                <Grid gutter="lg">
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikFileInput
                      name="aadhaarCardFrontImage"
                      label="Aadhaar Card Front Image"
                      size="sm"
                      accept="image/png, image/jpeg"
                      disabled={readOnly}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikFileInput
                      name="aadhaarCardBackImage"
                      label="Aadhaar Card Back Image"
                      size="sm"
                      accept="image/png, image/jpeg"
                      disabled={readOnly}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikFileInput
                      name="shopImage"
                      label="Shop Image"
                      size="sm"
                      accept="image/png, image/jpeg"
                      disabled={readOnly}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikFileInput
                      name="panCardImage"
                      label="PAN Card Image"
                      size="sm"
                      accept="image/png, image/jpeg"
                      disabled={readOnly}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <FormikFileInput
                      name="businessProofImage"
                      label="Business Proof Image"
                      size="sm"
                      accept="image/png, image/jpeg"
                      disabled={readOnly}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              {/* Action Buttons */}
              {!loading && !fetchError && (
                <div className="flex justify-center mt-8 gap-4 border-t pt-6">
                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    borderColor={colors.text.inverse}
                    variant="filled"
                    disabled={isSubmitting}
                    bgColor={colors.border.strong}
                    textColor={colors.text.primary}
                    style={{ padding: "0px 30px", letterSpacing: 2 }}
                    onClick={() => navigate("/management/user/onboarded")}
                  >
                    CANCEL
                  </ButtonComponent>
                  <ButtonComponent
                    fullWidth={false}
                    radius={6}
                    borderColor={colors.text.inverse}
                    variant="filled"
                    type="button"
                    disabled={!dirty || isSubmitting}
                    bgColor={colors.status.success}
                    textColor={colors.text.inverse}
                    style={{ padding: "0px 30px", letterSpacing: 2 }}
                    onClick={() => formik.handleSubmit()}
                  >
                    {isSubmitting ? "SAVING..." : "SAVE CHANGES"}
                  </ButtonComponent>
                </div>
              )}

            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default OnboardedUserForm
