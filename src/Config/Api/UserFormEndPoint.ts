import { UserType } from "../UserCreationConfig/UserConfig";

export const USER_FORM_ENDPOINTS: Record<UserType, string> = {
  "im-admin": "api/im-admins",
  "distributor": "api/distributors",
  "white-label": "api/white-labels",
  "partner": "api/partners",
  "super-distributor": "api/super-distributors",
  "retailer": "api/retailers",
  "enterprise": "api/enterprises",
};