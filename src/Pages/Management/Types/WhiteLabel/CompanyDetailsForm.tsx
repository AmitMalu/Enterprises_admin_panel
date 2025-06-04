import { FormikProps } from "formik";
import React, { useEffect } from "react";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import { Grid } from "@mantine/core";
import FormikSelectComponent from "../../../../Components/Molecules/FormikSelectComponent";
import { useIndianStateCity } from "../../../../Utils/hooks/useIndianStateCity";

const CompanyDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {
  const { states, cities, cityKey } = useIndianStateCity({
    selectedStateName: formik.values.outletState,
    selectedCityName: formik.values.outletCity,
    onCityReset: () => formik.setFieldValue("outletCity", ""),
  });

  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="companyName"
            label="Company Name"
            placeholder="Enter Your Company Name"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="companyType"
            label="Company Type"
            placeholder="Enter Your Company Type"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="outletAddress"
            label="Company Address"
            placeholder="Enter Your Company Address"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikSelectComponent
            value={formik.values.outletState}
            name="outletState"
            label="Outlet State"
            placeholder="Select Your Outlet State"
            withAsterisk
            required
            searchable
            data={states}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikSelectComponent
            key={cityKey}
            value={formik.values.outletCity}
            name="outletCity"
            label="Outlet City"
            placeholder="Select Your Outlet City"
            withAsterisk
            required
            searchable
            data={cities}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 4, lg: 4 }}>
          <FormikTextInputComponent
            name="outletZipcode"
            label="Outlet Zip Code"
            placeholder="Enter Your Outlet Zipcode"
            withAsterisk
            maxLength={6}
            allowSpecialChar={false}
            allowCharacter={false}
            allowSpace={false}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CompanyDetailsForm;
