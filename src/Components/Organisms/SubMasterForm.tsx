import { Form, Formik } from "formik";
import ButtonComponent from "../Atoms/ButtonComponent";
import TextComponent from "../Atoms/TextComponent";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Grid } from "@mantine/core";
import * as Yup from "yup";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchMasterById, fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { initialValues, SubMasterFormType, transformFormToCreateSubMasterPayload, transformFormToUpdateSubMasterPayload, validationSchema } from "../../Config/Master/SubMasterConfig";
import { MASTER_KEY, MASTER_URL } from "../../Config/Master/MainMasterConfig";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";


interface MasterDropdownItem {
    imMasterName: string;
    imMasterId: string;
}
type SubMasterFormProps = { mode: "add" | "edit" };

const SubMainMasterForm = ({ mode }: SubMasterFormProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<SubMasterFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [mainMasterList, setMainMasterList] = useState<{ label: string, value: string }[]>([]);

    const handleSubmit = useThrottleMasterFormSubmit<SubMasterFormType>({
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: MASTER_KEY,
        masterUrl: `${MASTER_URL}/add-sub-master`,
        transformCreatePayload: transformFormToCreateSubMasterPayload,
        transformUpdatePayload: transformFormToUpdateSubMasterPayload,
        successNavigatePath: "/master/sub-master",
        entityName: "SubMaster"
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

                    setFormData(data);
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/master/sub-master");
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

    useEffect(() => {
        const fetchMasterList = async () => {
            try {
                const data = await dispatch(
                    fetchMasterDropdown({ url: `${MASTER_URL}/dropdown` })
                ).unwrap();

                const formattedData: { label: string; value: string }[] = (data as MasterDropdownItem[])?.map((item: MasterDropdownItem) => ({
                    label: String(item.imMasterName),
                    value: String(item.imMasterId)
                }));

                setMainMasterList(formattedData)

            } catch (err: any) {
                const message =
                    err instanceof Error
                        ? err.message
                        : typeof err === "string"
                            ? err
                            : "Something went wrong";
                toast.error(message);
                setFetchError(message);
                setTimeout(() => {
                    navigate("/master/sub-master");
                }, 2000);
            }
            finally {
                setLoading(false);
            }
        }

        fetchMasterList()
    }, [])

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">
            <TextComponent fontSize={24} fontFamily="Inter" fontWeight={600}>
                {mode === "edit" ? "Edit Sub Master Form" : "Sub Master Form"}
            </TextComponent>

            {/* Sub Heading */}
            <BreadCrumb type={"SubMaster"} text="Master" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                    <Grid gutter="lg">
                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <FormikSelectComponent
                                name="imMasterId"
                                label="Master"
                                placeholder="Select Master "
                                withAsterisk
                                required
                                data={mainMasterList}
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                            <FormikTextInputComponent
                                name="imSubMasterName"
                                label="Sub Master Name"
                                placeholder="Enter Sub Master Name"
                                withAsterisk
                                required
                                maxLength={100}
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
            </Formik>
        </div>
    );
};

export default SubMainMasterForm;
