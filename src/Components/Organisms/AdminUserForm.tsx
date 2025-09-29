import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useState } from "react";
import { useThrottleMasterFormSubmit } from "../../Utils/hooks/useThrottleMasterFormSubmit";
import { fetchMasterById } from "../../Redux/Features/Masters/MastersThunk";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BreadCrumb from "../Molecules/BreadCrumb";
import { Form, Formik, FormikProps } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikTextInputComponent from "../Molecules/FormikTextInputComponent";
import ButtonComponent from "../Atoms/ButtonComponent";
import FormikMultiSelectComponent from "../Molecules/FormikMultiSelectComponent";
import BackHeader from "../Molecules/BackHeader";
import { useMenuListFromSidebar } from "../../Utils/hooks/useMenuListFromSidebar";
import { LockIconSvg } from "../../assets/Icons";
import { useAddressFromZipcode } from "../../Utils/hooks/useAddressFromZipcode";
import { ADMIN_USER_KEY, ADMIN_USER_URL, AdminUserFormType, initialValues, transformFormToCreateAdminUserPayload, transformFormToUpdateAdminUserPayload, transformResponseToFormData, validationSchema } from "../../Config/Management/AdminUserConfig";
import { transformPermissionsToMenus } from "../../Utils/utils";

interface AdminUserFormProps {
    mode: 'add' | 'edit';
}

const AdminUserForm = ({ mode }: AdminUserFormProps) => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AdminUserFormType>(initialValues);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleSubmit = useThrottleMasterFormSubmit<AdminUserFormType>({
        mode,
        id,
        dispatch,
        navigate,
        resetFormData: () => setFormData(initialValues),
        masterKey: ADMIN_USER_KEY,
        addUrl: `${ADMIN_USER_URL}/create`,
        updateUrl: `${ADMIN_USER_URL}`,
        transformCreatePayload: transformFormToCreateAdminUserPayload,
        transformUpdatePayload: transformFormToUpdateAdminUserPayload,
        successNavigatePath: "/management/admin-user",
        entityName: "Admin User",
        delay: 5000,
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            if (mode === "edit" && id) {
                setFetchLoading(true);
                setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: ADMIN_USER_KEY, endpoint: `${ADMIN_USER_URL}`, id })
                    ).unwrap();

                    // Step 1: Transform base fields (without touching menus/subMenus)
                    const baseFormData = transformResponseToFormData(data);

                    // Step 2: Transform permission string into menus/subMenus
                    const { menus, subMenus } = transformPermissionsToMenus(data.permission);

                    // Step 3: Merge both
                    setFormData({
                        ...baseFormData,
                        menus,
                        subMenus,
                    });
                } catch (err: any) {
                    toast.error(err);
                    setFetchError(err);
                    setTimeout(() => {
                        navigate("/management/admin-user");
                    }, 2000);
                }
                finally {
                    setFetchLoading(false);
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
                title={mode === "edit" ? "Edit Admin User" : "Add Admin User"}
                backPath="/management/admin-user"
            />

            {/* Sub Heading */}
            <BreadCrumb type="Admin User" text="Management" />

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
            >
                {(formik: FormikProps<any>) => {

                    const { menuList, subMenuList, loadingMenus, MenuError } = useMenuListFromSidebar({
                        selectedMenus: formik.values.menus,
                    });

                    const { location, loading, error } = useAddressFromZipcode(formik.values.zipCode)

                    useEffect(() => {
                        if (formik.values.state !== location.state) {
                            formik.setFieldValue("state", location.state);
                        }

                        if (formik.values.city !== location.city) {
                            formik.setFieldValue("city", location.city);
                        }
                    }, [location.state, location.city]);

                    useEffect(() => {
                        if (error) {
                            formik.setFieldError("zipCode", error);
                        } else {
                            formik.setFieldError("zipCode", ""); // clear previous errors
                        }
                    }, [error]);

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
                                <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                                    <FormikTextInputComponent
                                        name="name"
                                        label="Name"
                                        placeholder="Type Name"
                                        withAsterisk
                                        maxLength={51}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                                    <FormikTextInputComponent
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        placeholder="Enter Your Mobile Number"
                                        withAsterisk
                                        maxLength={10}
                                        allowSpecialChar={false}
                                        allowCharacter={false}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                                    <FormikTextInputComponent
                                        name="username"
                                        label="Username"
                                        placeholder="Type Username"
                                        withAsterisk
                                        maxLength={51}
                                    />
                                </Grid.Col>

                                {/* Password */}
                                <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                                    <FormikTextInputComponent
                                        // type="password"
                                        name="password"
                                        label="Password"
                                        withAsterisk
                                        placeholder="Password"
                                        required
                                        leftSection={<LockIconSvg />}
                                        leftSectionWidth={36}
                                        rightSectionWidth={48}
                                        maxLength={51}
                                    />
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="emailId"
                                        label="Email ID"
                                        placeholder="Enter Your Email Address"
                                        withAsterisk
                                        maxLength={50}
                                    />
                                </Grid.Col>

                                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="dob"
                                        type="date"
                                        label="Date of Birth"
                                        placeholder="Select Date"
                                        withAsterisk
                                    />
                                </Grid.Col>

                                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="address"
                                        label="Address"
                                        placeholder="Enter Your Address"
                                        withAsterisk
                                        required
                                        maxLength={150}
                                    />
                                </Grid.Col>

                                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        name="zipCode"
                                        label="Zip Code"
                                        placeholder="Enter Your Zipcode"
                                        withAsterisk
                                        error={error}
                                        disabled={!!loading}
                                        rightSection={
                                            loading ? <Loader size={16} /> : null
                                        }
                                        maxLength={6}
                                        allowSpecialChar={false}
                                        allowCharacter={false}
                                        allowSpace={false}
                                    />
                                </Grid.Col>

                                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        value={formik.values.state || ""}
                                        key={`state-${formik.values.state || "empty"}`}
                                        name="state"
                                        label="State"
                                        placeholder="Select Your State"
                                        withAsterisk
                                        rightSection={
                                            loading ? <Loader size={16} /> : null
                                        }
                                        disabled
                                    />
                                </Grid.Col>

                                <Grid.Col className="" span={{ base: 12, md: 6, lg: 4 }}>
                                    <FormikTextInputComponent
                                        value={formik.values.city || ""}
                                        key={`city-${formik.values.city || "empty"}`}
                                        name="city"
                                        label="City"
                                        placeholder="Select Your City"
                                        withAsterisk
                                        rightSection={
                                            loading ? <Loader size={16} /> : null
                                        }
                                        required
                                        disabled
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
                                        disabled={!!loadingMenus || !!MenuError}
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
                                        disabled={!formik.values.menus?.length || !!fetchLoading || !!loadingMenus || !!loading}
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
                                    disabled={!!fetchError || !!fetchLoading || !!loadingMenus || !!loading}
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

export default AdminUserForm
