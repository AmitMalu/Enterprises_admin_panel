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
    PincodeMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformPincodeListToFormData,
    transformFormToCreatePincodeMasterPayload,
    transformFormToUpdatePincodeMasterPayload,
    validationSchema,
} from "../../Config/Master/PincodeMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { useLocationDropdowns } from "../../Utils/hooks/useLocationDropdowns";
import BackHeader from "../Molecules/BackHeader";

type PincodeMasterFormProps = { mode: "add" | "edit" };

const PincodeMasterForm = ({ mode }: PincodeMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<PincodeMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<PincodeMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreatePincodeMasterPayload,
        transformUpdatePayload: transformFormToUpdatePincodeMasterPayload,
        successNavigatePath: "/master/pincode",
        entityName: "Pincode",
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

                    setFormData(transformPincodeListToFormData(data))
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/pincode");
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
                title={mode === "edit" ? "Edit Pincode" : "Add Pincode"}
                backPath="/master/pincode"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Pincode"} text="Master" />

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
                        const cityId = formik.values.cityId;

                        const { countries, countryError, countryLoading, countryKey, stateKey, stateError, states, stateLoading,
                            districts, districtError, districtLoading, districtKey, cities, cityError, cityLoading, cityKey
                        } = useLocationDropdowns({
                            countryId,
                            stateId,
                            districtId,
                            cityId,
                            getStates: true,
                            getDistricts: true,
                            getCities: true,
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
                            onResetCity: () => {
                                formik.setFieldTouched("cityId", false); // Reset touch so it won't show red
                                formik.setFieldValue("cityId", "", false); // Set to empty without validating
                            },
                        });
                        console.log(formik.values);

                        return (
                            <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                                <Grid gutter="lg">
                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikSelectComponent
                                            key={countryKey}
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
                                        <FormikSelectComponent
                                            key={cityKey}
                                            name="cityId"
                                            label="City"
                                            nothingFoundMessage="No Cities found"
                                            placeholder="Select City"
                                            searchable
                                            allowDeselect
                                            withAsterisk
                                            required
                                            rightSection={
                                                cityLoading ? <Loader size={16} /> : null
                                            }
                                            data={cities}
                                            disabled={!!stateLoading || !!stateError || !!countryError || !!districtError || !!cityLoading || cityError}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="pinCode"
                                            label="Pincode"
                                            placeholder="Enter Pincode"
                                            withAsterisk
                                            allowCharacter={false}
                                            allowSpecialChar={false}
                                            maxLength={6}
                                        />
                                    </Grid.Col>

                                    {mode === "edit" && (
                                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                            <FormikSelectComponent
                                                name="blocked"
                                                label="Blocked"
                                                placeholder="Select"
                                                withAsterisk
                                                data={booleanSelectData}
                                            />
                                        </Grid.Col>
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
                        );
                    }}
                </Formik>
            )}
        </div>
    );
};

export default PincodeMasterForm;
