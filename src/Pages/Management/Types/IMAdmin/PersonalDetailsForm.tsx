import React from "react";
import { FormikProps } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";

const PersonalDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="name"
            label="Name"
            placeholder="Type Name"
            withAsterisk
            maxLength={51}
            allowNumber={false}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="mobileNumber"
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            withAsterisk
            maxLength={10}
            allowSpecialChar={false}
            allowCharacter={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="emailId"
            label="Email ID"
            placeholder="Enter Your Email Address"
            withAsterisk
            maxLength={50}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="userName"
            label="Username"
            placeholder="Enter Username"
            withAsterisk
            required
            maxLength={51}
            allowSpecialChar={true}
          />
        </Grid.Col>
        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="password"
            label="Password"
            placeholder="Enter Password"
            withAsterisk
            required
            maxLength={51}
            allowSpecialChar={true}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PersonalDetailsForm;
