import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import {
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformFormToCreateVendorCredentialPayload,
    transformFormToUpdateVendorCredentialPayload,
    transformVendorCredentialToFormData,
    validationSchema,
    VendorCredentialFormType,
} from "../../Config/Master/VendorCredentialConfig";
import {
    booleanSelectData,
} from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { toast } from "react-toastify";
import { fetchMasterById, fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { useVendor } from "../../Utils/hooks/useVendor";

type VendorCredentialFormProps = { mode: "add" | "edit" };

const VendorCredentialForm = ({ mode }: VendorCredentialFormProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<VendorCredentialFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [whiteLabelAdminList, setWhiteLabelAdminList] = useState<{ label: string; value: string }[]>([]);
    const hasFetchedRef = useRef(false);

    const handleSubmit = useThrottleMasterFormSubmit<VendorCredentialFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateVendorCredentialPayload,
        transformUpdatePayload: transformFormToUpdateVendorCredentialPayload,
        successNavigatePath: "/master/vendor-credential",
        entityName: "VendorCredential",
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

                    setFormData(transformVendorCredentialToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/vendor-credential");
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
                title={mode === "edit" ? "Edit Vendor Credential" : "Add Vendor Credential"}
                backPath="/master/vendor-credential"
            />
            {/* Sub Heading */}
            <BreadCrumb type={"Vendor Credential"} text="Master" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {({ values }) => {
                    const {
                        productDropdownData,
                        loadingProductList,
                    } = useProductSubProduct({});

                    const { vendorDropdownData, loadingVendorList } = useVendor();

                    useEffect(() => {
                        const fetchAdminDropdownList = async () => {
                            if (values.isWhiteLabelAdmin && !hasFetchedRef.current) {
                                try {
                                    const data = await dispatch(
                                        fetchMasterDropdown({ url: `/api/white-labels/admin-dropdown` })
                                    ).unwrap();

                                    const formattedData: { label: string; value: string }[] = data?.map((item: any) => ({
                                        label: String(item.displayName),
                                        value: String(item.whiteLabelId)
                                    }));

                                    setWhiteLabelAdminList(formattedData)
                                    hasFetchedRef.current = true;

                                } catch (err: any) {
                                    toast.error(err);
                                }
                                finally {
                                    setLoading(false);
                                }
                            } else if (!values.isWhiteLabelAdmin) {
                                setWhiteLabelAdminList([]); // Reset on false
                                hasFetchedRef.current = false; // Allow refetch if toggled again
                            }
                        };

                        fetchAdminDropdownList();
                    }, [values.isWhiteLabelAdmin, dispatch]);

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="vendorId"
                                        label="Vendor"
                                        placeholder="Select Vendor "
                                        withAsterisk
                                        required
                                        data={vendorDropdownData}
                                        disabled={loadingVendorList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="productId"
                                        label="Product"
                                        placeholder="Select Product"
                                        withAsterisk
                                        required
                                        data={productDropdownData}
                                        disabled={loadingProductList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="tokenUrlUat"
                                        label="Token Url UAT"
                                        placeholder="Enter Token URL UAT"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="tokenUrlProd"
                                        label="Token Url Prod"
                                        placeholder="Enter Token URL Prod"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="baseUrlUat"
                                        label="Base Url UAT"
                                        placeholder="Enter Base URL UAT"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="baseUrlProd"
                                        label="Base Url Prod"
                                        placeholder="Enter Base URL Prod"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="clientId"
                                        label="Client Id"
                                        placeholder="Enter Base Client Id"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="saltKey"
                                        label="SaltKey"
                                        placeholder="Enter SaltKey"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="clientSecret"
                                        label="Client Secret"
                                        placeholder="Enter Client Secret"
                                        withAsterisk
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="username"
                                        label="Username"
                                        placeholder="Enter Username"
                                        withAsterisk
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="password"
                                        label="Password"
                                        placeholder="Enter Password"
                                        withAsterisk
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isWhiteLabelAdmin"
                                        label="Is WL-Admin"
                                        placeholder="Select"
                                        withAsterisk
                                        allowDeselect={false}
                                        data={booleanSelectData}
                                    />
                                </Grid.Col>

                                {values.isWhiteLabelAdmin && <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="whiteLabelAdminId"
                                        label="WL-Admin Id"
                                        placeholder="Select"
                                        withAsterisk
                                        allowDeselect={false}
                                        data={whiteLabelAdminList || []}
                                    />
                                </Grid.Col>}

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="isActive"
                                        label="Is Active"
                                        placeholder="Select Active Status"
                                        allowDeselect={false}
                                        withAsterisk
                                        data={booleanSelectData}
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

export default VendorCredentialForm;
