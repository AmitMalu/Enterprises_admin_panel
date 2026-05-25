import { Form, Formik } from "formik";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import TextComponent from "../../Components/Atoms/TextComponent";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { createMasterItem, downloadFileThunk } from "../../Redux/Features/Masters/MastersThunk";
import { useAppDispatch } from "../../Redux/hooks";
import * as Yup from "yup";
import { useState } from "react";
import FormikFileInput from "../../Components/Molecules/FormikFileInput";
import { DownloadIcon } from "../../assets/Icons";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { useTransactionCooldown } from "../../Utils/hooks/useTransactionCooldown";
import { toast } from "react-toastify";
import { colors } from "../../theme/colors";

const BulkCreditDebit = () => {

  const dispatch = useAppDispatch();
  const { checkDuplicate, store } = useTransactionCooldown("bulk_credit_debit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSampleFileDownload = () => {
    dispatch(
      downloadFileThunk({
        url: `${API_ENDPOINTS.FUNDING.FUNDING}/bulk-credit-debit/sample`,
        filename: "Bulk-Credit-Debit-Sample.xlsx", // or .csv/.pdf etc.
      })
    );
  };

  const throttledSubmit = useThrottledFormSubmit(
    async (values: any, { resetForm }: any) => {
      // Check for duplicate transaction within 120 seconds
      // For bulk upload, we use the file name as identifier
      const fileName = values.file?.name || "bulk_file";
      if (checkDuplicate(fileName, 0)) {
        toast.error(
          "You cannot repeat the same bulk upload within 2 minutes. Please try again shortly."
        );
        return;
      }

      setIsSubmitting(true)

      try {
        const res = await dispatch(
          createMasterItem({
            key: "Bulk-credit-debit",
            data: values,
            url: `${API_ENDPOINTS.FUNDING.FUNDING}/upload`,
            useFormData: true
          })
        ).unwrap();

        // Store successful bulk upload
        store(fileName, 0);
        toast.success(res.message || "Transaction Successfull");
        resetForm();
        setFormKey(k => k + 1);
      } catch (err: any) {
        toast.error(
          err || "Something went wrong"
        );
      }
      finally {
        setIsSubmitting(false)
      }
    },
    3000
  );

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
      {/* Heading */}
      <div className="mb-4">
        <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
          Bulk Credit Debit
        </TextComponent>
      </div>

      <div className="flex flex-1 overflow-auto scrollbar-hide justify-center relative">
        <Formik
          key={formKey}
          initialValues={{ file: null }}
          validationSchema={Yup.object({
            file: Yup.mixed().required("File is required"),
          })}
          onSubmit={throttledSubmit}
        >
          {() => (
            <Form className="flex flex-col w-full bg-white rounded-2xl p-4 shadow-md relative">

              <div className="flex justify-end mb-4">
                <ButtonComponent
                  size="xs"
                  fw="400"
                  variant="gradient"
                  textColor="white"
                  fontSize="14px"
                  onClick={handleSampleFileDownload}
                  rightIcon={<DownloadIcon color={colors.text.dim} />}
                >
                  Click to Download Sample file
                </ButtonComponent>
              </div>

              <FormikFileInput
                name="file"
                placeholder="UPLOAD FILE (Max Size 5MB)"
                accept=".xlsx,.csv"
                withAsterisk
                styles={{
                  input: {
                    color: colors.text.body,
                    fontWeight: 500,
                    fontSize: 24,
                    textAlign: "center" as const,
                    border: "none",
                  },
                  wrapper: {
                    border: "1px dashed black",
                    height: 250,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  placeholder: {
                    fontSize: 24,
                    textAlign: "center" as const,
                    color: "grey",
                  },
                }}
              />

              <div className="flex justify-end mt-4">
                <ButtonComponent
                  fullWidth={false}
                  radius={6}
                  borderColor={colors.text.inverse}
                  variant="filled"
                  type="submit"
                  bgColor={colors.brand.primary}
                  textColor={colors.text.inverse}
                  style={{ padding: "10px 30px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Submit"}
                </ButtonComponent>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default BulkCreditDebit;
