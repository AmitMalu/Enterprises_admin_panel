import { FormikProps } from "formik";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import { Grid, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useAddressFromZipcode } from "../../../../Utils/hooks/useAddressFromZipcode";

const ResidentialAddressForm = ({ formik }: { formik: FormikProps<any> }) => {
  const { location, loading, error } = useAddressFromZipcode(formik.values.zipcode)

  useEffect(() => {
    if (formik.values.zipcode && !loading) {
      if (location.state || location.city) {
        // ✅ Fill values when location found
        formik.setValues((prev: any) => ({
          ...prev,
          state: location.state || "",
          city: location.city || "",
        }));

        // ✅ Clear errors for both fields
        formik.setFieldError("state", "");
        formik.setFieldError("city", "");
      } else {
        // ❌ Clear values if no location found for that zip
        formik.setValues((prev: any) => ({
          ...prev,
          state: "",
          city: "",
        }));

        // Optional: mark as errors if needed
        // formik.setFieldError("state", "Required");
        // formik.setFieldError("city", "Required");
      }
    }
  }, [location.state, location.city, formik.values.zipcode, loading]);

  useEffect(() => {
    if (error) {
      formik.setFieldError("zipcode", error);
    } else {
      formik.setFieldError("zipcode", ""); // clear previous errors
    }
  }, [error]);

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
          <FormikTextInputComponent
            name="zipcode"
            label="Zip Code"
            placeholder="Enter Your Zipcode"
            withAsterisk
            error={error}
            disabled={!!loading}
            rightSection={
              loading ? <Loader size={16} /> : null
            }
            maxLength={6}
            allowSpecialChar={false}
            allowCharacter={false}
            allowSpace={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            value={formik.values.state || ""}
            key={`state-${formik.values.state || "empty"}`}
            name="state"
            label="State"
            placeholder="Select Your State"
            withAsterisk
            rightSection={
              loading ? <Loader size={16} /> : null
            }
            disabled
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            value={formik.values.city || ""}
            key={`city-${formik.values.city || "empty"}`}
            name="city"
            label="City"
            placeholder="Select Your City"
            withAsterisk
            rightSection={
              loading ? <Loader size={16} /> : null
            }
            required
            disabled
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ResidentialAddressForm;
