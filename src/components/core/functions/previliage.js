import { projectSettings } from "../../project/brand/project";

export const checkprivilege = (roles, userType) => {
  return [roles].some((item) => item === userType);
};

export const privileges = projectSettings.privileges;
