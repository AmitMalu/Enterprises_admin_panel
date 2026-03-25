import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useState } from "react";
import { initialValues, KEY, USER_TYPE_KEBAB_CASE_MAP, UserTypeUpperSnakeCase, URL } from "../../Config/Management/UserAuthConfig";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { toast } from "react-toastify";
import { fetchMasterById, updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import BackHeader from "../Molecules/BackHeader";
import PopupModal from "../Atoms/PopupModal";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { UserType } from "../../Config/UserCreationConfig/UserConfig";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { booleanSelectData } from "../../Utils/utils";
import { updateUser } from "../../Redux/Features/Management/Thunk";
import { colors } from "../../theme/colors";

type FieldVisibilityConfig = {
  basic: string[];
  address: string[];
  outletAddress: string[];
  kyc: string[];
  bank: string[];
  other: string[];
};

const FIELD_VISIBILITY_MAP: Record<UserType | "im-admin", FieldVisibilityConfig> = {
  "retailer": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["longitude", "latitude"],
  },
  "distributor": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "partner": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "super-distributor": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "shopNumber", "businessNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["outletName", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: [],
  },
  "enterprise": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["companyName", "companyType", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["theme", "domainURL", "businessDesc"],
  },
  "white-label": {
    basic: ["name", "title", "emailId", "mobileNumber", "dob", "aadhaarNumber", "panNumber", "isAdmin"],
    address: ["address", "city", "state", "zipCode"],
    outletAddress: ["companyName", "companyType", "address", "city", "state", "zipCode"],
    kyc: ["aadhaarNumber", "panNumber"],
    bank: ["bankName", "bankAccountNumber", "bankHolderName", "ifscCode"],
    other: ["theme", "domainURL", "businessDesc"],
  },
  "im-admin": {
    basic: ["name", "userName", "emailId", "mobileNumber"],
    address: [],
    outletAddress: [],
    kyc: [],
    bank: [],
    other: [],
  },
};

const PendingUserForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string, type: UserTypeUpperSnakeCase }>();
  const userType = type ? USER_TYPE_KEBAB_CASE_MAP[type] : undefined;

  // Determine if form is in edit or view mode based on URL pattern
  const isEditMode = window.location.pathname.includes("/edit/");
  const readOnly = !isEditMode;

  const [formData, setFormData] = useState<any>(initialValues);
  const [originalPayload, setOriginalPayload] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [remark, setRemark] = useState("");
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);

  // Get field visibility config based on user type
  const fieldConfig = userType ? FIELD_VISIBILITY_MAP[userType] : FIELD_VISIBILITY_MAP["retailer"];

  const handleSubmit = useThrottledFormSubmit<any>(() => {
    if (isSubmitting) return;

    if (!selectedAction) {
      toast.error("Please select APPROVE or REJECT.");
      return;
    }

    setIsSubmitting(true);

    const payload: { hierarchyId: string | undefined; isApproved: boolean; remarks?: string } = {
      hierarchyId: id,
      isApproved: selectedAction === "APPROVED" ? true : false
    };
    if (selectedAction === "REJECTED") {
      payload.remarks = remark;
    }

    dispatch(updateMasterItem({ key: KEY, url: `${URL}/approve-or-reject`, data: payload, mode: "POST" }))
      .unwrap()
      .then(() => {
        toast.success(`User ${selectedAction} Successfully`);
        navigate(`/management/user/pending`);
      })
      .catch((err: any) => {
        toast.error(err || "Action failed");
        setTimeout(() => {
          navigate("/management/user/pending");
        }, 2000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, 3000);

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

    try {
      await dispatch(updateUser({ userType, payload, id })).unwrap();
      toast.success("User details updated successfully");
      setOriginalPayload(payload);
      setFormData(payload);
      resetForm({ values: payload });
    } catch (err: any) {
      toast.error(err || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelChanges = (resetForm: any) => {
    if (!originalPayload) return;
    resetForm({ values: originalPayload });
    setFormData(originalPayload);
  };

  useEffect(() => {
    if (!id || !userType) {
      toast.error("Invalid user data");
      navigate("/management/user/pending");
      return;
    }

    const fetchAndSet = async () => {
      if (id && userType) {
        setLoading(true);
        setFetchError(null);
        try {
          const endpoint = API_ENDPOINTS.MANAGEMENT.USER_CREATE[userType];

          const data = await dispatch(
            fetchMasterById({ key: KEY, endpoint, id })
          ).unwrap();
          // Store original payload to preserve structure on edit
          setOriginalPayload(data);
          setFormData(data);
        } catch (err: any) {
          const errorMessage = err || "Something went wrong";
          toast.error(errorMessage);
          setFetchError(errorMessage);
          setTimeout(() => {
            navigate("/management/user/pending");
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
        title={isEditMode ? "Edit User Details" : "Pending User Form"}
        backPath="/management/user/pending"
      />

      {/* Sub Heading */}
      <BreadCrumb type={isEditMode ? "Edit User" : "Pending User"} text="Management" />

      <Formik
        initialValues={formData}
        validationSchema={null}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, values, dirty, resetForm }) => {

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
                          maxLength={51}
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
                  <Grid gutter="lg">
                    {fieldConfig.address.includes("address") && (
                      <Grid.Col className="" span={{ base: 12 }}>
                        <FormikTextInputComponent
                          name="address.address"
                          label="Address"
                          placeholder="Enter Your Address"
                          withAsterisk
                          required
                          maxLength={150}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.address.includes("city") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="address.city"
                          label="Zip Code"
                          placeholder="Enter Your Zipcode"
                          withAsterisk
                          maxLength={6}
                          allowSpecialChar={false}
                          allowCharacter={false}
                          allowSpace={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.address.includes("state") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="address.state"
                          label="State"
                          placeholder="Enter State"
                          withAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.address.includes("zipCode") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="address.zipCode"
                          label="Zip Code"
                          placeholder="Enter Zip Code"
                          withAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
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
                    {fieldConfig.outletAddress.includes("address") && (
                      <Grid.Col className="" span={{ base: 12 }}>
                        <FormikTextInputComponent
                          name="outletAddress.address"
                          label="Company Address"
                          placeholder="Enter Your Company Address"
                          withAsterisk
                          required
                          maxLength={150}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.outletAddress.includes("city") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.city"
                          label="Outlet City"
                          placeholder="Select Your Outlet City"
                          ithAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.outletAddress.includes("state") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.state"
                          label="Outlet State"
                          placeholder="Select Your Outlet State"
                          withAsterisk
                          required
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                    {fieldConfig.outletAddress.includes("zipCode") && (
                      <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                        <FormikTextInputComponent
                          name="outletAddress.zipCode"
                          label="Outlet Zip Code"
                          placeholder="Enter Your Outlet Zipcode"
                          withAsterisk
                          maxLength={6}
                          allowSpecialChar={false}
                          allowCharacter={false}
                          allowSpace={false}
                          disabled={readOnly}
                        />
                      </Grid.Col>
                    )}
                  </Grid>
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
                          label="Website Url"
                          placeholder="Enter Your Website Url"
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

              {/* Action Buttons */}
              {!loading && !fetchError && (
                <div className="flex justify-center mt-8 gap-4 border-t pt-6">
                  {(isEditMode && dirty) ? (
                    <>
                      <ButtonComponent
                        fullWidth={false}
                        radius={6}
                        borderColor={colors.text.inverse}
                        variant="filled"
                        disabled={isSubmitting}
                        bgColor={colors.border.strong}
                        textColor={colors.text.primary}
                        style={{ padding: "0px 30px", letterSpacing: 2 }}
                        onClick={() => {
                          if (dirty) cancelChanges(resetForm);
                          else navigate("/management/user/pending");
                        }}
                      >
                        CANCEL
                      </ButtonComponent>
                      <ButtonComponent
                        fullWidth={false}
                        radius={6}
                        borderColor={colors.text.inverse}
                        variant="filled"
                        type="button"
                        disabled={isSubmitting}
                        bgColor={colors.status.success}
                        textColor={colors.text.inverse}
                        style={{ padding: "0px 30px", letterSpacing: 2 }}
                        onClick={() => saveChanges(values, resetForm)}
                      >
                        {isSubmitting ? "SAVING..." : "SAVE CHANGES"}
                      </ButtonComponent>
                    </>
                  ) : (
                    <>
                      <ButtonComponent
                        fullWidth={false}
                        radius={6}
                        borderColor={colors.text.inverse}
                        variant="filled"
                        disabled={isSubmitting}
                        bgColor={colors.brand.primary}
                        textColor={colors.text.inverse}
                        style={{ padding: "0px 30px", letterSpacing: 2 }}
                        onClick={() => {
                          setSelectedAction("REJECTED");
                          setIsRemarkModalOpen(true);
                        }}
                      >
                        REJECT
                      </ButtonComponent>
                      <ButtonComponent
                        fullWidth={false}
                        radius={6}
                        borderColor={colors.text.inverse}
                        variant="filled"
                        disabled={isSubmitting}
                        bgColor={colors.status.success}
                        textColor={colors.text.inverse}
                        style={{ padding: "0px 30px", letterSpacing: 2 }}
                        onClick={() => {
                          setSelectedAction("APPROVED");
                          handleSubmit();
                        }}
                      >
                        APPROVED
                      </ButtonComponent>
                    </>
                  )}
                </div>
              )}

              {/* Rejection Remark Modal */}
              <PopupModal
                opened={isRemarkModalOpen}
                onClose={() => {
                  setIsRemarkModalOpen(false);
                  setRemark("");
                }}
                size="md"
                padding="md"
                title="Enter Rejection Remark"
                titleSize="16px"
                titleWeight={600}
              >
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter rejection reason"
                  className="w-full border rounded p-2 text-sm max-h-20 min-h-12"
                  minLength={5}
                  maxLength={100}
                />

                <div className="flex justify-end gap-4 mt-4">
                  <ButtonComponent
                    onClick={() => {
                      setIsRemarkModalOpen(false);
                      setRemark("");
                    }}
                    bgColor={colors.border.strong}
                    textColor={colors.text.primary}
                  >
                    Cancel
                  </ButtonComponent>

                  <ButtonComponent
                    onClick={() => {
                      if (!remark.trim()) {
                        toast.error("Remark is mandatory for rejection.");
                      } else {
                        setIsRemarkModalOpen(false);
                        handleSubmit();
                      }
                    }}
                    type="submit"
                    bgColor={colors.status.danger}
                    textColor={colors.text.inverse}
                  >
                    Submit
                  </ButtonComponent>
                </div>
              </PopupModal>

            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default PendingUserForm
