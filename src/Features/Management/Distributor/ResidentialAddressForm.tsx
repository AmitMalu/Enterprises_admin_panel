import { FormikProps } from "formik";
import React from "react";
import FormikTextInputComponent from "../../../Components/Molecules/FormikTextInputComponent";
import { Grid } from "@mantine/core";

const ResidentialAddressForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <div>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="address"
            label="Address"
            placeholder="Enter Your Address"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="city"
            label="City"
            placeholder="Select Your City"
            withAsterisk
            required
            maxLength={50}
            allowNumber={false}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="state"
            label="State"
            placeholder="Select Your State"
            withAsterisk
            maxLength={50}
            allowNumber={false}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="zipcode"
            label="Zip Code"
            placeholder="Enter Your Zipcode"
            withAsterisk
            maxLength={6}
            allowSpecialChar={false}
            allowCharacter={false}
            allowSpace={false}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ResidentialAddressForm;
