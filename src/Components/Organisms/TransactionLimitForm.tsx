import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { booleanSelectData } from "../../Utils/utils";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { initialValues, TRANSACTION_LIMIT_KEY, TRANSACTION_LIMIT_URL, TransactionLimitFormType, transformFormToCreateTransactionLimitPayload, transformFormToUpdateTransactionLimitPayload, transformTransactionLimitToFormData, validationSchema } from "../../Config/Schemes/TransactionLimitConfig";
import { colors } from "../../theme/colors";

type TransactionLimitFormProps = { mode: "add" | "edit" };

const TransactionLimitForm = ({ mode }: TransactionLimitFormProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TransactionLimitFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<TransactionLimitFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: TRANSACTION_LIMIT_KEY,
        addUrl: `${TRANSACTION_LIMIT_URL}/save`,
        updateUrl: `${TRANSACTION_LIMIT_URL}/update`,
        transformCreatePayload: transformFormToCreateTransactionLimitPayload,
        transformUpdatePayload: transformFormToUpdateTransactionLimitPayload,
        successNavigatePath: "/schemes/transaction-limit",
        entityName: "TransactionLimits",
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: TRANSACTION_LIMIT_KEY, endpoint: TRANSACTION_LIMIT_URL, id })
                    ).unwrap();

                    setFormData(transformTransactionLimitToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/schemes/transaction-limit");
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
                title={mode === "edit" ? "Edit Transaction Limit" : "Add Transaction Limit"}
                backPath="/schemes/transaction-limit"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Transaction Limit Setting"} text="Scheme" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {(formik: FormikProps<any>) => {
                    const {
                        productDropdownData,
                        loadingProductList,
                        subProductDropdownData,
                        loadingSubProductList,
                        subProductKey,
                    } = useProductSubProduct({
                        selectedProductId: formik.values.productId,
                        onSubProductReset: () => formik.setFieldValue("subProductId", ""),
                    });

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="description"
                                        label="Description"
                                        placeholder="Enter Description"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="productId"
                                        label="Product"
                                        value={formik.values.productId}
                                        placeholder="Select Product"
                                        searchable
                                        allowDeselect
                                        withAsterisk
                                        required
                                        data={productDropdownData}
                                        disabled={loadingProductList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="subProductId"
                                        key={subProductKey}
                                        value={formik.values.subProductId}
                                        data={subProductDropdownData}
                                        label="Sub Product"
                                        placeholder="Select Sub Product"
                                        searchable
                                        allowDeselect
                                        withAsterisk
                                        required
                                        disabled={loadingSubProductList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="paymentCurrency"
                                        label="Payment Currency"
                                        placeholder="Enter Payment Currency"
                                        withAsterisk
                                        required
                                        maxLength={51}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isAllowPerDayCardLimit"
                                        label="Per Day Card Limit"
                                        allowDeselect={false}
                                        placeholder="Select Per Day Card Limit"
                                        withAsterisk
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isAllowMonthlyCardLimit"
                                        label="Monthly Card Limit"
                                        allowDeselect={false}
                                        placeholder="Select Monthly Card Limit"
                                        withAsterisk
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>

                                {formik.values.isAllowPerDayCardLimit && (
                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="perDayTransactionLimit"
                                            label="Per Day Transaction Limit"
                                            placeholder="Enter Per Day Transaction Limit"
                                            withAsterisk
                                            // required
                                            maxLength={31}
                                        />
                                    </Grid.Col>
                                )}

                                {formik.values.isAllowMonthlyCardLimit && (
                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="monthlyTransactionLimit"
                                            label="Monthly Transaction Limit"
                                            placeholder="Enter Monthly Transaction Limit"
                                            withAsterisk
                                            required
                                            maxLength={51}
                                        />
                                    </Grid.Col>
                                )}

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="checkAmountPattern"
                                        label="Check Amount Pattern"
                                        allowDeselect={false}
                                        placeholder="Check Amount Pattern"
                                        withAsterisk
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="maxAmount"
                                        label="Max Amount"
                                        placeholder="Enter Max Amount"
                                        required={false}
                                        maxLength={21}
                                    />
                                </Grid.Col>

                                {mode === "edit" &&
                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikSelectComponent
                                            name="blocked"
                                            label="Blocked"
                                            allowDeselect={false}
                                            placeholder="Select blocked"
                                            withAsterisk
                                            data={booleanSelectData}
                                        />
                                    </Grid.Col>}
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
                    );
                }}
            </Formik>
        </div>
    );
};

export default TransactionLimitForm;
