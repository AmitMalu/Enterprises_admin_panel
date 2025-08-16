import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { textField } from "../../Utils/ValidationUtils";

export const USER_MAPPING_KEY = "user-mapping";
export const USER_MAPPING_URL = API_ENDPOINTS.MANAGEMENT.USER_MAPPING;

export interface UserMappingFormType {
  mode: boolean;
  userType: string;
  userId: string[];
  parentUserType: string;
  parentId: string;
}

export const UserMappingInitialValues: UserMappingFormType = {
  mode: false,
  userType: "",
  userId: [],
  parentUserType: "",
  parentId: "",
};

export const validationSchema: Record<
  keyof UserMappingFormType,
  Yup.AnySchema
> = {
  mode: Yup.boolean().required("Mode is required"),

  userType: textField("User Type", 50, true, true),

  userId: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one user must be selected")
    .test(
      "single-mode-limit",
      "Only one user can be selected in Single mode",
      function (value) {
        const { mode } = this.parent;
        if (mode === false && value && value.length > 1) {
          return false;
        }
        return true;
      }
    ),

  parentUserType: textField("Parent User Type", 100, true, true),

  parentId: textField("Parent Id", 100, true, true),
};
