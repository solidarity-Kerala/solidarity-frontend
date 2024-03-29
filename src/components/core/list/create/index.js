import React, { useState, useEffect } from "react";
import FormInput from "../../input";
import { Footer, Form, Page, Overlay } from "./styles";
import { useTranslation } from "react-i18next";
import { CloseButton } from "../popup/styles";
import { GetIcon } from "../../../../icons";
import { useSelector } from "react-redux";
import { Header } from "../manage/styles";
import { updateCaloriDetails, updateDailyCaloric, updateHealthDetails } from "../../functions/health";
import { customValidations } from "../../../project/form/validation";
import Captcha from "../../captcha";
const CrudForm = (props) => {
  // Use the useTranslation hook from react-i18next to handle translations
  const { t } = useTranslation();

  // State to store the form input fields
  const [formState] = useState(props.formInput);

  // State to store the submit button's disabled status
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // State to store the form values
  const [formValues, setFormValues] = useState(props.formValues);

  //State to store Captcha Status Validations Status
  const [captchaStatus, setCaptchaStatus] = useState(false);

  // State to store the validation messages
  const [formErrors, setFormErrors] = useState(props.formErrors);
  const themeColors = useSelector((state) => state.themeColors);
  /**
   * fieldValidation is a callback function to validate a form field based on its properties
   *
   * @param {object} field - The field to be validated
   * @param {string} value - The value of the field
   *
   * @returns {number} flags - The number of validation errors for the field
   */
  const catchaValidation = (captchaStatus, useCaptcha) => {
    let flag = 0;
    let tempformError = "";
    if (captchaStatus === false && useCaptcha === true) {
      tempformError = t("required", { label: t("captcha") });
      flag += 1;
    }
    return { flag, tempformError };
  };

  const validation = (fields, udpatedValue, formErrors, agreement, useCheckbox, useCaptcha) => {
    const tempformErrors = { ...formErrors };
    let flags = 0;
    fields.forEach((item) => {
      if (item.name !== "_id") {
        if (item.type === "multiple") {
          item.forms.forEach((form, multipleIndex) => {
            form.forEach((inputs, index) => {
              const res = fieldValidation(inputs, typeof udpatedValue[item.name][multipleIndex][inputs.name] === "undefined" ? "" : udpatedValue[item.name][multipleIndex][inputs.name], null, udpatedValue);
              tempformErrors[item.name][multipleIndex][inputs.name] = res.tempformError;
              flags += res.flag; //?res.flag:0;
            });
          });
        } else if (item.validation === "greater") {
          const res = fieldValidation(item, typeof udpatedValue[item.name] === "undefined" ? "" : udpatedValue[item.name], typeof udpatedValue[item.reference] === "undefined" ? new Date() : udpatedValue[item.reference], udpatedValue);
          tempformErrors[item.name] = res.tempformError;
          flags += res.flag; //?res.flag:0;
        } else {
          const res = fieldValidation(item, typeof udpatedValue[item.name] === "undefined" ? "" : udpatedValue[item.name], null, udpatedValue);
          tempformErrors[item.name] = res.tempformError;
          flags += res.flag; //?res.flag:0;
        }
      }
    });

    const captchaRes = catchaValidation(agreement, useCaptcha);
    tempformErrors["captchaError"] = captchaRes.tempformError;
    flags += captchaRes.flag; //?res.flag:0;

    // const agreementRes = agreementValidation(agreement, useCheckbox);
    // tempformErrors["captchaError"] = agreementRes.tempformError;
    // flags += agreementRes.flag; //?res.flag:0;

    setFormErrors(tempformErrors);
    setSubmitDisabled(flags > 0 ? true : false);
    if (flags === 0) {
      return true;
    } else {
      return false;
    }
  };

  const fieldValidation = (field, value, ref = new Date(), udpatedValue = {}) => {
    let flag = 0;
    let tempformError = "";

    if (!field.update && props.formType === "put") {
      return { flag, tempformError };
    }
    if (!field.add && props.formType === "post") {
      return { flag, tempformError };
    }

    if (!field.required && value.length === 0) {
      return { flag, tempformError };
    }
    if (field.condition) {
      if (udpatedValue[field.condition.item] === field.condition.if) {
        if (field.condition.then === "disabled") {
          return { flag, tempformError };
        }
      } else {
        if (field.condition.else === "disabled") {
          return { flag, tempformError };
        }
      }
    }
    switch (field.validation) {
      case "email":
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "number":
        const numberRegex = /^\d+$/;
        console.log("Numebr", !numberRegex.test(value), isNaN(value), value === null, typeof value === "undefined");
        if (!numberRegex.test(value) || isNaN(value) || value === null || typeof value === "undefined") {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "cvv":
        if (!/^[0-9]{3}$/.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        } // German credit cards typically have a 3-digit CVV
        break;
      case "ccn":
        if (!/^[0-9]{16}$/.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
          let digit = parseInt(value[i]);
          if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
        }
        if (sum % 10 !== 0) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "expiry":
        if (!validateExpiry(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "fileNumber":
        const fileNumber = /[A-Z0-9-]/;
        if (!fileNumber.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "licensePlate":
        const german = /^[A-Z]{3}[ -]?[A-Z0-9]{2}[ -]?[A-Z0-9]{3,5}$/i;
        if (!german.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "greater":
        const referedDate = new Date(ref);
        if (new Date(value) < referedDate) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "amount":
        const amount = /^\d+([.,]\d{1,2})?$/;
        if (!amount.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "datetime":
      case "time":
        const date = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!date.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "password":
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Explanation of the regex:
        // - At least one uppercase letter (A-Z)
        // - At least one lowercase letter (a-z)
        // - At least one digit (0-9)
        // - At least one special character (@, $, !, %, *, ?, &)
        // - Minimum length of 8 characters

        if (!passwordRegex.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "text":
        break;
      default:
        break;
    }
    const customStatus = customValidations(field, tempformError, value, flag, t);
    tempformError = customStatus.tempformError;
    flag = customStatus.flag;

    if ((field.type === "image" || field.type === "file") && props.formType === "post") {
      if (value.length === 0) {
        tempformError = t("validContent", { label: t(field.label) });
        flag += 1;
      }
    } else if ((field.type === "image" || field.type === "file") && props.formType === "put") {
      return { flag, tempformError };
    } else {
      if (field.required && value.length === 0) {
        tempformError = t("required", { label: t(field.label) });
        flag += 1;
      } else if (field.minimum > value.length) {
        tempformError = t("requiredMinimum", {
          minimum: field.minimum,
          label: t(field.label),
        });

        flag += 1;
      } else if (field.maximum < value.length) {
        tempformError = t("maxLimit", {
          maximum: field.maximum,
          label: t(field.label),
        });
        flag += 1;
      }
    }
    return { flag, tempformError };
  };
  function validateExpiry(expiry) {
    let month = parseInt(expiry.substring(0, 2));
    let year = parseInt("20" + expiry.substring(3));
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1; // JavaScript months are 0-11
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false; // Expiry date is in the past
    }
    if (month < 1 || month > 12) {
      return false; // Invalid month
    }
    return true;
  }

  useEffect(() => {}, [formState]);

  // const agreementValidation = (agreement, useCheckbox) => {
  //   let flag = 0;
  //   let tempformError = "";
  //   if (agreement !== true && useCheckbox === true) {
  //     tempformError = t("required", { label: t("agreement") });
  //     flag += 1;
  //   }
  //   return { flag, tempformError };
  // };

  const handleChange = (event, id, type = "text", sub = null) => {
    // Getting current field
    const field = formState[id];
    if (sub === null) {
      let value = "";
      if (type === "checkbox" || type === "htmleditor") {
        value = event;
      } else if (type === "select") {
        value = event.id;
        if ((field.arrayOut ?? false) === true && type !== "multiSelect") {
          formValues[field.name + "Array"] = event;
        }
      } else if (type === "multiSelect") {
        if ((field.arrayOut ?? false) === true) {
          let items = formValues[field.name + "Array"];
          if (!items) {
            items = [];
          }
          const index = items.findIndex((item) => item.id === event.id);

          if (index === -1) {
            // If event._id doesn't exist, push it to the items array
            items.push(event);
          } else {
            // If event._id already exists, remove it from the items array
            items.splice(index, 1);
          }
          formValues[field.name + "Array"] = items;
        }
        const items = formValues[field.name];
        const index = items.findIndex((item) => item === event.id);

        if (index === -1) {
          // If event._id doesn't exist, push it to the items array
          items.push(event.id);
        } else {
          // If event._id already exists, remove it from the items array
          items.splice(index, 1);
        }

        value = items;
      } else if (type === "email" || type === "text" || type === "number" || type === "password") {
        value = event.target.value;
      } else if (type === "search") {
        value = JSON.stringify(event);
      } else if (type === "image" || type === "file") {
        value = event.target.files;
      } else if (type === "datetime" || type === "time") {
        value = event.toISOString();
      } else if (type === "date") {
        value = event.toISOString();
      } else if (type === "textarea") {
        value = event;
      } else {
        value = event.target.getAttribute("value");
      }

      let udpateValue = {
        ...formValues,
        [field.name]: value,
      };
      if (["gender", "presentWeight", "userActivenessStatus", "dateOfBirth", "height", "age", "wrist", "waist", "hip", "forearm"].includes(field.name)) {
        updateHealthDetails(udpateValue);
      }
      if (["calories"].includes(field.name)) {
        updateCaloriDetails(udpateValue);
      }

      if (["proposedCalorie"].includes(field.name)) {
        updateDailyCaloric(udpateValue);
      }
      if (type === "select") {
        if (field.updateFields) {
          field.updateFields?.forEach((element) => {
            udpateValue[element.id] = element.collection ? event[element.collection]?.[element.value] : event[element.value];
          });
        }
      }
      if (typeof field.onChange === "function") {
        udpateValue = field.onChange(field.name, udpateValue);
        console.log(udpateValue);
      }
      // Creating an updated field
      // updating the formm values
      setFormValues(udpateValue);

      // Validating the fields
      if (validation(formState, udpateValue, formErrors, captchaStatus, props.useCheckbox, props.useCaptcha)) {
        // Here we can write any state updation
      }
    } else {
      const main = formState[sub.index];
      const field = main.forms[sub.multipleIndex][id];
      const udpateValue = { ...formValues };
      udpateValue[main.name][sub.multipleIndex][field.name] = event.target.value;

      setFormValues(udpateValue);
      // Validating the fields
      if (validation(formState, udpateValue, formErrors)) {
        // Here we can write any state updation
      }
    }
  };
  const setCaptchaStatusHandler = (status) => {
    setCaptchaStatus(status);
    validation(formState, formValues, formErrors, status, props.useCheckbox, props.useCaptcha);
  };
  const submitChange = (event) => {
    event.preventDefault();
    if (validation(formState, formValues, formErrors, captchaStatus, props.useCheckbox, props.useCaptcha)) {
      props.submitHandler(formValues, formState);
    }
  };
  const closeModal = () => {
    props.isOpenHandler(false);
  };
  return (
    <Overlay key={props.referenceId} className={props.css ?? ""}>
      <Page className={`${props.css ?? ""} ${props.formMode ?? "single"}`}>
        <Header className="form">
          <span dangerouslySetInnerHTML={{ __html: props.header ? props.header : "Login" }}></span>
          {(props.css ?? "") === "" && (
            <CloseButton theme={themeColors} onClick={closeModal}>
              <GetIcon icon={"Close"} />
            </CloseButton>
          )}
        </Header>
        <Form className={props.formMode ?? "single"}>
          {formState?.length > 0 &&
            formState.map((item, index) => {
              let dynamicClass = "";
              if (item.condition) {
                if (formValues[item.condition.item] === item.condition.if) {
                  dynamicClass = item.condition.then;
                } else {
                  dynamicClass = item.condition.else;
                }
              }
              let updateValue = {};
              if (item.type === "select" || item.type === "multiSelect") {
                if (Array.isArray(item.updateOn)) {
                  updateValue = {};
                  item.updateOn?.forEach((itemName) => {
                    updateValue[itemName] = formValues[itemName];
                  });
                } else {
                  updateValue = { [item.updateOn]: formValues[item.updateOn] };
                }
              }
              const params = [...(item.params ?? []), props.referenceId ? { name: [props.parentReference], value: props.referenceId } : {}];
              if ((props.formType === "put" && item.update) || (props.formType === "post" && item.add)) {
                return <FormInput dynamicClass={dynamicClass} formValues={formValues} updateValue={updateValue} placeholder={item.placeHolder} key={`input` + index} id={index} error={formErrors[formState[index].name]} value={formValues[formState[index].name]} {...item} params={params} onChange={handleChange} />;
              } else {
                return null;
              }
            })}
          {props.useCaptcha === true && <Captcha error={formErrors["captchaError"]} label={t("captcha")} key="1" setCaptchaStatus={setCaptchaStatusHandler}></Captcha>}
        </Form>

        <Footer>
          {(props.css ?? "") === "" && <FormInput type="close" value={"Cancel"} onChange={closeModal} />}
          <FormInput disabled={submitDisabled} type="submit" name="submit" value={props.button ? props.button : "Submit"} onChange={submitChange} />
        </Footer>
      </Page>
    </Overlay>
  );
};

export default CrudForm;
