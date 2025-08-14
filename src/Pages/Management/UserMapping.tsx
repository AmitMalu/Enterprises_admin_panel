import { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik, FormikProps } from "formik";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import { UserMappingFormType, UserMappingInitialValues, validationSchema } from "../../Config/Management/UserMappingConfig";
import FormikSwitchComponent from "../../Components/Molecules/FormikSwitchComponent";

const switchClassNames = {
  label: "mantine-Switch-label text-[14px] font-medium w-[180px] ", // fixed width outer label
  description: "mantine-Switch-description !text-[12px] !leading-[14px] w-full ", // fixed width & line height
  trackLabel: "mantine-Switch-trackLabel text-[14px] font-semibold", // inside switch track label bigger
  track: "mantine-Switch-track w-[70px] p-2", // optional: set track min-width
  thumb: "mantine-Switch-thumb",
};

const UserMapping = () => {
  const [formData, setFormData] = useState<UserMappingFormType>(UserMappingInitialValues);

  const [activeTab, setActiveTab] = useState("slab");


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        User Mapping
      </TextComponent>

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values) => {
          console.log("Form Submitted", values);
        }}
      >
        {({ values }) => {

          return (
            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <FormikSwitchComponent
                    name="mode"
                    // label="Update Bulk User"
                    onLabel="Bulk"
                    offLabel="Single"
                    description={
                      values.mode
                        ? "Bulk User Mapping allows you to update multiple users at once"
                        : "Single User Mapping lets you update one user at a time"
                    }
                    size="md"
                    classNames={switchClassNames}
                  />
                </Grid.Col>
              </Grid >

            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default UserMapping;
