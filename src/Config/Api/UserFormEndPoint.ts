import { UserType } from "../UserCreationConfig/UserConfig";

export const USER_FORM_ENDPOINTS: Record<UserType, string> = {
  "im-admin": "api/admins/save",
  "enterprise": "api/enterprises",
  "white-label": "api/white-labels",
  "super-distributor": "api/super-distributors",
  "partner": "api/partners",
  "distributor": "api/distributors",
  "retailer": "api/retailers",
};