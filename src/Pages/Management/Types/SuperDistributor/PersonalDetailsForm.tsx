import { FormikProps } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";

const PersonalDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="parentAccount"
            label="Parent Account"
            placeholder="Type Parent Account.."
            withAsterisk
            required
            maxLength={51}
            allowSpecialChar={true}
          />
        </Grid.Col>
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="title"
            label="Title"
            placeholder="Enter Title"
            withAsterisk
            required
            maxLength={51}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="prefix"
            label="Prefix"
            placeholder="Type Prefix"
            withAsterisk
            capitalize
            maxLength={3}
            allowNumber={false}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
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
            name="dob"
            type="date"
            label="Date of Birth"
            placeholder="Select Date"
            withAsterisk
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
      </Grid>
    </>
  );
};

export default PersonalDetailsForm;
