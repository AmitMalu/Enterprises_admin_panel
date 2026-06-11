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
import {
    BankMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformBankListToFormData,
    transformFormToCreateBankMasterPayload,
    transformFormToUpdateBankMasterPayload,
    validationSchema,
} from "../../Config/Master/BankMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";

type BankMasterFormProps = { mode: "add" | "edit" };

const BankMasterForm = ({ mode }: BankMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<BankMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<BankMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateBankMasterPayload,
        transformUpdatePayload: transformFormToUpdateBankMasterPayload,
        successNavigatePath: "/master/banks",
        entityName: "IM-Bank",
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

                    setFormData(transformBankListToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/bankmaster");
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
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-surface-app">

            <BackHeader
                title={mode === "edit" ? "Edit Bank" : "Add Bank"}
                backPath="/master/banks"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Bank"} text="Master" />

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
                                name="accountNumber"
                                label="Account Number"
                                placeholder="Enter Account Number"
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
                            <FormikSelectComponent
                                name="charges"
                                label="Charges"
                                placeholder="Select charges"
                                withAsterisk
                                data={booleanSelectData}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikSelectComponent
                                name="chargesType"
                                label="Charges Type"
                                placeholder="Select Charges Type"
                                withAsterisk
                                data={[
                                    { label: "PERCENTAGE", value: "percentage" },
                                    { label: "FLAT", value: "flat" },
                                ]}
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
            </Formik>
        </div>
    );
};

export default BankMasterForm;
