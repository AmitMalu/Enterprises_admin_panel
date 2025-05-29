import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { initialValues, PrefundingType, validationSchema } from "./PrefundingConfig";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import { Grid } from "@mantine/core";
import FormikFileInput from "../../Components/Molecules/FormikFileInput";
import * as Yup from 'yup'

const PrefundingForm = ({ mode }: { mode: string }) => {
  

  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState<PrefundingType>(initialValues);

  const handleSubmit = (values: PrefundingType) => {
    console.log("Submitted values:", values);
    // Add API call here
  };

  useEffect(() => {
    if (mode === "edit") {
      if (location.state) {
        setFormData(location.state);
      }
    }
  }, [id, location.state, mode]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
      <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
        {mode === "edit" ? "Edit Prefunding Form" : "Prefunding Form"}
      </TextComponent>

      {/* Sub Heading */}
      <BreadCrumb type={"Prefunding"} text="Funding" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
          <Grid gutter="lg">
            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="depositType"
                label="Deposit Type"
                placeholder="Enter Deposit Type"
                withAsterisk
                required
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>
            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="transactionId"
                label="Transaction Id"
                placeholder="Enter Transaction Id"
                withAsterisk
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="amount"
                label="Amount"
                placeholder="Enter Amount"
                withAsterisk
                capitalize
                maxLength={3}
                allowNumber={false}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="bankAccount"
                label="Bank Account"
                placeholder="Type BankAccount"
                withAsterisk
                maxLength={51}
                allowSpecialChar={false}
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="depositDate"
                type="date"
                label="Date of Deposit"
                placeholder="Select Deposit Date"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikFileInput
                name="depositSlip"
                label="Deposit Slip"
                placeholder="Add Deposit Slip"
                withAsterisk
                accept="image/png, image/jpeg, application/pdf"
                size="sm"
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="partnerName"
                type="text"
                label="Partner Name"
                placeholder="Enter Partner Name"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="requestedBy"
                type="text"
                label="Requested By"
                placeholder="Requested By"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="clientIp"
                type="text"
                label="Client IP"
                placeholder="Enter Client IP"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="partnerMobileNumber"
                type="text"
                label="Partner MobileNumber"
                placeholder="Enter Partner Number"
                allowSpecialChar={false}
                allowCharacter={false}
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
              <FormikTextInputComponent
                name="requestStatus"
                type="text"
                label="Request Status"
                placeholder="Enter Request Status"
                withAsterisk
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
      </Formik>
    </div>
  );
};

export default PrefundingForm;
