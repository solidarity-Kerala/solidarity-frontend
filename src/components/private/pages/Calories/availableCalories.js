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
      selectApi: [
        { id: 800, value: "800" },
        { id: 900, value: "900" },
        { id: 1000, value: "1000" },
        { id: 1100, value: "1100" },
        { id: 1200, value: "1200" },
        { id: 1300, value: "1300" },
        { id: 1400, value: "1400" },
        { id: 1500, value: "1500" },
        { id: 1600, value: "1600" },
        { id: 1700, value: "1700" },
        { id: 1800, value: "1800" },
        { id: 1900, value: "1900" },
        { id: 2000, value: "2000" },
        { id: 2100, value: "2100" },
        { id: 2200, value: "2200" },
      ],
      apiType: "JSON",
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
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
        { id: 7, value: "7" },
      ],
      apiType: "JSON",
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
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
        { id: 7, value: "7" },
      ],
      apiType: "JSON",
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
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
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
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
    },
    {
      type: "select",
      placeholder: "Salad",
      name: "salad",
      validation: "",
      tag: true,
      default: "",
      label: "Salad",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
    },
    {
      type: "select",
      placeholder: "Soup",
      name: "soup",
      validation: "",
      tag: true,
      default: "",
      label: "Soup",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
    },
    {
      type: "select",
      placeholder: "Snacking",
      name: "snacking",
      validation: "",
      tag: true,
      default: "",
      label: "Snacking",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
    },
    {
      type: "select",
      placeholder: "Fat",
      name: "fat",
      validation: "",
      tag: true,
      default: "",
      label: "Fat",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      selectApi: [
        { id: 0, value: "0" },
        { id: 1, value: "1" },
        { id: 2, value: "2" },
        { id: 3, value: "3" },
        { id: 4, value: "4" },
        { id: 5, value: "5" },
        { id: 6, value: "6" },
      ],
      apiType: "JSON",
    }, {
      type: "select",
      placeholder: "Category",
      name: "category",
      validation: "",
      tag: true,
      default: "General",
      filter: true,
      label: "Category",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: [
        { id: "General", value: "General Diet" },
        { id: "Keto", value: "Keto Diet" },
        { id: "FoodExchange", value: "Food Exchange Diet" },
      ],
      apiType: "JSON",
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
