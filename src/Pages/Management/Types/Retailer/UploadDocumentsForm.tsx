import { FileInput, Grid } from "@mantine/core";
import { FormikProps } from "formik";
import React from "react";
import FormikFileInput from "../../../../Components/Molecules/FormikFileInput";
import FilePreview from "../../../../Components/Atoms/FilePreview";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";

const UploadDocumentsForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <FormikFileInput
            name="adhaarFront"
            label="Adhaar Front Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <FormikFileInput
            name="adhaarBack"
            label="Adhaar Back Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="pancardPhoto"
            label="Add Pancard"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="shopPhoto"
            label="Shop Photo"
            withAsterisk
            placeholder="Upload File"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="adhaarNumber"
            label="Adhaar Number"
            placeholder="Enter Your Adhaar Number"
            withAsterisk
            required
            maxLength={15}
            allowSpace={false}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="panNumber"
            label="Pan Number"
            placeholder="Enter Your Pan Number"
            withAsterisk
            required
            maxLength={15}
            allowSpace={false}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="shopNumber"
            label="Shop Number"
            placeholder="Enter Your Shop Number"
            withAsterisk
            required
            maxLength={20}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 6 }}>
          <FormikFileInput
            name="businessProof"
            label="Add Business Proof"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg , application/pdf"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 6 }}>
          <FormikTextInputComponent
            name="businessNumber"
            label="Business Number"
            placeholder="Enter Your Business Number"
            withAsterisk
            required
            maxLength={20}
            allowSpecialChar={false}
            size="sm"
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UploadDocumentsForm;
