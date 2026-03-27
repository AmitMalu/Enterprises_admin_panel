import { UserType } from "../../../Config/UserCreationConfig/UserConfig";

export type CreateUserPayload = {
  userType: UserType; // e.g., "distributor", "retailer", etc.
  data: any; // The form data being submitted
};

export type UpdateUserPayload = {
  userType: UserType; // e.g., "distributor", "retailer", etc.
  payload: any; // The form data being submitted
  id: string;
};
