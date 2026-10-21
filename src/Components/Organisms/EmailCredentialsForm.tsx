import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid, Loader } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterById, fetchWLDropdown } from "../../Redux/Features/Masters/MastersThunk";
import {
    EmailCredentialsFormType,
    initialValues,
    EMAIL_CREDENTIALS_KEY,
    EMAIL_CREDENTIALS_URL,
    transformEmailCredentialsToFormData,
    transformFormToCreateEmailCredentialsPayload,
    validationSchema,
    transformFormToUpdateEmailCredentialsPayload,
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
    const [wlDropdownData, setWlDropdownData] = useState<any[]>([]);
    const [dropdownLoading, setDropdownLoading] = useState(false); //  


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
        transformUpdatePayload: transformFormToUpdateEmailCredentialsPayload,
        successNavigatePath: "/notification/email-credentials",
        entityName: "Email Credential",
    });

    useEffect(() => {
        const fetchDropdown = async () => {
            try {
                setDropdownLoading(true);
                const response = await dispatch(fetchWLDropdown()).unwrap();
                setWlDropdownData(response);
            } catch (error) {
                console.error("Failed to fetch WL dropdown:", error);
                toast.error("Failed to load White Label options");
            } finally {
                setDropdownLoading(false);
            }
        };

        fetchDropdown();
    }, []);

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
            <BreadCrumb type={"Email Gateway"} text="Messaging" />

            {/* Form */}
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {() => {
                    return (
                        <Form className="flex-1 overflow-auto">
                            <div className="max-w-2xl mx-auto p-4">
                                <Grid gutter="md">
                                    <Grid.Col span={12}>
                                        <FormikSelectComponent
                                            name="whitelabelId"
                                            label="White Label"
                                            placeholder="Select White Label"
                                            data={wlDropdownData.map((item: any) => ({
                                                value: item.value,
                                                label: item.label,
                                            }))}
                                            nothingFoundMessage="Nothing found"
                                            allowDeselect={true}
                                            searchable={true}
                                            disabled={dropdownLoading}
                                            rightSection={
                                                dropdownLoading ? <Loader size="xs" /> : null
                                            }
                                            withAsterisk
                                            required
                                        />
                                    </Grid.Col>

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
                                            autoComplete="new-password"
                                            name="email"
                                            label="Email"
                                            placeholder="sender@example.com"
                                            withAsterisk
                                            toLowerCase
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={12}>
                                        <FormikTextInputComponent
                                            type="password"
                                            autoComplete="new-password"
                                            name="password"
                                            label="Password"
                                            placeholder="********"
                                            required
                                            withAsterisk
                                            leftSection={<LockIconSvg />}
                                            leftSectionWidth={36}
                                            rightSectionWidth={48}
                                            minLength={8}
                                            maxLength={20}
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
                                        disabled={loading}
                                    >
                                        {mode === "edit" ? "Update" : "Save"}
                                    </ButtonComponent>}
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default EmailCredentialsForm;
