import * as Yup from "yup";
import { useAppDispatch } from "../../Redux/hooks";
import { useState } from "react";
import { CREDIT_DEBIT_KEY, CREDIT_DEBIT_URL, initialValues, transformToCreditDebitPayload, validationSchema } from "../../Config/Funding/CreditDebitConfig";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import { createMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";

const CreditDebit = () => {

  const dispatch = useAppDispatch();

  const [formKey, setFormKey] = useState(0);


  const throttledSubmit = useThrottledFormSubmit(
    async (values: any, { resetForm }: any) => {
      const payload = await transformToCreditDebitPayload(values)

      try {
        const res = await dispatch(
          createMasterItem({
            key: CREDIT_DEBIT_KEY,
            data: payload,
            url: `${CREDIT_DEBIT_URL}/credit-debit`,
          })
        ).unwrap();

        toast.success(res.message || "Operation Successfull");
        resetForm();
        setFormKey(k => k + 1);
      } catch (err: any) {
        toast.error(
          err || "Something went wrong"
        );
      }
    },
    3000
  );

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Credit Debit
      </TextComponent>

      <Formik
        key={formKey}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={throttledSubmit}
      >
        {({ values, setFieldValue }) => {

          const {
            hierarchyList: userTypeList,
            loadingHierarchyList: loadingUserTypeList,
            subHierarchyList: accountList,
            loadingSubHierarchyList: loadingAccountList,
            subHierarchyKey: accountListKey,
          } = useHierarchySubHierarchy({
            selectedHierarchyCode: values.userType,
            onSubHierarchyReset: () => setFieldValue("accountNo", ""),
          });


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
                      { value: "CREDIT", label: "CREDIT" },
                      { value: "DEBIT", label: "DEBIT" }
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
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

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <FormikSelectComponent
                    name="userType"
                    label="User Type"
                    nothingFoundMessage="No UserType Found"
                    placeholder="Select User Type"
                    withAsterisk
                    required
                    data={userTypeList}
                    disabled={loadingUserTypeList}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <FormikSelectComponent
                    key={accountListKey}
                    name="accountNo"
                    label="Account"
                    nothingFoundMessage="No Accounts found for Selected Type"
                    placeholder="Select Account"
                    withAsterisk
                    required
                    data={accountList.map((item: any) => ({
                      label: item.displayName,
                      value: String(item.id),
                    }))}
                    disabled={loadingAccountList}
                  />
                  {/* Balance display */}
                  {(() => {
                    const selectedAccount = accountList.find(acc => String(acc.id) === String(values?.accountNo)
                    )
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
