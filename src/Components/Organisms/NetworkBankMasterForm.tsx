import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { booleanSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import FormikFileInput from "../Molecules/FormikFileInput";
import {
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    validationSchema, NetworkBankMasterFormType, transformFormToCreateNetworkBankMasterPayload, transformFormToUpdateNetworkBankMasterPayload, transformNetworkBankListToFormData
} from "../../Config/Master/NetworkBankMasterConfig";
import BackHeader from "../Molecules/BackHeader";

type NetworkBankMasterFormProps = { mode: "add" | "edit" };

const NetworkBankMasterForm = ({ mode }: NetworkBankMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<NetworkBankMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<NetworkBankMasterFormType>({
        mode,
        id,
        useFormData: true,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateNetworkBankMasterPayload,
        transformUpdatePayload: transformFormToUpdateNetworkBankMasterPayload,
        successNavigatePath: "/master/network-banks",
        entityName: "NetworkBank",
    });


    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: MASTER_KEY, endpoint: MASTER_URL, id })
                    ).unwrap();

                    setFormData(transformNetworkBankListToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/network-banks");
                    }, 2000);
                }
                finally {
                    setLoading(false);
                }
            }
        };

        fetchAndSet();

        return () => {
            // Only clear form and selected product on unmount in "edit" mode
            if (mode === "edit") {
                setFormData(initialValues); // Reset form data on unmount
            }
        };
    }, [dispatch, id, mode]);


    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

            <BackHeader
                title={mode === "edit" ? "Edit Network Bank" : "Add Network Bank"}
                backPath="/master/network-banks"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Network Bank"} text="Master" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                    <Grid gutter="lg">
                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="bankName"
                                label="Bank Name"
                                placeholder="Enter Bank Name"
                                withAsterisk
                                maxLength={50}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="bankCode"
                                label="Bank Code"
                                placeholder="Enter Bank Code"
                                withAsterisk
                                maxLength={30}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="bankCodeBI"
                                label="Bank Code BI"
                                placeholder="Enter Bank Code BI"
                                withAsterisk
                                maxLength={30}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="ifscCode"
                                label="IFSC Code"
                                placeholder="Enter IFSC Code"
                                withAsterisk
                                capitalize
                                maxLength={30}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="maxAccountNoLength"
                                label="Max Account No Length"
                                placeholder="Enter Max Account No Length"
                                maxLength={30}
                                allowCharacter={false}
                                allowSpecialChar={false}
                                allowSpace={false}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikSelectComponent
                                name="imps"
                                label="IMPS"
                                placeholder="Select"
                                withAsterisk
                                data={booleanSelectData}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikSelectComponent
                                name="neft"
                                label="NEFT"
                                placeholder="Select"
                                withAsterisk
                                data={booleanSelectData}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikSelectComponent
                                name="rtgs"
                                label="RTGS"
                                placeholder="Select"
                                withAsterisk
                                data={booleanSelectData}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikFileInput
                                name="logo"
                                label="Add Logo"
                                withAsterisk
                                placeholder="Select File"
                                accept="image/png, image/jpeg, application/pdf"
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikSelectComponent
                                name="verification"
                                label="Verification"
                                placeholder="Select Verification"
                                withAsterisk
                                data={booleanSelectData}
                            />
                        </Grid.Col>

                        {mode === "edit" && (
                            <>
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isActive"
                                        label="Active"
                                        placeholder="Select"
                                        withAsterisk
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isBlocked"
                                        label="Blocked"
                                        placeholder="Select"
                                        withAsterisk
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>
                            </>
                        )}
                    </Grid>

                    <div className="flex justify-end mt-4">
                        {!loading && !fetchError && <ButtonComponent
                            fullWidth={false}
                            radius={6}
                            borderColor="#fff"
                            variant="filled"
                            type="submit"
                            bgColor="#C30305"
                            textColor="#FFFFFF"
                            style={{ padding: "10px 30px" }}
                        >
                            SUBMIT
                        </ButtonComponent>}
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default NetworkBankMasterForm;