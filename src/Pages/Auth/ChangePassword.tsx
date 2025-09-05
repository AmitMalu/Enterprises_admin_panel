import { Form, Formik } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../Redux/Features/Auth/Thunk";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { passwordValidation } from "../../Utils/ValidationUtils";
import BackHeader from "../../Components/Molecules/BackHeader";
import FormikTextInputComponent from "../../Components/Molecules/FormikTextInputComponent";
import { useState } from "react";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import PopupModal from "../../Components/Atoms/PopupModal";
import TextComponent from "../../Components/Atoms/TextComponent";

const validationSchema = Yup.object().shape({
    oldPassword: passwordValidation,
    newPassword: passwordValidation.notOneOf(
        [Yup.ref("oldPassword")],
        "New password cannot be the same as old password"
    ),
    confirmPassword: Yup.string()
        .required("Please Re-Enter your password")
        .oneOf([Yup.ref("newPassword")], "Passwords not matched"),
});

interface FormType {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

const initialValues: FormType = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
}

const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const username =
        JSON.parse(localStorage.getItem("userInfo") || "{}")?.mobileNumber || "" // Extract username from localstorage

    const [formKey, setFormKey] = useState(0);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const throttledSubmit = useThrottledFormSubmit(
        async (values: FormType, { resetForm }: any) => {
            setIsConfirmOpen(false)
            try {
                const result = await dispatch(
                    changePassword({
                        userName: username,
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword,
                    })
                ).unwrap();
                toast.success(result.message);
                resetForm();
                setFormKey(k => k + 1);
            } catch (err: any) {
                toast.error(err || "Error While Changing Password");
            }
        },
        3000
    );

    return (
        <div className="p-4 w-full h-[calc(100vh-90px)] flex flex-col">
            {/* Header Form Type */}
            <BackHeader
                title={`Change Password`}
                backPath="/"
            />
            {/* Center wrapper */}
            <div className="flex-1 flex justify-center items-center">
                <Formik
                    key={formKey}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={throttledSubmit}
                >
                    {({ submitForm, validateForm, setTouched }) => (
                        // Scrollable Form Content area
                        <Form className="w-full sm:w-1/2 overflow-auto scrollbar-hide pt-6 pb-3 px-8 bg-white rounded-2xl">

                            <FormikTextInputComponent
                                className="mb-4"
                                label="Old Password"
                                name="oldPassword"
                                placeholder="Enter Old Password"
                                required
                                withAsterisk
                                maxLength={51}
                            />

                            {/*New Password */}
                            <FormikTextInputComponent
                                className="mb-4"
                                label="New Password"
                                name="newPassword"
                                placeholder="Enter your New Password"
                                required
                                withAsterisk
                                maxLength={51}
                            />

                            <FormikTextInputComponent
                                className="mb-4"
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Re-Enter New Password"
                                required
                                withAsterisk
                                maxLength={51}
                            />

                            <div className="flex justify-end">
                                <ButtonComponent
                                    fullWidth={false}
                                    radius={6}
                                    borderColor="#fff"
                                    variant="filled"
                                    bgColor="#C30305"
                                    textColor="#FFFFFF"
                                    style={{ padding: "5px 10px" }}
                                    onClick={async () => {
                                        const errors = await validateForm(); // run validation
                                        if (Object.keys(errors).length === 0) {
                                            // ✅ valid → open confirm modal
                                            setIsConfirmOpen(true);
                                        } else {
                                            // ❌ invalid → show errors
                                            setTouched(
                                                Object.keys(errors).reduce(
                                                    (acc, key) => ({ ...acc, [key]: true }),
                                                    {}
                                                )
                                            );
                                        }
                                    }}>
                                    CHANGE
                                </ButtonComponent>
                            </div>

                            <PopupModal
                                opened={isConfirmOpen}
                                onClose={() => setIsConfirmOpen(false)}
                                size="sm"
                                padding="md"
                            >
                                <div className="flex flex-col gap-4">
                                    <TextComponent
                                        fontSize={18}
                                        fontWeight={600}
                                        align="center"
                                    >
                                        Confirm Password Change
                                    </TextComponent>
                                    <TextComponent fontSize={14} color="gray" align="center">
                                        Are you sure you want to Change Your Password?
                                    </TextComponent>

                                    <div className="flex justify-end gap-3 mt-4">
                                        <ButtonComponent
                                            variant="outline"
                                            bgColor="#f1f1f1"
                                            fontSize="14"
                                            radius={10}
                                            style={{ padding: "5px 10px" }}
                                            textColor="#333"
                                            onClick={() => setIsConfirmOpen(false)}
                                        >
                                            Cancel
                                        </ButtonComponent>
                                        <ButtonComponent
                                            bgColor="#C30305"
                                            textColor="#fff"
                                            fontSize="14"
                                            radius={10}
                                            style={{ padding: "5px 10px" }}
                                            onClick={() => {
                                                setIsConfirmOpen(false);
                                                submitForm(); // <-- call Formik submit programmatically
                                            }}
                                        >
                                            Confirm
                                        </ButtonComponent>
                                    </div>
                                </div>
                            </PopupModal>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
};

export default ChangePassword;
