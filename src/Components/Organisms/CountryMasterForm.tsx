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
    CountryMasterFormType,
    initialValues,
    MASTER_KEY,
    MASTER_URL,
    transformCountryListToFormData,
    transformFormToCreateCountryMasterPayload,
    transformFormToUpdateCountryMasterPayload,
    validationSchema,
} from "../../Config/Master/CountryMasterConfig";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";

type CountryMasterFormProps = { mode: "add" | "edit" };

const CountryMasterForm = ({ mode }: CountryMasterFormProps) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CountryMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<CountryMasterFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        addUrl: MASTER_URL,
        updateUrl: MASTER_URL,
        transformCreatePayload: transformFormToCreateCountryMasterPayload,
        transformUpdatePayload: transformFormToUpdateCountryMasterPayload,
        successNavigatePath: "/master/country",
        entityName: "Country",
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
                    setFormData(transformCountryListToFormData(data))
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/country");
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
                title={mode === "edit" ? "Edit Country" : "Add Country"}
                backPath="/master/country"
            />
            {/* Sub Heading */}
            <BreadCrumb type={"Country"} text="Master" />

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
                                name="countryName"
                                label="Country Name"
                                placeholder="Enter Country Name"
                                withAsterisk
                                maxLength={50}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="countryCode"
                                label="Country Code"
                                placeholder="Enter Country Code"
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
                                        placeholder="Select isBlocked"
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
            </Formik>
        </div>
    );
};

export default CountryMasterForm;
