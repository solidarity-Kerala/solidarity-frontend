import { GetIcon } from "../../icons";
import { ProfileStatus } from "../private/common/layout/styels";

export function generateThumbnail(name='Azhar Pallikkandy', status = null, photo = "") {
  console.log(name)
  if (photo?.length > 5) {
    let statusText = "";
    if (status === true) {
      statusText = (
        <ProfileStatus color="green">
          <GetIcon icon={"approved"}></GetIcon>
        </ProfileStatus>
      );
    } else if (status === false) {
      statusText = (
        <ProfileStatus color="red">
          <GetIcon icon={"bannedPeople"}></GetIcon>
        </ProfileStatus>
      );
    } else {
      statusText = "";
    }
    return (
      <span>
        {<img style={{ width: "35px", height: "35px" }} src={`${process.env.REACT_APP_CDN}${photo}`} alt="Profile"></img>}
        {statusText}
      </span>
    );
  } else {
    name.toUpperCase();
    const words = name.split(" ");
    let statusText = "";
    if (status === true) {
      statusText = (
        <ProfileStatus color="green">
          <GetIcon icon={"approved"}></GetIcon>
        </ProfileStatus>
      );
    } else if (status === false) {
      statusText = (
        <ProfileStatus color="red">
          <GetIcon icon={"bannedPeople"}></GetIcon>
        </ProfileStatus>
      );
    } else {
      statusText = "";
    }
    let profile = "";
    if (words.length === 1) {
      const [word] = words;
      if (word.length >= 2) {
        profile = (
          <span style={{ position: "relative", backgroundColor: generateColorByChar(name.charAt(0)), color: "#fff" }}>
            {word.substr(0, 1).toUpperCase() + word.substr(word.length - 1).toUpperCase()}
            {statusText}
          </span>
        );
      } else {
        profile = (
          <span style={{ position: "relative", backgroundColor: generateColorByChar(name.charAt(0)), color: "#fff" }}>
            {word.substr(0, 1).toUpperCase() + word.substr(0, 1).toUpperCase()}
            {statusText}
          </span>
        );
      }
    } else {
      const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
      profile = (
        <span style={{ position: "relative", backgroundColor: generateColorByChar(name.charAt(name.length - 1)), color: "#fff" }}>
          {initials.substr(0, 2)}
          {statusText}
        </span>
      );
    }
    return profile;
  }
}

function generateColorByChar(char) {
  const colorMap = {
    A: "#FF0000", // Red
    B: "#00FF00", // Green
    C: "#0000FF", // Blue
    D: "#FF00FF", // Magenta
    E: "#FF4500", // Yellow
    F: "#00FFFF", // Cyan
    G: "#800080", // Purple
    H: "#FFA500", // Orange
    I: "#008000", // Dark Green
    J: "#FFC0CB", // Pink
    K: "#FFD700", // Gold
    L: "#ADD8E6", // Light Blue
    M: "#800000", // Maroon
    N: "#FF4500", // Orange Red
    O: "#FF8C00", // Dark Orange
    P: "#7FFF00", // Chartreuse
    Q: "#DA70D6", // Orchid
    R: "#A0522D", // Sienna
    S: "#DC143C", // Crimson
    T: "#7CFC00", // Lawn Green
    U: "#FF1493", // Deep Pink
    V: "#4B0082", // Indigo
    W: "#D2691E", // Chocolate
    X: "#FF69B4", // Hot Pink
    Y: "#8B4513", // Saddle Brown
    Z: "#00CED1", // Dark Turquoise
    // ... Add more characters A-Z with their corresponding colors
  };

  const color = colorMap[char.toUpperCase()];
  return color ? color : "#36A2E0"; // Default color if no mapping is found
}
