import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../Redux/hooks";
import { useState } from "react";
import { CREDIT_DEBIT_KEY, CREDIT_DEBIT_URL, CreditDebitFormType, initialValues, validationSchema } from "../../Config/Funding/CreditDebitConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";

const CreditDebit = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreditDebitFormType>(initialValues);

  const handleSubmit = useThrottleMasterFormSubmit<CreditDebitFormType>({
    mode: "add",
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: CREDIT_DEBIT_KEY,
    addUrl: `${CREDIT_DEBIT_URL}/create`,
    updateUrl: `${CREDIT_DEBIT_URL}`,
    entityName: "Admin User",
    delay: 5000,
  });


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Credit Debit
      </TextComponent>

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => {
          console.log("Form Submitted", values);
          if (!values) { //just for build
            handleSubmit(values);
          }
        }}
      >
        {({ values }) => {

          const accountList = [
            {
              value: "IM-P-001/Partner/Shubham Khopade",
              label: "IM-P-001/Partner/Shubham Khopade",
              prepaidAmount: "9000",
              postpaidAmount: "90000"
            },
            {
              value: "BZT-RT-002/Retailer/Rahul Patil",
              label: "BZT-RT-002/Retailer/Rahul Patil",
              prepaidAmount: "1000",
              postpaidAmount: "10000"
            },
            {
              value: "IM-AD-001/Admin/Amit Deshmukh",
              label: "IM-AD-001/Admin/Amit Deshmukh",
              prepaidAmount: "2000",
              postpaidAmount: "20000"
            }
          ];


          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">

              <div className="flex justify-center mt-3 mb-6">
                <TextComponent fontSize={18} fontFamily="Inter" fontWeight={500}>
                  {values.type?.toUpperCase() === "DEBIT"
                    ? "Debit Fund Directly From Wallet"
                    : "Credit Fund Directly to Wallet"}
                </TextComponent>
              </div>

              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <FormikSelectComponent
                    name="type"
                    label="Funding Type"
                    placeholder="Select Type Credit/Debit"
                    withAsterisk
                    required
                    data={[
                      { value: "credit", label: "Credit" },
                      { value: "debit", label: "Debit" }
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>

                  <FormikSelectComponent
                    name="accountNo"
                    label="Account"
                    placeholder="Select Account"
                    withAsterisk
                    required
                    data={accountList.map(({ value, label }) => ({ value, label }))}
                  />
                  {/* Balance display */}
                  {(() => {
                    const selectedAccount = accountList.find(acc => acc.value === values.accountNo);
                    return selectedAccount ? (
                      <div className="mt-1 flex gap-2">
                        <TextComponent fontSize={14} fontFamily="Inter" fontWeight={500}>
                          Prepaid Balance: {selectedAccount.prepaidAmount},
                        </TextComponent>
                        <TextComponent fontSize={14} fontFamily="Inter" fontWeight={500}>
                          Postpaid Balance: {selectedAccount.postpaidAmount}
                        </TextComponent>
                      </div>
                    ) : null;
                  })()}
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>

                  <FormikSelectComponent
                    name="walletType"
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    withAsterisk
                    required
                    data={[
                      { value: "PREPAID", label: "PREPAID" },
                      { value: "POSTPAID", label: "POSTPAID" }
                    ]}
                  />
                </Grid.Col>


                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>

                  <FormikTextInputComponent
                    name="amount"
                    label="Amount"
                    placeholder="Enter Amount"
                    withAsterisk
                    required
                    maxLength={10}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>

                  <FormikTextInputComponent
                    name="confirmAmount"
                    label="Confirm Amount"
                    placeholder="Enter Confirm Amount"
                    withAsterisk
                    required
                    maxLength={10}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>

                  <FormikSelectComponent
                    name="narrationType"
                    label="Narration Type"
                    placeholder="Select Narration Type"
                    withAsterisk
                    required
                    data={[
                      { value: "commission", label: "Commission" },
                      { value: "refund", label: "Refund" },
                      { value: "recharge", label: "Recharge" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>

                  <FormikTextInputComponent
                    name="remark"
                    label="Remark"
                    placeholder="Enter Remark"
                    maxLength={150}
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

export default CreditDebit;
