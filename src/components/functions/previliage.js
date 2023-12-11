export const checkprivilege = (roles, userType) => {
  return [roles].some((item) => item === userType);
};

export const privileges = {
  admin: "6459f25d7f6e9664fbd7486f",
  doctor: "6459f25d7f6e9664fbd7486f",
};
