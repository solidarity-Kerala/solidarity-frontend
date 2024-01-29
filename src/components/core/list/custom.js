import { useSelector } from "react-redux";
import { RowContainer } from "../../styles/containers/styles";

export const CustomPageTemplate = (props) => {
  const themeColors = useSelector((state) => state.themeColors);
  return <RowContainer theme={themeColors} className={"data-layout " + props.viewMode}>{props.content}</RowContainer>;
};
