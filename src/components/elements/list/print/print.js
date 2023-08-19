import React, { useEffect, useState } from "react";
import { Header, Overlay, Page } from "./../manage/styles";
import { GetIcon } from "../../../../icons";
import { CloseButton } from "../popup/styles";
import { Footer } from "../create/styles";
import { DataLayout, Table, Td, Th, Tr } from "./styles";
import { getValue } from "../functions";

const Print = ({ key, style, themeColors, attributes, setLoaderBox, setMessage, closeModal, shortName, data = [] }) => {
  // const titleValue = (itemTitle.collection?.length > 0 ? subAttributes?.data?.[itemTitle.collection]?.[itemTitle.name] ?? "" : subAttributes?.data?.[itemTitle.name]) || "Please update the itemTitle.";
  // const viewMode = subAttributes.item.type ?? "subList";

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      console.log(isLoaded);
      // window.print();
    }
  }, [isLoaded]); // Empty dependency array ensures the effect runs only once
  const TableRowWithActions = ({ attributes, data, slNo }) => {
    return (
      <Tr key={`${shortName}-${slNo}`}>
        {attributes.map((attribute, index) => {
          if (attribute.view) {
            try {
              const itemValue = attribute.collection?.length > 0 && attribute.showItem?.length > 0 ? data[attribute.collection][attribute.showItem] : data[attribute.name];

              return <Td key={index}>{getValue(attribute, itemValue)}</Td>;
            } catch (error) {
              return <Td key={index}>{`--`}</Td>;
            }
          }

          return null;
        })}
      </Tr>
    );
  };
  return (
    <Overlay key={key} style={style}>
      <Page className={"medium"}>
        <Header>
          <span>{`${shortName}`}</span>
          <CloseButton theme={themeColors} onClick={closeModal}>
            <GetIcon icon={"Close"} />
          </CloseButton>
        </Header>
        <DataLayout>
          <Table theme={themeColors}>
            <thead>
              <Tr>
                {attributes.map((attribute) => {
                  return attribute.view === true ? <Th key={shortName + attribute.name}>{attribute.label}</Th> : "";
                })}
              </Tr>
            </thead>
            <tbody>{data.response?.length > 0 && data.response.map((item, index) => <TableRowWithActions key={`${shortName}-${index}`} slNo={index} attributes={attributes} data={item} />)}</tbody>
          </Table>
        </DataLayout>
        <Footer></Footer>
      </Page>
    </Overlay>
  );
};

export default Print;
