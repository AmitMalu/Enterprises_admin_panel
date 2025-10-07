import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import {
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformFormToCreateVendorRoutingPayload,
    transformFormToUpdateVendorRoutingPayload,
    transformVendorRoutingToFormData,
    validationSchema,
    VendorRoutingFormType,
} from "../../Config/Master/VendorRoutingConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { useVendor } from "../../Utils/hooks/useVendor";
import { useSubProductList } from "../../Utils/hooks/useSubProductList";

type VendorRoutingFormProps = { mode: "add" | "edit" };

type VendorOption = {
    value: string;
    label: string;
};

const VendorRoutingForm = ({ mode }: VendorRoutingFormProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<VendorRoutingFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<VendorRoutingFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateVendorRoutingPayload,
        transformUpdatePayload: transformFormToUpdateVendorRoutingPayload,
        successNavigatePath: "/master/vendor-routing",
        entityName: "VendorRouting",
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

                    setFormData(transformVendorRoutingToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/vendor-routing");
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
                title={mode === "edit" ? "Edit Vendor Routing" : "Add Vendor Routing"}
                backPath="/master/vendor-routing"
            />
            {/* Sub Heading */}
            <BreadCrumb type={"Vendor Routing"} text="Master" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => {
                    const { subProductDropdownData, loadingSubProductList } = useSubProductList();
                    const { vendorDropdownData, loadingVendorList } = useVendor({
                        subProductId: String(values.subProductId),
                        waitForSubProduct: true
                    });

                    // Reset vendor fields when subProduct changes
                    useEffect(() => {
                        setFieldValue("routingPriority1", "");
                        setFieldValue("routingPriority2", "");
                        setFieldValue("routingPriority3", "");
                    }, [values.subProductId, setFieldValue]);

                    const optionsForPriority1 = vendorDropdownData.filter(
                        (vendor: VendorOption) =>
                            vendor.value !== values.routingPriority2 &&
                            vendor.value !== values.routingPriority3
                    );

                    const optionsForPriority2 = vendorDropdownData.filter(
                        (vendor: VendorOption) =>
                            vendor.value !== values.routingPriority1 &&
                            vendor.value !== values.routingPriority3
                    );

                    const optionsForPriority3 = vendorDropdownData.filter(
                        (vendor: VendorOption) =>
                            vendor.value !== values.routingPriority1 &&
                            vendor.value !== values.routingPriority2
                    );

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="subProductId"
                                        label="Sub Product"
                                        placeholder="Select Sub Product "
                                        withAsterisk
                                        allowDeselect={true}
                                        searchable={true}
                                        nothingFoundMessage="Nothing Found"
                                        required
                                        data={subProductDropdownData}
                                        disabled={loadingSubProductList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        key={`priority1-${values.subProductId}`}
                                        name="routingPriority1"
                                        label="Routing Priority 1"
                                        placeholder="Select Routing Priority 1"
                                        withAsterisk
                                        allowDeselect={true}
                                        searchable={true}
                                        nothingFoundMessage="Nothing Found"
                                        required
                                        data={optionsForPriority1}
                                        disabled={loadingVendorList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        key={`priority2-${values.subProductId}`}
                                        name="routingPriority2"
                                        label="Routing Priority 2"
                                        placeholder="Select Routing Priority 2"
                                        withAsterisk
                                        required
                                        allowDeselect={true}
                                        searchable={true}
                                        nothingFoundMessage="Nothing Found"
                                        data={optionsForPriority2}
                                        disabled={loadingVendorList}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        key={`priority3-${values.subProductId}`}
                                        name="routingPriority3"
                                        label="Routing Priority 3"
                                        placeholder="Select Routing Priority 3"
                                        withAsterisk
                                        allowDeselect={true}
                                        searchable={true}
                                        nothingFoundMessage="Nothing Found"
                                        required
                                        data={optionsForPriority3}
                                        disabled={loadingVendorList}
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

export default VendorRoutingForm;
