import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateTimePicker from "../../Components/Molecules/FormikDateTimePicker";
import {
  initialValues,
  validationSchema,
  transformFormToCreateNotificationPayload,
  NotificationFormType,
  NOTIFICATION_CREATE_URL,
  deliveryChannelOptions,
  severityOptions,
  sendModeOptions,
  NOTIFICATIONS_KEY,
} from "../../Config/Notifications/NotificationsConfig";
import { useAppDispatch } from "../../Redux/hooks";
import BackHeader from "../../Components/Molecules/BackHeader";
import { colors } from "../../theme/colors";
import { NotificationDropdowns_Api } from "../../Redux/Features/Auth/Thunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import FormikNewDateTimePicker from "../../Components/Molecules/FormikNewDateTimePicker";

const AlertTypeForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NotificationFormType>(initialValues);
  const [loading] = useState(false);
  const [dropdownData, setDropdownData] = useState<any>(null);

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await dispatch(NotificationDropdowns_Api()).unwrap();
        setDropdownData(response.data);
      } catch (error: any) {
        console.error("Failed to fetch dropdown data:", error);
        // Set empty array if API fails
        setDropdownData({});
      }
    };

    fetchDropdowns();
  }, []);

  const handleSubmit = useThrottleMasterFormSubmit<NotificationFormType>({
    mode: "add",
    id: undefined,
    dispatch,
    navigate,
    resetFormData: () => setFormData(initialValues),
    masterKey: NOTIFICATIONS_KEY,
    addUrl: NOTIFICATION_CREATE_URL,
    updateUrl: NOTIFICATION_CREATE_URL,
    transformCreatePayload: transformFormToCreateNotificationPayload,
    transformUpdatePayload: transformFormToCreateNotificationPayload,
    successNavigatePath: "/notification/alert-type",
    entityName: "Notification",
  });

  // Create options for select components
  const getSelectOptions = (type: string) => {
    if (dropdownData && dropdownData[type]) {
      return dropdownData[type].map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
    }

    return [];
  };


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">

      <BackHeader
        title="Create Alert Type"
        backPath="/notification/alert-type"
      />

      {/* Sub Heading */}
      <BreadCrumb type={"Alert Type"} text="Notification" />

      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="alertType"
                  label="Alert Type"
                  placeholder="Select Alert Type"
                  data={getSelectOptions('alertType')}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="product"
                  label="Product"
                  placeholder="Select Product"
                  data={getSelectOptions('product')}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikTextInputComponent
                  name="title"
                  label="Title"
                  placeholder="Enter notification title"
                  withAsterisk
                  maxLength={100}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12 }}>
                <FormikTextInputComponent
                  name="body"
                  label="Body"
                  placeholder="Enter notification body"
                  withAsterisk
                  maxLength={500}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="deliveryChannel"
                  label="Delivery Channel"
                  placeholder="Select Delivery Channel"
                  data={deliveryChannelOptions}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="audienceType"
                  label="Audience Type"
                  placeholder="Select Audience Type"
                  data={getSelectOptions('audienceType')}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="severity"
                  label="Severity"
                  placeholder="Select Severity"
                  data={severityOptions}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                <FormikSelectComponent
                  name="sendMode"
                  label="Send Mode"
                  placeholder="Select Send Mode"
                  data={sendModeOptions}
                  withAsterisk
                  onChange={(value: string) => {
                    setFieldValue("sendMode", value);
                    // Clear schedule time if switching to instant
                    if (value === "INSTANT") {
                      setFieldValue("scheduleTime", undefined);
                    }
                  }}
                />
              </Grid.Col>

              {/* Schedule Time - Only show when sendMode is SCHEDULE */}
              {values.sendMode === "SCHEDULE" && (
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                  {/* <FormikDateTimePicker
                    name="scheduleTime"
                    label="Schedule Time"
                    size="md"
                    required
                  /> */}
                  <FormikNewDateTimePicker
                    name="scheduleTime"
                    label="Schedule Time"
                    required
                    size="md"
                    minDate={new Date()}
                  />
                </Grid.Col>
              )}
            </Grid>

            <div className="flex justify-end mt-4">
              {!loading && <ButtonComponent
                fullWidth={false}
                radius={6}
                borderColor={colors.text.inverse}
                variant="filled"
                type="submit"
                bgColor={colors.brand.primary}
                textColor={colors.text.inverse}
                style={{ padding: "10px 30px" }}
              >
                SUBMIT
              </ButtonComponent>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AlertTypeForm;
