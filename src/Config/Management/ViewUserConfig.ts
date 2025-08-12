import { API_ENDPOINTS } from "../Api/EndPoints";
import { GenericTableHeader } from "../../Utils/utils";

export const VIEW_USER_KEY = "view-user";
export const VIEW_USER_URL = API_ENDPOINTS.MANAGEMENT.VIEW_USER;

export interface ViewUserTableType {
  hierarchyId: string;
  mobileNumber: string;
  hierarchyCode: string;
  loginUserName: string;
  userLoginStatus: boolean;
  lastLoginDate?: string | null;
  lastLoginTime?: string | null;
  userStatus: string;
  emailId: string;
  createdDate: string;
  createdTime: string;
  createdBy: string;
  editedDate?: string;
  editedTime?: string;
  editedBy?: string;
  roleId?: string | null;
  isBlocked?: boolean | null;
  zipCode?: string | null;
  state?: string | null;
  city?: string | null;
}

export const ViewUserHeaders: GenericTableHeader<ViewUserTableType>[] = [
  { key: "hierarchyId", label: "Hierarchy ID", filterType: "text" },
  { key: "mobileNumber", label: "Mobile", filterType: "text" },
  { key: "hierarchyCode", label: "Hierarchy Code", filterType: "text" },
  { key: "loginUserName", label: "Login Username", filterType: "text" },
  { key: "userLoginStatus", label: "Login Status", filterType: "boolean" },
  { key: "lastLoginDate", label: "Last Login Date", filterType: "date" },
  { key: "lastLoginTime", label: "Last Login Time", filterType: "text" },
  { key: "userStatus", label: "Status", filterType: "text" },
  { key: "emailId", label: "Email", filterType: "text" },
  { key: "createdDate", label: "Created Date", filterType: "date" },
  { key: "createdTime", label: "Created Time", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedDate", label: "Edited Date", filterType: "date" },
  { key: "editedTime", label: "Edited Time", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "roleId", label: "Role ID", filterType: "text" },
  { key: "isBlocked", label: "Blocked", filterType: "boolean" },
  { key: "zipCode", label: "Zip Code", filterType: "text" },
  { key: "state", label: "State", filterType: "text" },
  { key: "city", label: "City", filterType: "text" },
];
