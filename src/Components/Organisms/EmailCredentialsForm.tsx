import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import {
    EmailCredentialsFormType,
    initialValues,
    EMAIL_CREDENTIALS_KEY,
    EMAIL_CREDENTIALS_URL,
    transformEmailCredentialsToFormData,
    transformFormToCreateEmailCredentialsPayload,
    validationSchema,
} from "../../Config/Notifications/EmailCredentialsConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";
import { LockIconSvg } from "../../assets/Icons";

type EmailCredentialsFormProps = { mode: "add" | "edit" };

const EmailCredentialsForm = ({ mode }: EmailCredentialsFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<EmailCredentialsFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<EmailCredentialsFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: EMAIL_CREDENTIALS_KEY,
        addUrl: EMAIL_CREDENTIALS_URL,
        updateUrl: EMAIL_CREDENTIALS_URL,
        transformCreatePayload: transformFormToCreateEmailCredentialsPayload,
        transformUpdatePayload: transformFormToCreateEmailCredentialsPayload,
        successNavigatePath: "/notification/email-credentials",
        entityName: "Email Credential",
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: EMAIL_CREDENTIALS_KEY, endpoint: EMAIL_CREDENTIALS_URL, id })
                    ).unwrap();

                    setFormData(transformEmailCredentialsToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/notification/email-credentials");
                    }, 2000);
                }
                finally {
                    setLoading(false);
                }
            }
        };

        fetchAndSet();

        return () => {
            // Only clear form on unmount in "edit" mode
            if (mode === "edit") {
                setFormData(initialValues);
            }
        };
    }, [dispatch, id, mode]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
            <BackHeader
                title={mode === "edit" ? "Edit Email Credential" : "Add Email Credential"}
                backPath="/notification/email-credentials"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Email Credential"} text="Notification" />

            {/* Form */}
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex-1 overflow-auto">
                        <div className="max-w-2xl mx-auto p-4">
                            <Grid gutter="md">
                                <Grid.Col span={12}>
                                    <FormikTextInputComponent
                                        name="smtpHost"
                                        label="SMTP Host"
                                        placeholder="e.g. smtp.gmail.com"
                                        withAsterisk
                                    />
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <FormikTextInputComponent
                                        name="smtpPort"
                                        label="SMTP Port"
                                        placeholder="e.g. 587"
                                        withAsterisk
                                    />
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <FormikTextInputComponent
                                        name="email"
                                        label="Email"
                                        placeholder="sender@example.com"
                                        withAsterisk
                                    />
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <FormikTextInputComponent
                                        type="password"
                                        name="password"
                                        label="Password"
                                        placeholder="********"
                                        required
                                        withAsterisk
                                        leftSection={<LockIconSvg />}
                                        leftSectionWidth={36}
                                        rightSectionWidth={48}
                                        maxLength={51}
                                    />
                                </Grid.Col>
                            </Grid>

                            <div className="flex justify-end gap-3 mt-5">
                                {!loading && !fetchError && <ButtonComponent
                                    fullWidth={false}
                                    radius={6}
                                    variant="filled"
                                    borderColor={colors.text.inverse}
                                    bgColor={colors.brand.primary}
                                    textColor={colors.text.inverse}
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                >
                                    {mode === "edit" ? "Update" : "Save"}
                                </ButtonComponent>}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EmailCredentialsForm;
