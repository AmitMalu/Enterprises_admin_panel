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
import { fetchMasterById, fetchSmsCredentialDropdown, fetchWLDropdown } from "../../Redux/Features/Masters/MastersThunk";
import {
    SmsCredentialsFormType,
    initialValues,
    SMS_CREDENTIALS_KEY,
    SMS_CREDENTIALS_URL,
    transformSmsCredentialsToFormData,
    transformFormToCreateSmsCredentialsPayload,
    validationSchema,
    transformFormToUpdateSmsCredentialsPayload,
} from "../../Config/Notifications/SmsCredentialsConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";
import { LockIconSvg } from "../../assets/Icons";

type SmsCredentialsFormProps = { mode: "add" | "edit" };

const SmsCredentialsForm = ({ mode }: SmsCredentialsFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SmsCredentialsFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [wlDropdownData, setWlDropdownData] = useState<any[]>([]);
    const [dropdownLoading, setDropdownLoading] = useState(false);
    const [smsTypeDropdownData, setSmsTypeDropdownData] = useState<any[]>([]);
    const [smsTypeDropdownLoading, setSmsTypeDropdownLoading] = useState(false);

    const handleSubmit = useThrottleMasterFormSubmit<SmsCredentialsFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: SMS_CREDENTIALS_KEY,
        addUrl: SMS_CREDENTIALS_URL,
        updateUrl: SMS_CREDENTIALS_URL,
        transformCreatePayload: transformFormToCreateSmsCredentialsPayload,
        transformUpdatePayload: transformFormToUpdateSmsCredentialsPayload,
        successNavigatePath: "/notification/sms-credentials",
        entityName: "SMS Credential",
    });

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                setDropdownLoading(true);
                setSmsTypeDropdownLoading(true);

                const [wlResponse, smsTypeResponse] = await Promise.all([
                    dispatch(fetchWLDropdown()).unwrap(),
                    dispatch(fetchSmsCredentialDropdown()).unwrap()
                ]);

                setWlDropdownData(wlResponse);
                setSmsTypeDropdownData(smsTypeResponse);
            } catch (error) {
                console.error("Failed to fetch dropdowns:", error);
                toast.error("Failed to load options");
            } finally {
                setDropdownLoading(false);
                setSmsTypeDropdownLoading(false);
            }
        };

        fetchDropdowns();
    }, []);

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: SMS_CREDENTIALS_KEY, endpoint: SMS_CREDENTIALS_URL, id })
                    ).unwrap();

                    setFormData(transformSmsCredentialsToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/notification/sms-credentials");
                    }, 2000);
                }
                finally {
                    setLoading(false);
                }
            }
        };

        fetchAndSet();

        return () => {
            if (mode === "edit") {
                setFormData(initialValues);
            }
        };
    }, [dispatch, id, mode]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">
            <BackHeader
                title={mode === "edit" ? "Edit SMS Credential" : "Add SMS Credential"}
                backPath="/notification/sms-credentials"
            />

            <BreadCrumb type={"SMS Credential"} text="Notification" />

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
                                    <Grid.Col span={{ base: 12, xs: 6 }}>
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

                                    <Grid.Col span={6}>
                                        <FormikSelectComponent
                                            name="type"
                                            label="Type"
                                            placeholder="Select type"
                                            data={smsTypeDropdownData.map((item: any) => ({
                                                value: item.value,
                                                label: item.label,
                                            }))}
                                            nothingFoundMessage="Nothing found"
                                            allowDeselect={true}
                                            searchable={true}
                                            disabled={smsTypeDropdownLoading}
                                            rightSection={
                                                smsTypeDropdownLoading ? <Loader size="xs" /> : null
                                            }
                                            withAsterisk
                                            required
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
                                        <FormikTextInputComponent
                                            name="dltTemplateId"
                                            label="DLT Template ID"
                                            placeholder="Enter DLT template ID"
                                            withAsterisk
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
                                        <FormikTextInputComponent
                                            autoComplete="new-password"
                                            name="username"
                                            label="Username"
                                            placeholder="Enter username"
                                            withAsterisk
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
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
                                            maxLength={255}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
                                        <FormikTextInputComponent
                                            name="senderId"
                                            label="Sender ID"
                                            placeholder="Enter sender ID"
                                            withAsterisk
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
                                        <FormikTextInputComponent
                                            name="peId"
                                            label="PE ID"
                                            placeholder="Enter PE ID"
                                            withAsterisk
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, xs: 6 }}>
                                        <FormikTextInputComponent
                                            name="route"
                                            label="Route"
                                            placeholder="Enter route"
                                            withAsterisk
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

export default SmsCredentialsForm;
