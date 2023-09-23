import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
import PopupView from "../../../elements/popupview";

//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const FoodExchangeData = (props) => {
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };
  //to update the page title
  useEffect(() => {
    document.title = `Food Exchnage Data - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "select",
      placeholder: "Calories",
      name: "calories",
      validation: "",
      default: "",
      tag: false,
      label: "Calories",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1200,1500,1800,2000,2200,2500,3000",
      apiType: "CSV",
    },
   
    {
      type: "select",
      placeholder: "starch",
      name: "starch",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "starch",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Lean Meat",
      name: "leanMeat",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "Lean Meat",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Skim Milk",
      name: "skimMilk",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "Skim Milk",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Vegitables",
      name: "vegitables",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "Vegitables",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Fruit",
      name: "fruit",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "Fruit",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "fat",
      name: "Fat",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "fat",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Snacks",
      name: "snacks",
      validation: "",
      tag: true,
      default: "0",
      filter: false,
      label: "Snacks",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
      apiType: "CSV",
    },
    
    
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`foodexchange-data`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "calories", type: "text", collection: "" }}
        shortName={`Foodexchange-data`}
        // parentReference={"userType"}
        // referenceId={"64815bde89e0a44fc31c53b0"}
        formMode={`double`}
        viewMode="table"
        // formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <FoodExchangeData
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            />
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"large"}
        ></PopupView>
      )}
    </Container>
  );
};
export default Layout(FoodExchangeData);
