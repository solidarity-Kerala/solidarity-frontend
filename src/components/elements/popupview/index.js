// import FormInput from "../../input";

import { GetIcon } from "../../../icons";
import { RowContainer } from "../../styles/containers/styles";
import { getValue } from "../list/functions";
import { Header, Page } from "../list/manage/styles";
import { Overlay } from "../message/styles";
import { CloseButton } from "./styles";

const PopupView = ({ themeColors, closeModal, itemTitle, popupData, customClass, openData }) => {
  const titleValue = (itemTitle.collection?.length > 0 ? openData?.data?.[itemTitle.collection]?.[itemTitle.name] ?? "" : openData?.data?.[itemTitle.name]) || "Please update the itemTitle.";
  return (
    <Overlay key={openData.data._id} className={`${customClass ?? "medium"}`}>
      <Page className={`${customClass ?? "medium"} popup-child`}>
        <Header>
          <span>{`${getValue(itemTitle, titleValue)}`}</span>
          <CloseButton theme={themeColors} onClick={closeModal}>
            <GetIcon icon={"Close"} />
          </CloseButton>
        </Header>
        <RowContainer theme={themeColors} className={`${customClass ?? "medium"} popup-data`}>
          {popupData}
        </RowContainer>
      </Page>
    </Overlay>
  );
};
export default PopupView;
