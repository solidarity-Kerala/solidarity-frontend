import { GetIcon } from "../../../../icons";
import { dateFormat, dateTimeFormat } from "../../../functions/date";
import { IconBox, Img } from "../styles";
export function convertMinutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minsStr = mins.toString().padStart(2, "0");

  return `${hoursStr}:${minsStr}`;
}
export const getValue = (attribute, itemValue, display = false) => {
  let response = "";
  switch (attribute.type) {
    case "minute":
      response = convertMinutesToHHMM(parseFloat(itemValue ?? 0));
      break;
    case "image":
      response = <Img src={process.env.REACT_APP_CDN + itemValue} />;
      break;
    case "datetime":
      response = dateTimeFormat(itemValue);
      break;
    case "multiSelect":
      response = itemValue.map((item) => item[attribute.showItem].toString()).join(", ");
      break;
    case "number":
      if (Number.isInteger(itemValue ? itemValue : 0)) {
        response = (itemValue ? itemValue : 0).toString(); // Return as whole number
      } else {
        response = (itemValue ? itemValue : 0).toFixed(2); // Format with two decimal places
      }
      break;
    case "date":
      response = dateFormat(itemValue);
      break;
    case "textarea":
    case "htmleditor":
      response = <span dangerouslySetInnerHTML={{ __html: itemValue?.toString()?.substring(0, 200) }}></span>;
      break;
    case "checkbox":
      response = <IconBox className={display && "display"}>{itemValue ? <GetIcon icon={"checked"} /> : <GetIcon icon={"Close"} />}</IconBox>;
      break;
    case "icon":
      response = <i className={`fa-light ${itemValue}`} />;
      break;
    default:
      switch (typeof itemValue) {
        case "undefined":
          response = "--";
          break;
        case "object":
          response = itemValue?.[attribute.showItem] ?? "--";
          break;
        case "boolean":
          response = itemValue.toString();
          break;
        case "string":
        case "number":
        default:
          if (attribute.type === "select" && attribute.apiType === "JSON") {
            attribute.selectApi.filter((item) => item.id.toString() === itemValue?.toString()).map((filteredItem) => (response = filteredItem.value));
          } else {
            response = itemValue?.toString().substring(0, 200);
          }
          break;
      }
  }
  return response;
};
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return `${age} years old`;
};
