import { Header, Overlay, Page } from "../manage/styles";
// import FormInput from "../../input";
import { getValue } from "../functions";
import { GetIcon } from "../../../../icons";
import { CloseButton, DataHead, DataItem, Head, TabContainer, Td, Title, TrBody } from "./styles";
import Tabs from "../../tab";
import React, { useCallback, useEffect, useState } from "react";
import { RowContainer } from "../../../styles/containers/styles";
import ListTable from "../list";
import { More } from "../styles";
import ImagePopup from "../image";
import { CustomPageTemplate } from "../custom";
export const DisplayInformations = ({ attributes, data, formMode }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <React.Fragment>
      <TrBody className={formMode}>
        {attributes.map((attribute, index) => {
          if (attribute.view) {
            try {
              const itemValue = attribute.collection?.length > 0 && attribute.showItem?.length > 0 ? data[attribute.collection][attribute.showItem] : data[attribute.name];
              // if (attribute.type === "image") {
              //   return "";
              // }
              return (
                <Td key={index}>
                  <Title>{attribute.label}</Title>
                  {attribute.type === "image" ? (
                    <DataItem>
                      {getValue(attribute, itemValue, true, false, (src) => {
                        setShowImage(src);
                      })}
                    </DataItem>
                  ) : (
                    <DataItem>{getValue(attribute, itemValue, true)} </DataItem>
                  )}
                </Td>
              );
            } catch (error) {
              return (
                <Td key={index}>
                  <Title>{attribute.label}</Title>
                  <DataItem>{`--`} </DataItem>
                </Td>
              );
            }
          }

          return null;
        })}
      </TrBody>
      {showImage && <ImagePopup onClose={() => setShowImage(null)} src={showImage.src}></ImagePopup>}
    </React.Fragment>
  );
};
const Popup = ({ showInfo, popupMenu, formMode, selectedMenuItem, viewMode, themeColors, openData, setLoaderBox, setMessage, closeModal, itemTitle, updatePrivilege, isEditingHandler, udpateView }) => {
  const titleValue = (itemTitle.collection?.length > 0 ? openData?.data?.[itemTitle.collection]?.[itemTitle.name] ?? "" : openData?.data?.[itemTitle.name]) || "Please update the itemTitle.";

  const tabHandler = useCallback(() => {
    const tempTab = openData.actions
      .filter((item) => item.type === "subList" || item.type === "subItem" || item.type === "custom")
      .map((item, index) => ({
        name: `${item.id}-${index}`,
        title: item.title,
        icon: item.icon,
        element: item.type === "custom" ? <CustomPageTemplate {...item} themeColors={themeColors} setLoaderBox={setLoaderBox} setMessage={setMessage} content={item.content}></CustomPageTemplate> : <ListTable showInfo={item.showInfo ?? true} viewMode={item.type ?? "subList"} setMessage={setMessage} setLoaderBox={setLoaderBox} parentReference={item?.params?.parentReference} referenceId={openData?.data?._id} attributes={item.attributes} {...item.params}></ListTable>,
      }));
    showInfo &&
      tempTab.unshift({
        name: `information-${openData.data._id}`,
        title: "Informations",
        icon: "info",
        element: (
          <TabContainer className="tab">
            <Head className="sticky">
              <DataHead>
                <GetIcon icon={selectedMenuItem.icon}></GetIcon>
                <span>Basic Details</span>
              </DataHead>
              <div>
                {updatePrivilege && (
                  <More
                    theme={themeColors}
                    onClick={(event) => {
                      event.stopPropagation();
                      isEditingHandler(openData?.data, udpateView, titleValue);
                    }}
                  >
                    <GetIcon icon={"edit"} />
                  </More>
                )}
              </div>
            </Head>
            <DisplayInformations formMode={formMode} attributes={openData.attributes} data={openData.data} />
          </TabContainer>
        ),
      });
    setTabs(tempTab);
  }, [showInfo, setMessage, setLoaderBox, openData, themeColors, formMode, titleValue, udpateView, isEditingHandler, updatePrivilege, selectedMenuItem.icon]);

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    tabHandler();
  }, [tabHandler]);

  return (
    <Overlay>
      <Page className={`${openData?.item?.params?.customClass ?? "medium"} popup-child`}>
        <Header>
          <span>{`${getValue(itemTitle, titleValue)}`}</span>
          <CloseButton theme={themeColors} onClick={closeModal}>
            <GetIcon icon={"Close"} />
          </CloseButton>
        </Header>
        <RowContainer theme={themeColors} className="popup-data">
          {tabs.length > 0 && <Tabs popupMenu={popupMenu} tabs={tabs}></Tabs>}
        </RowContainer>
      </Page>
    </Overlay>
  );
};
export default Popup;
