import { useEffect, useState } from "react";
import { Button, Date, DateTime, ElementContainer, Select, TextArea, TextBox, Time } from "../../../../../core/elements";
export const Tab2 = () => {
  const [textData, setTextData] = useState("");
  const [textarea, setTextArea] = useState("");
  const [datetime, setDatetime] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [textDataError, setTextDataError] = useState("");
  const [textAreaError, setAreaError] = useState("");
  const [dateDataError, setDateDataError] = useState("");
  const [timeDataError, setTimeDataError] = useState("");
  const [dateTimeDataError, setDateTimeDataError] = useState("");
  const [selectDataError, setSelectDataError] = useState("");
  const [select, setSelect] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    const isTextDataValid = textData.trim().length > 0;
    const isTextareaValid = textarea.trim().length > 0;
    const isDatetimeValid = datetime.trim().length > 0;
    const isTimeValid = time.trim().length > 0;
    const isDateValid = date.trim().length > 0;
    const isSelectValid = select.trim().length > 0;
  
    setTextDataError(isTextDataValid ? "" : "There should be a valid text!!");
    setAreaError(isTextareaValid ? "" : "There should be a valid text!!");
    setDateTimeDataError(isDatetimeValid ? "" : "There should be a valid text!!");
    setTimeDataError(isTimeValid ? "" : "There should be a valid text!!");
    setDateDataError(isDateValid ? "" : "There should be a valid text!!");
    setSelectDataError(isSelectValid ? "" : "There should be a valid text!!");
    setDisabledSubmit(!(isSelectValid && isTextDataValid && isTextareaValid && isDatetimeValid && isTimeValid && isDateValid));
  }, [textData, textarea, datetime, time, date, select]);
  
  return (
    <ElementContainer className="column">
      <TextBox
        label="Text Box Sample"
        value={textData}
        error={textDataError}
        onChange={(value) => {
          console.log("Text Changed", value);
          setTextData(value);
        }}
      ></TextBox>
      <TextArea
        label="Text Area Sample"
        value={textarea}
        error={textAreaError}
        onChange={(value) => {
          console.log("Text Changed", value);
          setTextArea(value);
        }}
      ></TextArea>
      <Select
        align={"form"}
        error={selectDataError}
        label="Select an Item"
        value={select}
        selectApi={[
          { id: "1", value: "Item 1" },
          { id: "2", value: "Item 2" },
          { id: "3", value: "Item 3" },
        ]}
        onSelect={(item) => {
          console.log("Selected Value", select, item);
          setSelect(item.id ?? null);
        }}
      ></Select>
      <DateTime
        label="Date Time Sample"
        value={datetime}
        error={dateTimeDataError}
        onChange={(value) => {
          console.log("Text Changed", value);
          setDatetime(value);
        }}
      ></DateTime>
      <Time
        label="Time Sample"
        value={time}
        error={timeDataError}
        onChange={(value) => {
          console.log("Text Changed", value);
          setTime(value);
        }}
      ></Time>
      <Date
        label="Date Sample"
        value={date}
        error={dateDataError}
        onChange={(value) => {
          console.log("Text Changed", value);
          setDate(value);
        }}
      ></Date>
      <Button
        isDisabled={disabledSubmit}
        align="right"
        icon={"checked"}
        ClickEvent={() => {
          console.log("Clicked Primary Button");
        }}
        value="Save"
      ></Button>
    </ElementContainer>
  );
};
