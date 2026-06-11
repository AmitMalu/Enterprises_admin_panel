import { FormikProps } from "formik";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import { Grid, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useAddressFromZipcode } from "../../../../Utils/hooks/useAddressFromZipcode";

const OutletDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {
  const { location, loading, error } = useAddressFromZipcode(formik.values.outletZipcode)

  useEffect(() => {
    if (formik.values.outletZipcode && !loading) {
      if (location.state || location.city) {
        // ✅ Fill values when location found
        formik.setValues((prev: any) => ({
          ...prev,
          outletState: location.state || "",
          outletCity: location.city || "",
        }));

        // ✅ Clear errors for both fields
        formik.setFieldError("outletState", "");
        formik.setFieldError("outletCity", "");
      } else {
        // ❌ Clear values if no location found for that zip
        formik.setValues((prev: any) => ({
          ...prev,
          outletState: "",
          outletCity: "",
        }));
      }
    }
  }, [location.state, location.city, formik.values.outletZipcode, loading]);

  useEffect(() => {
    if (error) {
      formik.setFieldError("outletZipcode", error);
    } else {
      formik.setFieldError("outletZipcode", ""); // clear previous errors
    }
  }, [error]);

  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="outletName"
            label="Outlet Name"
            placeholder="Enter Your Outlet Name"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="outletAddress"
            label="Outlet Address"
            placeholder="Enter Outlet Address"
            withAsterisk
            required
            maxLength={150}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            name="outletZipcode"
            label="Outlet Zip Code"
            placeholder="Enter Your Outlet Zipcode"
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
            value={formik.values.outletState || ""}
            key={`outletState-${formik.values.outletState || "empty"}`}
            name="outletState"
            label="Outlet State"
            placeholder="Select Your Outlet State"
            withAsterisk
            rightSection={
              loading ? <Loader size={16} /> : null
            }
            disabled
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 6 }}>
          <FormikTextInputComponent
            value={formik.values.outletCity || ""}
            key={`outletCity-${formik.values.outletCity || "empty"}`}
            name="outletCity"
            label="Outlet City"
            placeholder="Select Your Outlet City"
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

export default OutletDetailsForm;
