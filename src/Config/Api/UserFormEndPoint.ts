import { UserType } from "../UserCreationConfig/UserConfig";

export const USER_FORM_ENDPOINTS: Record<UserType, string> = {
  "im-admin": "api/admins",
  "enterprise": "api/enterprises/save",
  "white-label": "api/white-labels/save",
  "super-distributor": "api/super-distributors",
  "partner": "api/partners",
  "distributor": "api/distributors",
  "retailer": "api/retailers",
};