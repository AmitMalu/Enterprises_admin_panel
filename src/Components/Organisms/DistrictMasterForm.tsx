import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextComponent from "../Atoms/TextComponent";
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
    DistrictMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformDistrictListToFormData,
    transformFormToCreateDistrictMasterPayload,
    transformFormToUpdateDistrictMasterPayload,
    validationSchema,
} from "../../Config/Master/DistrictMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { useLocationDropdowns } from "../../Utils/hooks/useLocationDropdowns";

type DistrictMasterFormProps = { mode: "add" | "edit" };

const DistrictMasterForm = ({ mode }: DistrictMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<DistrictMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<DistrictMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateDistrictMasterPayload,
        transformUpdatePayload: transformFormToUpdateDistrictMasterPayload,
        successNavigatePath: "/master/district",
        entityName: "District",
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

                    setFormData(transformDistrictListToFormData(data))
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/district");
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
                {mode === "edit" ? "Edit District" : "Add District"}
            </TextComponent>

            {/* Sub Heading */}
            <BreadCrumb type={"District"} text="Master" />

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

                        const { countries, countryError, countryLoading, countryKey, stateKey, stateError, states, stateLoading } = useLocationDropdowns({
                            countryId,
                            stateId,
                            getStates: true,
                            onResetCountry: () => {
                                formik.setFieldTouched("countryId", false); // Reset touch so it won't show red
                                formik.setFieldValue("countryId", "", false); // Set to empty without validating
                            },
                            onResetState: () => {
                                formik.setFieldTouched("stateId", false); // Reset touch so it won't show red
                                formik.setFieldValue("stateId", "", false); // Set to empty without validating
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
                                            withAsterisk
                                            required
                                            searchable
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
                                            searchable
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
                                        <FormikTextInputComponent
                                            name="districtName"
                                            label="district Name"
                                            placeholder="Enter District Name"
                                            withAsterisk
                                            maxLength={50}
                                        />
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                        <FormikTextInputComponent
                                            name="districtCode"
                                            label="district Code"
                                            placeholder="Enter District Code"
                                            withAsterisk
                                            maxLength={30}
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

export default DistrictMasterForm;
