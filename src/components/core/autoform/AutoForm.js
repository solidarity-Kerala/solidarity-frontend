import { useEffect, useState } from "react";
import CrudForm from "../list/create";
import moment from "moment";

const AutoForm = ({ header, api, formType = "post", formMode, formInput: tempFormInput, formValues: tempFormValues, submitHandler, isOpenHandler, isCreating, useCaptcha, css = "" }) => {
  const [formValues, setFormValues] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [formInput] = useState(tempFormInput);
  useEffect(() => {
    // Form default value is validating using Use Effect
    const formVal = {};
    const tempFormErrors = {};
    let date = new Date();
    tempFormInput.forEach((item) => {
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
        if (item.defaultArray) {
          formVal[item.name + "Array"] = item.defaultArray;
        }
      } else if (item.type === "select") {
        formVal[item.name] = item.default?.toString()?.length > 0 ? item.default : "";
        if (item.defaultArray) {
          formVal[item.name + "Array"] = item.defaultArray;
        }
      } else if (item.type === "date") {
        formVal[item.name] = item.default === "empty" ? "" : moment(item.default).isValid() ? moment(item.default).toISOString() : date.toISOString();
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
    console.log("formVal1", formVal);
    if (tempFormValues) {
      Object.keys(formVal).forEach((key) => {
        if (tempFormValues[key]) {
          formVal[key] = tempFormValues[key] ?? formVal[key];
        }
      });
    }
    console.log("formVal2", formVal);
    setFormValues(formVal);
    setFormErrors(tempFormErrors);
    // validation(props.formInput, formVal);
  }, [tempFormInput, tempFormValues]);
  return formInput?.length > 0 && Object.keys(formValues).length > 0 && formErrors && <CrudForm api={api} formMode={formMode} formType={formType} header={header} formInput={formInput} formValues={formValues} formErrors={formErrors} submitHandler={submitHandler} isOpenHandler={isOpenHandler} useCaptcha={useCaptcha} isOpen={isCreating} css={css}></CrudForm>;
};
export default AutoForm;
