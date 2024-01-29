import { avathar } from "../../../images";
export function generateThumbnail(name = "Azhar Pallikkandy", status = null, photo = "") {
  return (
    <span>
      {<img style={status === null ? { width: "35px", height: "35px" } : { width: "65px", height: "65px" }} src={photo?.length > 5 ? `${process.env.REACT_APP_CDN}${photo}` : avathar} alt="P"></img>}
    </span>
  );
}
