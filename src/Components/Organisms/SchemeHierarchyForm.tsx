import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { initialValues, SCHEMES_HIERARCHY_KEY, SCHEMES_HIERARCHY_URL, SchemesHierarchyFormType, transformFormToCreateSchemesHierarchyPayload, transformFormToUpdateSchemesHierarchyPayload, validationSchema } from "../../Config/Schemes/SchemesHierarchyConfig";
import { useEffect, useState } from "react";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { fetchSchemeById } from "../../Redux/Features/Schemes/thunks";
import { toast } from "react-toastify";
import TextComponent from "../Atoms/TextComponent";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikMultiSelectComponent from "../Molecules/FormikMultiSelectComponent";


type SchemeHierarchyFormProps = { mode: "add" | "edit" };


const SchemeHierarchyForm = ({ mode }: SchemeHierarchyFormProps) => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SchemesHierarchyFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<SchemesHierarchyFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: SCHEMES_HIERARCHY_KEY,
        addUrl: `${SCHEMES_HIERARCHY_URL}/save`,
        updateUrl: `${SCHEMES_HIERARCHY_URL}/update`,
        transformCreatePayload: transformFormToCreateSchemesHierarchyPayload,
        transformUpdatePayload: transformFormToUpdateSchemesHierarchyPayload,
        successNavigatePath: "/schemes/hierarchy",
        entityName: "Scheme Hierarchy",
        delay: 5000,
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchSchemeById({ key: SCHEMES_HIERARCHY_KEY, endpoint: `${SCHEMES_HIERARCHY_URL}/getById`, id })
                    ).unwrap();

                    setFormData(data)
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/schemes/hierarchy");
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
            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                {mode === "edit" ? "Edit Scheme Hierarchy" : "Add Scheme Hierarchy"}
            </TextComponent>

            {/* Sub Heading */}
            <BreadCrumb type="Hierarchy" text="Schemes" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {() => {

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <FormikTextInputComponent
                                        name="schemeHierarchySelectionName"
                                        label="Scheme Hierarchy Name"
                                        placeholder="Enter Scheme Hierarchy Name"
                                        withAsterisk
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <FormikMultiSelectComponent
                                        name="schemeHierarchyCombination"
                                        label="Hierarchy Combination "
                                        placeholder="Select Scheme Hierarchy combinations"
                                        withAsterisk
                                        data={["Retailer", "Distributor", "Partner", "SuperDistributor", "Whitelabel"]}
                                        clearable
                                        searchable
                                        handpickValues
                                        maxValues={5}
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
                                    disabled={!!fetchError || !!loading}
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
    )
}

export default SchemeHierarchyForm
