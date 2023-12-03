import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
import PopupView from "../../../elements/popupview";
import AvailableCaloriesCustom from "./avialableCalories/availableCaloriesCustom";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const AvailableCalories = (props) => {
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };
  //to update the page title
  useEffect(() => {
    document.title = `Available Calories - Diet Food Management Portal`;
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
      selectApi: "800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000",
      apiType: "CSV",
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Mealtime Category",
      name: "mealTimeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Mealtime Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      placeholder: "Meal",
      name: "meal",
      validation: "",
      tag: true,
      default: "",
      filter: false,
      label: "Meal",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Bread",
      name: "bread",
      validation: "",
      tag: true,
      default: "",
      label: "Bread",
      filter: false,
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "1,2,3,4,5,6,7",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Dessert",
      name: "dessert",
      validation: "",
      tag: true,
      default: "",
      label: "Dessert",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: "0,1",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Fruit Exchange",
      name: "fruit",
      validation: "",
      tag: true,
      default: "",
      label: "Fruit Exchange",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: "0,1,2,3",
      apiType: "CSV",
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`available-calories`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "calories", type: "text", collection: "" }}
        shortName={`Available Calories`}
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
            <AvailableCaloriesCustom
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
export default Layout(AvailableCalories);
