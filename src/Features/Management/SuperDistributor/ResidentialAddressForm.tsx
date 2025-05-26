import { FormikProps } from "formik";
import FormikTextInputComponent from "../../../Components/Molecules/FormikTextInputComponent";
import { Grid } from "@mantine/core";
import FormikSelectComponent from "../../../Components/Molecules/FormikSelectComponent";
import { useIndianStateCity } from "../../../Utils/CustomHooks/useIndianStateCity";

const ResidentialAddressForm = ({ formik }: { formik: FormikProps<any> }) => {
  const { states, cities, cityKey } = useIndianStateCity({
    selectedStateName: formik.values.state,
    selectedCityName: formik.values.city,
    onCityReset: () => formik.setFieldValue("city", ""),
  });

  return (
    <>
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
          <FormikSelectComponent
            value={formik.values.state}
            name="state"
            label="State"
            placeholder="Select Your State"
            withAsterisk
            searchable
            data={states}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikSelectComponent
            key={cityKey}
            value={formik.values.city}
            name="city"
            label="City"
            placeholder="Select Your City"
            withAsterisk
            required
            searchable
            data={cities}
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
    </>
  );
};

export default ResidentialAddressForm;
