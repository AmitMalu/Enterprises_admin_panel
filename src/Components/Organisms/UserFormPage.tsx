import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserConfig,
  UserType,
} from "../../Config/UserCreationConfig/UserConfig";
import TextComponent from "../Atoms/TextComponent";
import { capitalizeWords } from "../../Utils/utils";
import BreadCrumb from "../Molecules/BreadCrumb";
import FormStepperButton from "../Molecules/FormStepperButton";
import FormStepper from "../Atoms/FormStepper";
import {
  getValidationSchema,
  handleFormSubmit,
  masterInitialValues,
  SubmitHandlerArgs,
} from "../../Config/UserCreationConfig/MasterFormConfig";
import { Form, Formik, FormikProps } from "formik";
import { useAppDispatch } from "../../Redux/hooks";
import FormSuccessModel from "../Atoms/FormSuccessModel";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import {
  AdhaarPanLinkApi,
  DownloadAadhaarApi,
  // AdhaarPanLinkApi, AdhaarValidationApi,
  InitializeDigilockerApi, PanValidationApi
} from "../../Redux/Features/Masters/MastersThunk";
// import { toast } from "react-toastify";
import PopupModal from "../Atoms/PopupModal";
import ButtonComponent from "../Atoms/ButtonComponent";
import { colors } from "../../theme/colors";

const UserFormPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { type } = useParams<{ type: string }>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);


  const isValidType = (type: string): type is UserType => {
    return type in UserConfig;
  };

  if (!type || !isValidType(type)) {
    return <div>User Type Not Available</div>;
  }

  const userType: UserType = type;
  const config = UserConfig[userType];

  // const handleAadhaarVerify = async (formik: FormikProps<any>) => {

  //   const { aadhaarNumber } = formik.values;

  //   if (!/^\d{12}$/.test(aadhaarNumber)) {
  //     formik.setFieldError("aadhaarNumber", "Aadhaar must be 12 digits");
  //     return;
  //   }

  //   try {
  //     const resData = await dispatch(AdhaarValidationApi({ aadhaarNumber })).unwrap();
  //     const isAadhaarSuccess = resData?.success === true && resData?.status_code === 200;

  //     if (!isAadhaarSuccess) {
  //       const remark = resData?.data?.remarks || resData?.message || "Verification failed.";

  //       formik.setFieldValue("isAadhaarVerified", false);
  //       formik.setFieldValue("aadhaarPanVerified", false);
  //       formik.setTouched({ aadhaarNumber: true });

  //       setTimeout(() => {
  //         formik.setFieldError("aadhaarNumber", remark);
  //       }, 0);

  //       return;
  //     }
  //     // Aadhaar verification passed ✅
  //     // Now check Aadhaar-PAN link
  //     try {
  //       const panLinkRes = await dispatch(AdhaarPanLinkApi({ aadhaarNumber })).unwrap();
  //       const isPanApiSuccess = panLinkRes?.status_code === 200;
  //       const isLinked = isPanApiSuccess && panLinkRes?.data?.linking_status === true;

  //       // Save PAN linking status
  //       formik.setFieldValue("aadhaarPanVerified", isLinked);

  //       // Only now mark Aadhaar as fully verified
  //       formik.setFieldValue("isAadhaarVerified", true);
  //       formik.setFieldError("aadhaarNumber", "");
  //     } catch (error) {
  //       // PAN API failed – Aadhaar verification fails too ❌
  //       console.error("Aadhaar-PAN link check failed:", error);
  //       toast.error("Aadhaar-PAN link check failed. Please try again.");
  //       formik.setFieldValue("aadhaarPanVerified", false);
  //       formik.setFieldValue("isAadhaarVerified", false);
  //       formik.setFieldError("aadhaarNumber", "Aadhaar-PAN link check failed");
  //     }
  //   } catch (error) {
  //     console.error("Aadhaar verification error:", error);
  //     formik.setFieldValue("isAadhaarVerified", false);
  //     formik.setFieldError("aadhaarNumber", "Something went wrong during verification.");
  //   }
  // };

  const handleAadhaarVerify = async (formik: FormikProps<any>) => {
    try {
      // DIGILOCKER FLOW - 1. Get Initialized Token
      const response = await dispatch(InitializeDigilockerApi()).unwrap();

      const { token } = response.data;

      document.getElementById("digilocker-button")!.innerHTML = "";

      window.DigiboostSdk({
        gateway: "production",
        token,
        selector: "#digilocker-button",
        onSuccess: async (data: any) => {
          try {
            const clientId = data?.client_id;

            const aadhaarResponse = await dispatch(
              DownloadAadhaarApi({
                clientId,
              })
            ).unwrap();

            const aadhaarData = aadhaarResponse?.data?.aadhaar_xml_data;

            // Update only name
            formik.setFieldValue(
              "name",
              aadhaarData?.full_name || formik.values.name
            );

            // Aadhaar verified irrespective of PAN link
            formik.setFieldValue(
              "isAadhaarVerified",
              true
            );

            // Aadhaar-PAN Link Check
            try {
              const panLinkRes = await dispatch(
                AdhaarPanLinkApi({
                  aadhaarNumber: formik.values.aadhaarNumber,
                })
              ).unwrap();

              const isLinked =
                panLinkRes?.status_code === 200 &&
                panLinkRes?.data?.linking_status === true;

              formik.setFieldValue(
                "aadhaarPanVerified",
                isLinked
              );

              formik.setFieldError(
                "aadhaarNumber",
                ""
              );
            } catch (error) {
              console.error(
                "Aadhaar PAN link check failed",
                error
              );

              formik.setFieldValue(
                "aadhaarPanVerified",
                false
              );
            }
          } catch (error) {
            console.error("Download Aadhaar Failed", error);

            formik.setFieldValue("isAadhaarVerified", false);
          }
        },

        onFailure: (error: any) => {
          console.error("SDK Failed", error);

          formik.setFieldValue(
            "isAadhaarVerified",
            false
          );
        },
      });

      // Trigger SDK button click automatically
      setTimeout(() => {
        const sdkButton = document.querySelector(
          "#digilocker-button button"
        ) as HTMLButtonElement | null;

        sdkButton?.click();
      }, 100);

    } catch (error) {
      console.error(error);
    }
  };

  const handlePanVerify = async (formik: FormikProps<any>) => {
    const { panNumber } = formik.values;

    if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(panNumber)) {
      formik.setFieldError("panNumber", "Invalid PAN format");
      return;
    }

    try {
      const resData = await dispatch(PanValidationApi({ panNumber })).unwrap();

      const isSuccess = resData?.status_code === 200;

      if (isSuccess) {
        formik.setFieldValue("panVerified", true);
        formik.setFieldError("panNumber", "");
      } else {
        formik.setFieldValue("panVerified", false);
        formik.setTouched({ panNumber: true });

        const remark = resData?.message || "PAN verification failed.";
        setTimeout(() => {
          formik.setFieldError("panNumber", remark);
        }, 0);
      }
    } catch (error) {
      console.error("PAN verification error:", error);
      formik.setFieldValue("panVerified", false);
      formik.setFieldError("panNumber", "Something went wrong during PAN verification.");
    }
  };

  const throttledHandleSubmit = useThrottledFormSubmit((args: SubmitHandlerArgs) => {
    handleFormSubmit(args);
  }, 5000); // 3 seconds delay

  const handleBack = (formik?: FormikProps<any>) => {
    // Check if form is dirty (user has modified anything)
    if (formik && formik.dirty) {
      setIsConfirmOpen(true);
    } else {
      navigate("/management/user/create");
    }
  };

  const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const hierarchyId = storedUser?.hierarchyId || "";

  return (
    <div className="p-4 w-full h-[calc(100vh-90px)] flex flex-col">

      {/* Hidden SDK Container */}
      <div
        id="digilocker-button"
        style={{ display: "none" }}
      />

      {/* Formik Wrapper */}
      <Formik
        initialValues={{
          ...masterInitialValues,
          parentAccount: hierarchyId, // dynamically inject before Formik mounts
        }}
        enableReinitialize
        validationSchema={getValidationSchema(userType, activeStep)}
        // validationSchema={null}
        onSubmit={async (values, formikHelpers) => {
          if (activeStep === config.steps.length - 1) {
            throttledHandleSubmit({
              values,
              formikHelpers,
              userType,
              navigate,
              dispatch,
              setShowSuccessModal,
              setActiveStep,
            });
          } else {
            setActiveStep((prev) => prev + 1);

            // Reset submit count to treat next step as fresh
            formikHelpers.setTouched({});
            formikHelpers.setFormikState((prev) => ({
              ...prev,
              submitCount: 0,
            }));
          }
        }}
      >
        {(formik: FormikProps<any>) => {
          console.log(formik.errors, "formik-errors");

          return (
            // Scrollable Form Content area
            <>
              {/* Header Form Type */}
              <BackHeader
                title={`${capitalizeWords(type)} Form`}
                onBack={() => handleBack(formik)}
              />

              {/* Sub Heading */}
              <BreadCrumb type={`${type} Form`} text="Management" />

              {/* Stepper */}
              <FormStepper steps={config.steps} activeStep={activeStep} />

              <Form className="flex-1 overflow-auto scrollbar-hide py-2 xl:py-4 px-4 bg-white rounded-2xl">
                {/* Form Heading */}
                <div className="mb-4">
                  <TextComponent fontFamily="Inter" fontSize={20} fontWeight={500}>
                    {config.steps[activeStep]}
                  </TextComponent>
                </div>

                {/* Render the actual form for current step */}
                {config.renderStepForm(activeStep, formik, {
                  onAadhaarVerify: handleAadhaarVerify,
                  onPanVerify: handlePanVerify,
                })}

                {/* Buttons */}
                <FormStepperButton
                  activeStep={activeStep}
                  maxSteps={config.steps.length}
                  onBack={() => setActiveStep((prev) => prev - 1)}
                  onNext={() => formik.handleSubmit()}
                  onFinalStep={() => formik.handleSubmit()}
                />
              </Form>
            </>
          )
        }}
      </Formik>

      {/* Success Modal */}
      <FormSuccessModel
        opened={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <PopupModal
        opened={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        size="lg"
        padding="md"
      >
        <div className="flex flex-col gap-4">
          <TextComponent fontSize={18} color="gray" align="center">
            Do you really want to go back? All entered details will be lost.
          </TextComponent>

          <div className="flex justify-end gap-3 mt-4">
            <ButtonComponent
              variant="outline"
              bgColor={colors.surface.muted}
              fontSize="16"
              textColor={colors.text.secondary}
              onClick={() => setIsConfirmOpen(false)}
            >
              Stay on Page
            </ButtonComponent>
            <ButtonComponent
              bgColor={colors.brand.primary}
              textColor={colors.text.inverse}
              fontSize="16"
              onClick={() => {
                setIsConfirmOpen(false);
                navigate("/management/user/create")
              }}
            >
              Discard & Go Back
            </ButtonComponent>
          </div>
        </div>
      </PopupModal>
    </div>
  );
};

export default UserFormPage;
