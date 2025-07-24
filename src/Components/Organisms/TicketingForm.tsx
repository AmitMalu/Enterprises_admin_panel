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
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import BackHeader from "../Molecules/BackHeader";
import { initialValues, TICKET_KEY, TICKET_URL, TicketFormType, transformTicketListToFormData, validationSchema } from "../../Config/Support/ticketConfig";
import FormikFileInput from "../Molecules/FormikFileInput";

const TicketingForm = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<TicketFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<TicketFormType>({
        mode: "edit",
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: TICKET_KEY,
        addUrl: TICKET_URL,
        updateUrl: TICKET_URL,
        successNavigatePath: "/support/ticket-management",
        entityName: "Ticket",
    });


    useEffect(() => {
        const fetchAndSet = async () => {
            if (id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: TICKET_KEY, endpoint: TICKET_URL, id })
                    ).unwrap();

                    setFormData(transformTicketListToFormData(data));
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/support/ticket-management");
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
            setFormData(initialValues); // Reset form data on unmount
        };
    }, [dispatch, id]);

    const readOnly = true


    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

            <BackHeader
                title={"Update Ticket"}
                backPath="/support/ticket-management"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Support"} text="Ticket" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                    <Grid gutter="lg">
                        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                            <FormikTextInputComponent
                                name="issueType"
                                label="Subject"
                                placeholder="Enter Subject"
                                withAsterisk
                                maxLength={150}
                                disabled={readOnly}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="id"
                                label="Ticket ID"
                                placeholder="Enter Ticket ID"
                                withAsterisk
                                maxLength={30}
                                disabled={readOnly}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <FormikTextInputComponent
                                name="raisedBy"
                                label="Raised By"
                                placeholder="Enter Raised By"
                                withAsterisk
                                maxLength={100}
                                disabled={readOnly}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                            <FormikFileInput
                                name="screenshotImage"
                                label="Document"
                                placeholder="Upload Document"
                                withAsterisk
                                disabled={readOnly}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <FormikTextInputComponent
                                name="description"
                                label="Description"
                                placeholder="Enter description"
                                withAsterisk
                                maxLength={150}
                                disabled={readOnly}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <FormikTextInputComponent
                                name="remark"
                                label="Remark"
                                placeholder="Enter remark"
                                withAsterisk
                                maxLength={150}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <FormikSelectComponent
                                name="status"
                                label="Status"
                                placeholder="Select Status"
                                withAsterisk
                                maxLength={100}
                                data={[{ label: "PENDING", value: "PENDING" },
                                { label: "SUCCESS", value: "SUCCESS" },
                                { label: "REJECTED", value: "REJECTED" }]}
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
                            UPDATE
                        </ButtonComponent>}
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default TicketingForm;
