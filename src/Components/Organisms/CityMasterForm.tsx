import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Grid, Loader } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { useAppDispatch } from "../../Redux/hooks";
import { booleanSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import {
    CityMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformCityListToFormData,
    transformFormToCreateCityMasterPayload,
    transformFormToUpdateCityMasterPayload,
    validationSchema,
} from "../../Config/Master/CityMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { useLocationDropdowns } from "../../Utils/hooks/useLocationDropdowns";
import BackHeader from "../Molecules/BackHeader";
import { colors } from "../../theme/colors";

type CityMasterFormProps = { mode: "add" | "edit" };

const CityMasterForm = ({ mode }: CityMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CityMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<CityMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateCityMasterPayload,
        transformUpdatePayload: transformFormToUpdateCityMasterPayload,
        successNavigatePath: "/master/city",
        entityName: "City",
    });

    const formReady = mode === "add" || (mode === "edit" && !loading && !!formData?.countryId);

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: MASTER_KEY, endpoint: MASTER_URL, id })
                    ).unwrap();

                    setFormData(transformCityListToFormData(data))
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/city");
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
                title={mode === "edit" ? "Edit City" : "Add City"}
                backPath="/master/city"
            />


            {/* Sub Heading */}
            <BreadCrumb type={"City"} text="Platform Setup" />

            {formReady && (
                <Formik
                    enableReinitialize
                    initialValues={formData}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={handleSubmit}
                >
                    {(formik: FormikProps<any>) => {
                        const countryId = formik.values.countryId;
                        const stateId = formik.values.stateId;
                        const districtId = formik.values.districtId;

                        const { countries, countryError, countryLoading, countryKey, stateKey, stateError, states, stateLoading,
                            districts, districtError, districtLoading, districtKey
                        } = useLocationDropdowns({
                            countryId,
                            stateId,
                            districtId,
                            getStates: true,
                            getDistricts: true,
                            onResetCountry: () => {
                                formik.setFieldTouched("countryId", false); // Reset touch so it won't show red
                                formik.setFieldValue("countryId", "", false); // Set to empty without validating
                            },
                            onResetState: () => {
                                formik.setFieldTouched("stateId", false); // Reset touch so it won't show red
                                formik.setFieldValue("stateId", "", false); // Set to empty without validating
                            },
                            onResetDistrict: () => {
                                formik.setFieldTouched("districtId", false); // Reset touch so it won't show red
                                formik.setFieldValue("districtId", "", false); // Set to empty without validating
                            },
                        });

                        return (
                            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                                <Grid gutter="lg">
                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikSelectComponent
                                            key={countryKey}
                                            name="countryId"
                                            label="Country"
                                            placeholder="Select Country"
                                            nothingFoundMessage="Country List Empty"
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
                                        <FormikSelectComponent
                                            key={stateKey}
                                            name="stateId"
                                            label="State"
                                            placeholder="Select State"
                                            nothingFoundMessage="No State Found"
                                            searchable
                                            allowDeselect
                                            withAsterisk
                                            required
                                            rightSection={
                                                stateLoading ? <Loader size={16} /> : null
                                            }
                                            data={states}
                                            disabled={!!stateLoading || !!stateError || !!countryError}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikSelectComponent
                                            key={districtKey}
                                            name="districtId"
                                            label="District"
                                            nothingFoundMessage="No District Found"
                                            placeholder="Select District"
                                            searchable
                                            allowDeselect
                                            withAsterisk
                                            required
                                            rightSection={
                                                districtLoading ? <Loader size={16} /> : null
                                            }
                                            data={districts}
                                            disabled={!!stateLoading || !!stateError || !!countryError || !!districtError}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="cityName"
                                            label="City Name"
                                            placeholder="Enter City Name"
                                            withAsterisk
                                            maxLength={50}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="cityCode"
                                            label="City Code"
                                            placeholder="Enter City Code"
                                            withAsterisk
                                            maxLength={30}
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
            )}
        </div>
    );
};

export default CityMasterForm;
