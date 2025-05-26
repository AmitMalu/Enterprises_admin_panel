import { FileInput, Grid } from "@mantine/core";
import { FormikProps } from "formik";
import React from "react";
import FormikFileInput from "../../../Components/Molecules/FormikFileInput";
import FilePreview from "../../../Components/Atoms/FilePreview";

const UploadDocumentsForm = ({ formik }: { formik: FormikProps<any> }) => {
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="adhaarFront"
            label="Add Adhaar Front Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="adhaarBack"
            label="Add Adhaar Back Photo"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <FormikFileInput
            name="pancardPhoto"
            label="Add Pancard"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <FormikFileInput
            name="shopPhoto"
            label="Shop Photo"
            withAsterisk
            placeholder="Upload File"
            accept="image/png, image/jpeg"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <FormikFileInput
            name="businessProof"
            label="Add Business Proof"
            withAsterisk
            placeholder="Select File"
            accept="image/png, image/jpeg , application/pdf"
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default UploadDocumentsForm;
