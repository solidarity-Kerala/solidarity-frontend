export const customValidations = (field, tempformError, value, flag, t) => {
  switch (field.validation) {
    //sample funtion
    case "email1":
      console.log(field.validation);
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!regex.test(value)) {
        tempformError = "Please provide a valid email Id";
        flag += 1;
      }
      break;
    case "numeric":
      if ((field.numericLength ?? 0) === 0) {
        // If lengthCount is 0, any number is allowed
        const numericRegex = /^\d+$/;
        if (!numericRegex.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
      } else if (field.numericLength > 0) {
        // If numericLength is greater than 0, the number must have that specific length
        const numericRegex = new RegExp(`^\\d{${field.numericLength}}$`);
        if (!numericRegex.test(value)) {
          tempformError = `Please enter a number that ${field.numericLength} length`;
          flag += 1;
        }
      }
      break;
    default:
      break;
  }
  return { flag, tempformError };
};
