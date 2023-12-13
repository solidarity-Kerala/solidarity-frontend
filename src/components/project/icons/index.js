import React from "react";
import styled from "styled-components";
const Svg = styled.svg`
  height: 1em;
`;
export const PreparingIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M112 0c-8.8 0-16 7.2-16 16v4c0 17.6 8.3 34.2 22.4 44.8l32 24c6 4.5 9.6 11.6 9.6 19.2v4c0 8.8 7.2 16 16 16s16-7.2 16-16v-4c0-17.6-8.3-34.2-22.4-44.8l-32-24c-6-4.5-9.6-11.6-9.6-19.2V16c0-8.8-7.2-16-16-16zM256 352H192c-88.4 0-160-71.6-160-160H416c0 88.4-71.6 160-160 160zM32 160c-17.7 0-32 14.3-32 32c0 80.5 49.5 149.4 119.7 177.9l-7.4 16.2c-5.2-1.4-10.7-2.1-16.4-2.1c-35.3 0-64 28.7-64 64s28.7 64 64 64c29.8 0 54.9-20.4 62-48H335.9l17.6 38.6c3.7 8 13.1 11.6 21.2 7.9s11.6-13.1 7.9-21.2L328.3 369.9C398.5 341.4 448 272.5 448 192c0-17.7-14.3-32-32-32H32zM140.4 401.9l10.2-22.4c13.4 2.9 27.2 4.5 41.5 4.5h64c14.2 0 28.1-1.5 41.5-4.5L321.3 432H158c-3-11.7-9.2-22-17.6-30.1zM64 448a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM224 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v4c0 17.6 8.3 34.2 22.4 44.8l32 24c6 4.5 9.6 11.6 9.6 19.2v4c0 8.8 7.2 16 16 16s16-7.2 16-16v-4c0-17.6-8.3-34.2-22.4-44.8l-32-24c-6-4.5-9.6-11.6-9.6-19.2V16z"
    />
  </Svg>
);
export const DefaultIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
  </Svg>
);
export const GetCustomIcon = ({ icon }) => {
  const trimmedIcon = icon && typeof icon === "string" ? icon.trim() : "";

  switch (trimmedIcon) {
    case "preparation":
      return <PreparingIcon />;
    default:
      // console.log("missing icon", icon);
      return <DefaultIcon />;
  }
};
