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
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { initialValues, SCHEMES_KEY, SCHEMES_URL, SchemesListFormType, transformFormToCreateSchemesPayload, transformFormToUpdateSchemesPayload, validationSchema } from "../../Config/Schemes/SchemesConfig";
import { fetchSchemeById } from "../../Redux/Features/Schemes/thunks";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { useVendor } from "../../Utils/hooks/useVendor";
import { useHeirarchyCombinationList } from "../../Utils/hooks/useHeirarchyCombinationList";
import BackHeader from "../Molecules/BackHeader";

type SchemesFormPageProps = { mode: "add" | "edit" };

const SchemesFormPage = ({ mode }: SchemesFormPageProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SchemesListFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const { vendorDropdownData, loadingVendorList, vendorError } = useVendor({});
    const { hierarchyList, loadingHierarchyList, hierarchyListError } = useHeirarchyCombinationList()

    const handleSubmit = useThrottleMasterFormSubmit<SchemesListFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: SCHEMES_KEY,
        addUrl: `${SCHEMES_URL}/save`,
        updateUrl: `${SCHEMES_URL}/update`,
        transformCreatePayload: transformFormToCreateSchemesPayload,
        transformUpdatePayload: transformFormToUpdateSchemesPayload,
        successNavigatePath: "/schemes/schemeslist",
        entityName: "Scheme",
        delay: 5000,
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchSchemeById({ key: SCHEMES_KEY, endpoint: `${SCHEMES_URL}/get-by-id`, id })
                    ).unwrap();

                    setFormData(data)
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/schemes/schemeslist");
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
                title={mode === "edit" ? "Edit Scheme" : "Add Scheme"}
                backPath="/schemes/schemeslist"
            />

            {/* Sub Heading */}
            <BreadCrumb type={mode} text="Schemes" />

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
                        productSubproductError
                    } = useProductSubProduct({
                        selectedProductId: formik.values.productId,
                        onSubProductReset: () => formik.setFieldValue("subProductId", ""),
                    });

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="schemeName"
                                        label="Scheme Name"
                                        placeholder="Enter Scheme Name"
                                        withAsterisk
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="schemeCode"
                                        label="Scheme Code"
                                        placeholder="Enter Scheme Code"
                                        withAsterisk
                                        maxLength={30}
                                        allowSpecialChar={false}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="productId"
                                        label="Product"
                                        value={formik.values.productId}
                                        placeholder="Select Product"
                                        withAsterisk
                                        required
                                        searchable
                                        allowDeselect
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
                                    <FormikSelectComponent
                                        name="vendorId"
                                        label="Vendor"
                                        value={formik.values.vendorId}
                                        placeholder="Select Vendor"
                                        searchable
                                        allowDeselect
                                        withAsterisk
                                        required
                                        data={vendorDropdownData}
                                        disabled={loadingVendorList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="schemeHierarchySelectionId"
                                        label="Scheme Hierarchy"
                                        value={formik.values.schemeHierarchySelectionId}
                                        placeholder="Select Scheme Hierarchy"
                                        withAsterisk
                                        required
                                        data={hierarchyList}
                                        disabled={loadingHierarchyList}
                                    />
                                </Grid.Col>
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
                                    disabled={!!productSubproductError || !!vendorError || !!hierarchyListError}
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

export default SchemesFormPage

