import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { initialValues, KEY, transformFormToCreateUserConfigPayload, transformFormToUpdateUserConfigPayload, transformPermissionsToMenus, URL, UserConfigFormType, validationSchema } from "../../Config/Management/UserConfigurationConfig";
import { useEffect, useState } from "react";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import { Grid } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikSelectComponent from "../Molecules/FormikSelectComponent";
import { useIndianStateCity } from "../../Utils/hooks/useIndianStateCity";
import FormikMultiSelectComponent from "../Molecules/FormikMultiSelectComponent";
import { useMenuSubMenuList } from "../../Utils/hooks/useMenuSubMenuList";
import BackHeader from "../Molecules/BackHeader";

type UserConfigFormProps = { mode: "add" | "edit" };

const UserConfigForm = ({ mode }: UserConfigFormProps) => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<UserConfigFormType>(initialValues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const { states } = useIndianStateCity({})

    const handleSubmit = useThrottleMasterFormSubmit<UserConfigFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: KEY,
        addUrl: `${URL}`,
        updateUrl: `${URL}`,
        transformCreatePayload: transformFormToCreateUserConfigPayload,
        transformUpdatePayload: transformFormToUpdateUserConfigPayload,
        successNavigatePath: "/management/user-configuration",
        entityName: "User Configuration",
        delay: 5000,
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: KEY, endpoint: `${URL}`, id })
                    ).unwrap();

                    const { menus, subMenus } = transformPermissionsToMenus(data.permission);

                    setFormData({
                        ...data,
                        menus,
                        subMenus,
                    });
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/management/user-configuration");
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
                title={mode === "edit" ? "Edit User Configuration" : "Add User Configuration"}
                backPath="/management/user-configuration"
            />

            {/* Sub Heading */}
            <BreadCrumb type="User Configuration" text="Management" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {(formik: FormikProps<any>) => {

                    const { menuList, subMenuList, loadingMenus, error } = useMenuSubMenuList({
                        selectedMenus: formik.values.menus,
                    });

                    useEffect(() => {
                        const { menus, subMenus } = formik.values;
                        const valid = subMenus?.filter((id: string) =>
                            menus.includes(id.substring(0, 2))
                        );
                        if (valid?.length !== subMenus?.length) {
                            formik.setFieldValue("subMenus", valid, false);
                        }
                    }, [formik.values.menus]);

                    return (
                        <Form className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl">
                            <Grid gutter="lg">
                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="userRole"
                                        label="User Role"
                                        placeholder="Select User Role"
                                        withAsterisk
                                        clearable
                                        searchable
                                        data={[
                                            { value: "Admin", label: "Admin" },
                                            { value: "User", label: "User" }
                                        ]}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="fullName"
                                        label="Full Name"
                                        placeholder="Enter Full Name"
                                        withAsterisk
                                        required
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="mobile"
                                        label="Mobile Number"
                                        placeholder="Enter Mobile Number"
                                        withAsterisk
                                        required
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                                    <FormikTextInputComponent
                                        name="email"
                                        label="Email"
                                        placeholder="Enter Email"
                                        withAsterisk
                                        required
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikSelectComponent
                                        name="state"
                                        label="State"
                                        placeholder="Select Select State"
                                        withAsterisk
                                        clearable
                                        searchable
                                        data={states}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <FormikMultiSelectComponent
                                        name="menus"
                                        label="Menu"
                                        data={menuList}
                                        withAsterisk
                                        searchable
                                        clearable
                                        disabled={!!loadingMenus || !!loading || !!error}
                                    />

                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <FormikMultiSelectComponent
                                        name="subMenus"
                                        label="Sub Menu"
                                        data={subMenuList}
                                        withAsterisk
                                        searchable
                                        clearable
                                        disabled={!formik.values.menus?.length || !!loading || !!loadingMenus || !!error}
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

export default UserConfigForm
