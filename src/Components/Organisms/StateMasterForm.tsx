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
import { booleanSelectData, SelectRegionTypeData, SelectZoneData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import {
    StateMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformStateListToFormData,
    transformFormToCreateStateMasterPayload,
    transformFormToUpdateStateMasterPayload,
    validationSchema,
} from "../../Config/Master/StateMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { useLocationDropdowns } from "../../Utils/hooks/useLocationDropdowns";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";

type StateMasterFormProps = { mode: "add" | "edit" };

const StateMasterForm = ({ mode }: StateMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<StateMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<StateMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateStateMasterPayload,
        transformUpdatePayload: transformFormToUpdateStateMasterPayload,
        successNavigatePath: "/master/state",
        entityName: "State",
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

                    setFormData(transformStateListToFormData(transformStateListToFormData(data)))
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/state");
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
                title={mode === "edit" ? "Edit State" : "Add State"}
                backPath="/master/state"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"State"} text="Master" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {() => {
                    const { countries, countryLoading, countryError } = useLocationDropdowns({});

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="zone"
                                        label="Zone"
                                        placeholder="Select Zone"
                                        withAsterisk
                                        required
                                        allowDeselect={true}
                                        searchable={true}
                                        data={SelectZoneData}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="countryId"
                                        label="Country"
                                        placeholder="Select Country"
                                        nothingFoundMessage="No Match for Country Found"
                                        withAsterisk
                                        required
                                        searchable
                                        allowDeselect
                                        data={countries}
                                        rightSection={
                                            countryLoading ? <Loader size={16} /> : null
                                        }
                                        disabled={!!countryLoading || !!countryError}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="stateName"
                                        label="State Name"
                                        placeholder="Enter State Name"
                                        withAsterisk
                                        minLength={2}
                                        maxLength={25}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="stateCode"
                                        label="State Code"
                                        placeholder="Enter State Code"
                                        withAsterisk
                                        maxLength={30}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="regionType"
                                        label="Region Type"
                                        placeholder="Select Region Type"
                                        withAsterisk
                                        required
                                        data={SelectRegionTypeData}
                                    />
                                </Grid.Col>

                                {mode === "edit" && (
                                    <>
                                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                            <FormikSelectComponent
                                                name="blocked"
                                                label="Blocked"
                                                placeholder="Select"
                                                withAsterisk
                                                data={booleanSelectData}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                            <FormikSelectComponent
                                                name="isActive"
                                                label="Active"
                                                placeholder="Select isActive"
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
                    );
                }}
            </Formik>
        </div>
    );
};

export default StateMasterForm;
