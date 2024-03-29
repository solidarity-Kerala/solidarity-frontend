import React, { useState, useEffect } from "react";
import FormInput from "../input";
import { useTranslation } from "react-i18next";
import { ButtonContanter, Description, Footer, Form, Header, Overlay, Page, Plus } from "./styles";
import Captcha from "../captcha";
import { CloseIcon } from "../../../icons";

/**
 * AutoForm is a generic form component that takes the form input fields and form values as a prop and returns the updated form values on submit.
 *
 * @param {object} props - The props passed to the component
 * @param {array} props.formInput - An array of form input fields
 * @param {object} props.formValues - An object with initial values of the form fields
 * @param {string} props.formType - The type of form, either 'post' or 'put'
 *
 * @returns {JSX.Element} - A form component with the specified form input fields and values
 */
const AutoForm = (props) => {
  // Use the useTranslation hook from react-i18next to handle translations
  const { t } = useTranslation();

  // State to store the form input fields
  const [formState, setFormState] = useState(props.formInput);

  // State to store the submit button's disabled status
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // State to store the form values
  const [formValues, setFormValues] = useState(null);

  // State to store the validation messages
  const [formErrors, setFormErrors] = useState(null);

  //State to store Captcha Status Validations Status
  const [captchaStatus, setCaptchaStatus] = useState(false);

  //State to store Captcha Status Validations Status
  const [agreementStatus, setAgreementStatus] = useState(false);
  /**
   * fieldValidation is a callback function to validate a form field based on its properties
   *
   * @param {object} field - The field to be validated
   * @param {string} value - The value of the field
   *
   * @returns {number} flags - The number of validation errors for the field
   */

  useEffect(() => {
    // Form default value is validating using Use Effect
    const formVal = {};
    const tempFormErrors = {};
    let date = new Date();
    props.formInput.forEach((item) => {
      tempFormErrors[item.name] = "";
      if (item.type === "checkbox") {
        let bool = JSON.parse("false");
        formVal[item.name] = bool;
      } else if (item.type === "datetime" || item.type === "time") {
        item.default ? (date = new Date(item.default)) : (date = new Date());
        formVal[item.name] = date.toISOString();
      } else if (item.type === "image" || item.type === "file") {
        formVal[item.name] = [];
      } else if (item.type === "multiSelect") {
        formVal[item.name] = item.default?.length > 0 ? item.default : [];
      } else if (item.type === "select") {
        formVal[item.name] = item.default?.toString()?.length > 0 ? item.default : "";
        console.log("select", item.name, formVal[item.name]);
      } else if (item.type === "date") {
        item.default ? (date = new Date(item.default)) : (date = new Date());
        formVal[item.name] = date.toISOString();
      } else if (item.type === "multiple") {
        formVal[item.name] = [];
        tempFormErrors[item.name] = [];
        item.forms.forEach((multiple) => {
          formVal[item.name].push(
            multiple.reduce((acc, item) => {
              return { ...acc, [item.name]: "" };
            }, {})
          );
          tempFormErrors[item.name].push(
            multiple.reduce((acc, item) => {
              return { ...acc, [item.name]: "" };
            }, {})
          );
        });
      } else {
        formVal[item.name] = item.default;
        if (item.type === "select") {
          formVal[item.name] = "";
        }
      }
    });
    tempFormErrors["captchaError"] = "";
    tempFormErrors["agreementAccept"] = "";
    if (props.formValues) {
      Object.keys(formVal).forEach((key) => {
        if (props.formValues[key]) {
          formVal[key] = props.formValues[key];
        }
      });
    }
    console.log(formVal);
    setFormValues(formVal);
    setFormErrors(tempFormErrors);
    // validation(props.formInput, formVal);
  }, [props.formInput, props.formValues]);

  const validation = (fields, udpatedValue, formErrors, captchaStatus, useCaptcha, agreement, useCheckbox) => {
    const tempformErrors = { ...formErrors };
    let flags = 0;
    fields.forEach((item) => {
      if (item.name !== "_id") {
        if (item.type === "multiple") {
          item.forms.forEach((form, multipleIndex) => {
            form.forEach((inputs, index) => {
              const res = fieldValidation(inputs, typeof udpatedValue[item.name][multipleIndex][inputs.name] === "undefined" ? "" : udpatedValue[item.name][multipleIndex][inputs.name], udpatedValue);
              tempformErrors[item.name][multipleIndex][inputs.name] = res.tempformError;
              flags += res.flag; //?res.flag:0;
            });
          });
        } else {
          const res = fieldValidation(item, typeof udpatedValue[item.name] === "undefined" ? "" : udpatedValue[item.name], udpatedValue);
          tempformErrors[item.name] = res.tempformError;
          flags += res.flag; //?res.flag:0;
        }
      }
    });
    const captchaRes = catchaValidation(captchaStatus, useCaptcha);
    tempformErrors["captchaError"] = captchaRes.tempformError;
    flags += captchaRes.flag; //?res.flag:0;

    const agreementRes = agreementValidation(agreement, useCheckbox);
    tempformErrors["captchaError"] = agreementRes.tempformError;
    flags += agreementRes.flag; //?res.flag:0;

    setFormErrors(tempformErrors);
    setSubmitDisabled(flags > 0 ? true : false);
    if (flags === 0) {
      return true;
    } else {
      return false;
    }
  };

  const fieldValidation = (field, value, udpatedValue) => {
    let flag = 0;
    let tempformError = "";

    if (!field.update && props.formType === "put") {
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
      case "fileNumber":
        const fileNumber = /[A-Z0-9-]/;
        if (!fileNumber.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "licensePlate":
        const german = /^[A-Z]{3}[ -]?[A-Z0-9]{2}[ -]?[A-Z0-9]{3,6}$/i;
        if (!german.test(value)) {
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
        const date = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
        if (!date.test(value)) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
        break;
      case "text":
        break;
      default:
        break;
    }
    if (field.type === "date" || field.type === "datetime") {
      if (field.greater) {
        const fieldValue = new Date(udpatedValue[field.greater]);
        const currentValue = new Date(value);

        // // Set time of date to 00:00
        // fieldValue.setHours(0, 0, 0, 0);
        // currentValue.setHours(0, 0, 0, 0);

        // const differenceInTime = currentValue.getTime() - fieldValue.getTime();
        // const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        // if (differenceInDays < 1) {
        //   tempformError = t("validContent", { label: t(field.label) });
        //   flag += 1;
        // }
        if (fieldValue > currentValue) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
      }

      if (field.less) {
        const fieldValue = new Date(udpatedValue[field.less]);
        const currentValue = new Date(value);
        // const differenceInDays = Math.floor((fieldValue - currentValue) / (1000 * 60 * 60 * 24));
        // if (differenceInDays <= 1) {
        //   tempformError = t("validContent", { label: t(field.label) });
        //   flag += 1;
        // }
        if (fieldValue < currentValue) {
          tempformError = t("validContent", { label: t(field.label) });
          flag += 1;
        }
      }
    }
    if (field.type === "image" || field.type === "file") {
      if (value.length === 0) {
        tempformError = t("validContent", { label: t(field.label) });
        flag += 1;
      }
    } else {
      if (field.required && value?.length === 0) {
        tempformError = t("required", { label: t(field.label) });
        flag += 1;
      } else if (field.minimum > value?.length) {
        tempformError = t("requiredMinimum", { minimum: field.minimum, label: t(field.label) });

        flag += 1;
      } else if (field.maximum < value?.length) {
        tempformError = t("maxLimit", { maximum: field.maximum, label: t(field.label) });

        flag += 1;
      }
    }

    return { flag, tempformError };
  };
  useEffect(() => {}, [formState]);

  const catchaValidation = (captchaStatus, useCaptcha) => {
    let flag = 0;
    let tempformError = "";
    if (captchaStatus === false && useCaptcha === true) {
      tempformError = t("required", { label: t("captcha") });
      flag += 1;
    }
    return { flag, tempformError };
  };
  const agreementValidation = (agreement, useCheckbox) => {
    let flag = 0;
    let tempformError = "";
    if (agreement !== true && useCheckbox === true) {
      tempformError = t("required", { label: t("agreement") });
      flag += 1;
    }
    return { flag, tempformError };
  };

  const handleChange = (event, id, type = "text", sub = null, data = {}) => {
    // Getting current field
    let additionalValues = {};
    const field = formState[id];
    if (sub === null) {
      let value = "";
      if (type === "checkbox") {
        value = event;
      } else if (type === "select") {
        if (field.updateCondition) {
          field.updateCondition.forEach((element) => {
            additionalValues[element.item] = data[element.value] ?? "";
          });
        }
        value = event.id;
      } else if (type === "multiSelect") {
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
      } else if (type === "image" || type === "file") {
        value = event.target.files;
      } else if (type === "datetime" || type === "time") {
        value = event.toISOString();
      } else if (type === "date") {
        value = event.toISOString();
      } else if (field.validation === "licensePlate") {
        value = event.target.value
          .toString()
          .toUpperCase()
          .replace(/[^a-zA-Z0-9ÄÖÜß\- ]/g, "");
      } else {
        value = event.target.value;
      }

      const udpateValue = {
        ...formValues,
        ...additionalValues,
        [field.name]: value,
      };
      console.log(udpateValue);
      // console.log("additionalValues", udpateValue);
      // Creating an updated field
      // updating the formm values

      console.log(udpateValue);
      setFormValues(udpateValue);

      // Validating the fields
      if (validation(formState, udpateValue, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox)) {
        // Here we can write any state updation
      }
    } else {
      const main = formState[sub.index];
      const field = main.forms[sub.multipleIndex][id];
      const udpateValue = { ...formValues };
      udpateValue[main.name][sub.multipleIndex][field.name] = event.target.value;
      setFormValues(udpateValue);
      // Validating the fields
      if (validation(formState, udpateValue, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox)) {
        // Here we can write any state updation
      }
    }
  };

  const submitChange = (event) => {
    event.preventDefault();
    if (props.setMessage) {
      props.setMessage({
        type: 2,
        content: t("sure"),
        proceed: "Save",
        onProceed: () => {
          console.log("button triggered");
          doSubmit();
        },
      });
    } else {
      if (validation(formState, formValues, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox)) {
        props.submitHandler(formValues, formState);
      }
    }
  };
  const doSubmit = (p1, p2) => {
    console.log("yes");
    if (validation(formState, formValues, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox)) {
      props.submitHandler(formValues, formState);
    }
  };
  const addToMultiple = (index) => {
    const tempFrom = formState;
    const tempValues = { ...formValues };
    const tempErrors = { ...formErrors };
    tempFrom[index].forms.push(tempFrom[index].forms[0]);
    const newValues = { ...tempValues[tempFrom[index].name][0] };
    for (const [key] of Object.entries(newValues)) {
      newValues[key] = "";
    }
    tempErrors[tempFrom[index].name].push({ ...newValues });
    tempValues[tempFrom[index].name].push({ ...newValues });
    setFormValues(tempValues);
    setFormErrors(tempErrors);
    setFormState(tempFrom);
    validation(formState, formValues, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox);
  };
  const removeFromMultiple = (index, subIndex) => {
    const tempFrom = formState;
    const tempValues = { ...formValues };
    const tempErrors = { ...formErrors };
    tempFrom[index].forms.splice(subIndex, 1);
    tempValues[tempFrom[index].name].splice(subIndex, 1);
    tempErrors[tempFrom[index].name].splice(subIndex, 1);
    setFormValues(tempValues);
    setFormErrors(tempErrors);
    setFormState(tempFrom);
    validation(formState, formValues, formErrors, captchaStatus, props.useCaptcha, agreementStatus, props.useCheckbox);
  };
  // const [modalIsOpen] = useState(props.isCreating);
  const setCaptchaStatusHandler = (status) => {
    setCaptchaStatus(status);
    validation(formState, formValues, formErrors, status, props.useCaptcha, agreementStatus, props.useCheckbox);
  };
  const setAgreementStatusHandler = (status) => {
    setAgreementStatus(status);
    validation(formState, formValues, formErrors, captchaStatus, props.useCaptcha, status, props.useCheckbox);
  };
  const closeModal = () => {
    props.isOpenHandler(false);
  };
  return (
    <Overlay className={props.plainForm ? "plain" : "popup"}>
      <Page className={`${props.plainForm ? "plain" : "popup"} ${props.customClass ? props.customClass : ""}`}>
        {/* when the props have the value of header then form will add the header as props.header*/}
        {props.header ? <Header className={props.plainForm ? "plain" : "popup"}>{props.header} </Header> : ""}
        {props.description && <Description dangerouslySetInnerHTML={{ __html: props.description }} />}
        {formValues && (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              alert("yes");
            }}
            action="#"
            method="POST"
            className={`${props.css ?? ""}  ${props.plainForm ? "plain" : "popup"}`}
          >
            {/* Looping the form input array for generating the dynamic form*/}
            {formState &&
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
                return (props.formType === "put" && item.update) || props.formType === "post" ? (
                  item.type === "multiple" && item.forms ? (
                    <React.Fragment key={`input` + index}>
                      {item.forms.map((multiple, multipleIndex) => (
                        <Form key={`input` + multipleIndex} className={`${props.css ?? ""} ${props.plainForm ? "plain sub" : "popup sub"}`}>
                          {multiple.map((subItem, childIndex) => {
                            return <FormInput animation={`sub`} placeholder={subItem.placeHolder} key={`input` + childIndex} sub={{ index, multipleIndex }} id={childIndex} error={formErrors[formState[index].name][multipleIndex][subItem.name]} value={formValues[formState[index].name][multipleIndex][subItem.name]} {...subItem} onChange={handleChange} />;
                          })}
                          {multipleIndex > 0 && (
                            <ButtonContanter className="close">
                              <button onClick={() => removeFromMultiple(index, multipleIndex)}>
                                <Plus>
                                  <CloseIcon></CloseIcon>
                                </Plus>
                              </button>
                            </ButtonContanter>
                          )}
                        </Form>
                      ))}
                      {item.forms.length < item.maximum && (
                        <ButtonContanter>
                          <button onClick={() => addToMultiple(index)}>
                            <Plus>+</Plus>
                            {t("Add New Payment Request")}
                          </button>
                        </ButtonContanter>
                      )}
                    </React.Fragment>
                  ) : (
                    <FormInput dynamicClass={dynamicClass} animation={`sub-1`} updateValue={updateValue} placeholder={item.placeHolder} key={`input` + index} id={index} error={formErrors[formState[index].name]} value={formValues[formState[index].name]} {...item} onChange={handleChange} />
                  )
                ) : (
                  ""
                );
              })}
            {/* This Error Message Component will show the eroror while the state of validationMessage is updated! */}
            {/* {submitDisabled && <ErrorMessage>{t("mandatory")}</ErrorMessage>} */}
            {props.useCaptcha === true && <Captcha error={formErrors["captchaError"]} label={t("captcha")} key="1" setCaptchaStatus={setCaptchaStatusHandler}></Captcha>}
            {props.enterSubmit === true && (
              <div style={{ display: "none" }}>
                <FormInput disabled={submitDisabled} type="submit" name="submit" value={t(props.button ? props.button : "submit")} onChange={submitChange} />
              </div>
            )}
            {props.useCheckbox === true && <FormInput type="checkbox" placeholder={`acceptAgreement`} key={`acceptAgreement`} id={1} value={agreementStatus} onChange={setAgreementStatusHandler} />}
          </Form>
        )}

        <Footer className={props.buttonStyle ? props.buttonStyle : "center"}>
          {/* In footer we are setting the buttons for save and cancel the form if the form is plain mode then the cancel button will not be there in the form, the cancel button will be avaible only in form popup once the cancel button in the form is triggered the then form will be closed. */}
          {!props.plainForm && <FormInput type="close" value={t("cancel")} onChange={closeModal} />}
          <FormInput disabled={submitDisabled} type="submit" name="submit" value={t(props.button ? props.button : "submit")} onChange={submitChange} />
        </Footer>
      </Page>
    </Overlay>
  );
};

export default AutoForm;
