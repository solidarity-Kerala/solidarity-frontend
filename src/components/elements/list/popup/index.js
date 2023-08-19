import { Header, Overlay, Page } from "../manage/styles";
// import FormInput from "../../input";
import { getValue } from "../functions";
import { GetIcon } from "../../../../icons";
import { CloseButton, DataHead, DataItem, Head, TabContainer, Td, Title, TrBody } from "./styles";
import Tabs from "../../tab";
import { useCallback, useEffect, useState } from "react";
import { RowContainer } from "../../../styles/containers/styles";
import ListTable from "../list";
export const DisplayInformations = ({ attributes, data, formMode }) => {
  return (
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
                <DataItem>{getValue(attribute, itemValue, true)} </DataItem>
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
  );
};
const Popup = ({ formMode, viewMode, themeColors, openData, setLoaderBox, setMessage, closeModal, itemTitle }) => {
  const titleValue = (itemTitle.collection?.length > 0 ? openData?.data?.[itemTitle.collection]?.[itemTitle.name] ?? "" : openData?.data?.[itemTitle.name]) || "Please update the itemTitle.";

  const tabHandler = useCallback(() => {
    const tempTab = openData.actions
      .filter((item) => item.type === "subList" || item.type === "subItem")
      .map((item, index) => ({
        name: `${item.id}-${index}`,
        title: item.title,
        element: <ListTable viewMode={item.type ?? "subList"} setMessage={setMessage} setLoaderBox={setLoaderBox} parentReference={item?.params?.parentReference} referenceId={openData?.data?._id} attributes={item.attributes} {...item.params}></ListTable>,
      }));
    tempTab.unshift({
      name: `information-${titleValue}`,
      title: "Informations",
      element: (
        <TabContainer>
          <Head>
            <DataHead>
              <GetIcon icon={""}></GetIcon>
              <span>Basic Details</span>
            </DataHead>
          </Head>
          <DisplayInformations formMode={formMode} attributes={openData.attributes} data={openData.data} />
        </TabContainer>
      ),
    });
    setTabs(tempTab);
  }, [setMessage, setLoaderBox, openData, formMode, titleValue]);

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
          {tabs.length > 0 && <Tabs tabs={tabs}></Tabs>}
        </RowContainer>
      </Page>
    </Overlay>
  );
};
export default Popup;
