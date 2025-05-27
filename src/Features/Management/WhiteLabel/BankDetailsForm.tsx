import { Grid } from "@mantine/core";
import { FormikProps } from "formik";
import React from "react";
import FormikTextInputComponent from "../../../Components/Molecules/FormikTextInputComponent";

const BankDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="bankName"
            label="Bank Name"
            placeholder="Enter Your Bank Name"
            withAsterisk
            required
            maxLength={50}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="websiteURL"
            label="Website Url"
            placeholder="Enter Your Website Url"
            withAsterisk
            required
            maxLength={100}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="accountNumber"
            label="Bank Account Number"
            placeholder="Enter Your bank Account Number"
            withAsterisk
            required
            maxLength={18}
            allowSpecialChar={false}
            allowCharacter={false}
            allowSpace={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="ifsc"
            label="Bank IFSC Code"
            placeholder="Enter Your bank IFSC Code"
            withAsterisk
            required
            capitalize
            maxLength={11}
            allowSpecialChar={false}
            allowSpace={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="branchName"
            label="Bank Branch Name"
            placeholder="Enter Your Bank branch Name"
            withAsterisk
            maxLength={50}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default BankDetailsForm;
