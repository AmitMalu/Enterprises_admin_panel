import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../../../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../../../Components/Molecules/FormikSelectComponent";
import { booleanSelectData } from "../../../../Utils/utils";

const PersonalDetailsForm = ({ formik }: { formik: FormikProps<any> }) => {

  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isWLAdmin, setIsWLAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      const role = parsedUser?.role;
      const hierarchyId = parsedUser?.hierarchyId;

      const hierarchyType = hierarchyId?.split("-")[1];

      const isWLAdmin =
        role === "WLAD" || role === "WLAU"
        hierarchyType === "WL" || hierarchyType === "WLAU" || hierarchyType === "WLAD";

      setIsWLAdmin(isWLAdmin);

      if (hierarchyId) {
        formik.setFieldValue("parentAccount", hierarchyId);
        setIsReadOnly(true);
      }
    }
  }, []);
  return (
    <>
      <Grid gutter="lg">
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            name="parentAccount"
            label="Parent Account"
            placeholder="Type Parent Account.."
            withAsterisk
            required
            maxLength={51}
            allowSpecialChar={true}
            disabled={isReadOnly}
          />
        </Grid.Col>
        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
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

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <FormikSelectComponent
            name="isAdmin"
            label="Is WL-Admin"
            allowDeselect={false}
            placeholder="Select Is WL-Admin"
            withAsterisk
            disabled={isWLAdmin}
            data={booleanSelectData}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
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

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            name="name"
            label="Name"
            placeholder="Type Name"
            withAsterisk
            minLength={2}
            maxLength={50}
            allowNumber={false}
            allowSpecialChar={false}
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            name="dob"
            type="date"
            label="Date of Birth"
            placeholder="Select Date"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
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

        <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
          <FormikTextInputComponent
            name="emailId"
            label="Email ID"
            placeholder="Enter Your Email Address"
            withAsterisk
            maxLength={50}
            toLowerCase
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PersonalDetailsForm;
