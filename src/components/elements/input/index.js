import React, { useRef } from "react";
import CustomSelect from "../select";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, DatetimeInput, FileContainer, Info, Input, InputContainer, Label, SubHead, TextArea } from "./styles";
import { ErrorMessage } from "../form/styles";
import { GetIcon, TickIcon, UploadIcon } from "../../../icons";
import Checkbox from "../checkbox";
import MultiSelect from "../multiSelect";
import EditorNew from "../editor";
import moment from "moment";

function FormInput(props) {
  // Initialize translation function for current language
  const { t } = useTranslation();
  // Create a reference to file input element
  const fileInputRef = useRef(null);
  // Get theme colors from Redux store
  const themeColors = useSelector((state) => state.themeColors);

  switch (props.type) {
    // Render a regular text input
    case "text":
    case "password":
    case "email":
      return (
        <InputContainer className={`${props.dynamicClass ?? ""}`} animation={props.animation}>
          {props.error?.length ? (
            <Label theme={themeColors} className={`${!props.value.toString().length > 0 ? "error shrink" : "error"}`}>
              {props.error}
            </Label>
          ) : (
            <Label theme={themeColors} className={`${!props.value.toString().length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          )}
          <Input disabled={props.disabled ?? false} autoComplete="on" theme={themeColors} className={`input ${props.value.toString().length > 0 ? "shrink" : ""}`} placeholder={`${t(props.placeholder)}${props.required ? " *" : ""}`} type={props.type} value={props.value} onChange={(event) => props.onChange(event, props.id, props.type, props.sub)} />
          {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
        </InputContainer>
      );
    case "number":
      return (
        <InputContainer className={`${props.dynamicClass ?? ""}`} animation={props.animation}>
          {props.error?.length ? (
            <Label theme={themeColors} className={`${!props.value.toString().length > 0 ? "error shrink" : "error"}`}>
              {props.error}
            </Label>
          ) : (
            <Label theme={themeColors} className={`${!props.value.toString().length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          )}
          <Input min={0} disabled={props.disabled ?? false} autoComplete="on" theme={themeColors} className={`input ${props.value.toString().length > 0 ? "shrink" : ""}`} placeholder={`${t(props.placeholder)}${props.required ? " *" : ""}`} type={props.type} value={props.value} onChange={(event) => props.onChange(event, props.id, props.type, props.sub)} />
          {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
        </InputContainer>
      );
    // Render a time input with time picker
    case "time":
      let userFriendlyTime = new Date(props.value);
      return (
        <InputContainer className={`${props.dynamicClass ?? ""}`}>
          <DatetimeInput theme={themeColors} showTimeSelect showTimeSelectOnly timeIntervals={15} timeCaption="Time" selected={userFriendlyTime} dateFormat="h:mm aa" className={`input ${props.value.length > 0 ? "shrink" : ""}`} placeholder={t(props.placeholder)} type={props.type} onChange={(event) => props.onChange(event, props.id, props.type)} />
          <Label theme={themeColors} className={`${!props.value.length > 0 ? "shrink" : ""}`}>
            {t(props.label)}
          </Label>
          {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
        </InputContainer>
      );
    // Render a date input with date picker
    case "date":
      let userFriendlyDate = props.value.length > 0 ? new Date(props.value) : null;
      return (
        <InputContainer className={`${props.dynamicClass ?? ""}`}>
          <DatetimeInput showYearDropdown yearDropdownItemNumber={70} minDate={props.minDate ?? moment().toDate()} maxDate={props.maxDate ?? moment().add(1, "year").toDate()} dateFormat={"yyyy-MM-dd"} theme={themeColors} className={`input ${props.value.length > 0 ? "shrink" : ""}`} placeholderText={`${t(props.label)}${props.required ? " *" : ""}`} type={props.type} value={userFriendlyDate} selected={userFriendlyDate} onChange={(event) => props.onChange(event, props.id, props.type)} />
          {props.error?.length ? (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "error shrink" : "error"}`}>
              {props.error}
            </Label>
          ) : (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          )}
          {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
        </InputContainer>
      );
    // Render a datetime input with date and time pickers
    case "datetime":
      let userFriendlyDateTime = props.value.length > 0 ? new Date(props.value) : null;

      return (
        <InputContainer className={`${props.dynamicClass ?? ""}`}>
          <DatetimeInput showYearDropdown yearDropdownItemNumber={70} minDate={props.minDate ?? moment().toDate()} maxDate={props.maxDate ?? moment().add(1, "year").toDate()} theme={themeColors} showTimeSelect timeIntervals={1} className={`input ${props.value.length > 0 ? "shrink" : ""}`} placeholderText={`${t(props.label)}${props.required ? " *" : ""}`} type={props.type} value={userFriendlyDateTime} selected={userFriendlyDateTime} dateFormat={"yyyy-MM-dd hh:mm a"} onChange={(event) => props.onChange(event, props.id, props.type)} />
          {props.error?.length ? (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "error shrink" : "error"}`}>
              {props.error}
            </Label>
          ) : (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          )}
          {props.error?.length > 0 && <ErrorMessage dangerouslySetInnerHTML={{ __html: props.error }}></ErrorMessage>}
        </InputContainer>
      );
    // Render a file and image
    case "image":
    case "file":
      function formatSize(sizeInBytes) {
        if (sizeInBytes < 1024) {
          return sizeInBytes + " bytes";
        } else if (sizeInBytes < 1024 * 1024) {
          return (sizeInBytes / 1024).toFixed(2) + " KB";
        } else {
          return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
        }
      }
      const size = formatSize(props.value[0] ? props.value[0].size : 0);
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };
      return (
        <FileContainer className={`${props.dynamicClass ?? ""}`} theme={themeColors}>
          <button onClick={handleButtonClick}>
            <UploadIcon />
            {t("upload", { label: t(props.label) }) + (props.required ? " *" : "") + (props.value.length > 0 ? ` : ${props.value[0].name} (${size})` : "")}
          </button>
          <Input ref={fileInputRef} style={{ display: "none" }} theme={themeColors} accept={props.type === "image" ? `image/*` : ``} className={`input ${props.value.length > 0 ? "shrink" : ""}`} placeholder={t(props.placeholder)} type={`file`} onChange={(event) => props.onChange(event, props.id, props.type)} />
          {props.error?.length > 0 && <ErrorMessage className="image" dangerouslySetInnerHTML={{ __html: props.error }} />}
        </FileContainer>
      );
    // Render a textarea
    case "textarea":
      return (
        <InputContainer className={`textarea ${props.dynamicClass ?? ""}`}>
          {props.error?.length ? (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "error shrink" : "error"}`}>
              {props.error}
            </Label>
          ) : (
            <Label theme={themeColors} className={`${!props.value.length > 0 ? "shrink" : ""}`}>
              <TickIcon />
              {`${t(props.label)}${props.required ? " *" : ""}`}
            </Label>
          )}
          <TextArea theme={themeColors} className={`input ${props.value.length > 0 ? "shrink" : ""}`} placeholder={`${t(props.placeholder)}${props.required ? " *" : ""}`} value={props.value} onChange={(event) => props.onChange(event, props.id)} />
        </InputContainer>
      );
    case "htmleditor":
      return <EditorNew className={`${props.dynamicClass ?? ""}`} key={props.id} type={props.type} placeholder={props.placeholder} value={props.value} id={props.id} onChange={props.onChange}></EditorNew>;
    // Render a submit button
    case "submit":
      return (
        <Button theme={themeColors} className="submit" disabled={props.disabled} type={props.type} onClick={props.onChange}>
          {props.value}
        </Button>
      );
    // Render a close button
    case "close":
      return (
        <Button theme={themeColors} className="close" type={props.type} onClick={props.onChange}>
          {props.value}
        </Button>
      );
    // Render a cehckbox
    case "checkbox":
      return (
        <InputContainer className={`checkbox ${props.dynamicClass ?? ""}`}>
          <Label className="checkbox">
            <Checkbox
              theme={themeColors}
              label={t(props.placeholder)}
              type={props.type}
              checked={props.value}
              onChange={(event) => {
                console.log(event.target.checked === false ? false : true);
                props.onChange(event.target.checked === false ? false : true, props.id, props.type);
              }}
            ></Checkbox>
            {/* <span dangerouslySetInnerHTML={{ __html: t(props.placeholder) }}></span> */}
          </Label>
        </InputContainer>
      );
    // Render a select box
    case "select":
      return <CustomSelect theme={themeColors} {...props} name={props.id} selected={props.value} onSelect={props.onChange}></CustomSelect>;
    case "multiSelect":
      return <MultiSelect theme={themeColors} {...props} name={props.id} selected={props.value} onSelect={props.onChange}></MultiSelect>;
    case "info":
      return (
        <Info className={` ${props.dynamicClass}`}>
          <GetIcon icon={"info"}></GetIcon> {t(props.content ?? "")}
        </Info>
      );
    case "title":
      return (
        <SubHead theme={themeColors} className={`title ${props.dynamicClass}`}>
          {t(props.title ?? "")}
        </SubHead>
      );
    default:
      return <></>;
  }
}
export default FormInput;
