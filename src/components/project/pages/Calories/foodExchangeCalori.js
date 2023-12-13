import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
import PopupView from "../../../core/popupview";
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
    document.title = `FoodExchnage Calories - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "select",
      placeholder: "Calories",
      name: "calories",
      validation: "",
      default: "0",
      tag: false,
      label: "Calories",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: [
        
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
        { id: 2300, value: "2300" },
        { id: 2400, value: "2400" },
        { id: 2500, value: "2500" },
        { id: 2600, value: "2600" },
        { id: 2700, value: "2700" },
        { id: 2800, value: "2800" },
        { id: 2900, value: "2900" },
        { id: 3000, value: "3000" },
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
      default: "0",
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
      apiType: "API",
      selectApi: "diet/select",
      placeholder: "Diet",
      name: "diet",
      validation: "",
      showItem: "title",
      default: "0",
      tag: true,
      label: "Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    // TYPE OF DIET IS A DIET //
    // DIET PLAN IS A SUB DIET //
    {
      type: "select",
      apiType: "API",
      selectApi: "sub-diet/get-sub-diet-by-diet",
      updateOn: "diet",
      placeholder: "Sub Diet",
      name: "subDiet",
      validation: "",
      showItem: "title",
      collection: "subDiet",
      default: "0",
      tag: true,
      label: "Sub Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
     {
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
       
        { id: "FoodExchange", value: "Food Exchange Diet" },
      ],
      apiType: "JSON",
    },
    {
      type: "number",
      placeholder: "Starch",
      name: "starch",
      validation: "",
      tag: true,
      default: "0",
      label: "Starch",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Lean Meat",
      name: "leanMeat",
      validation: "",
      tag: true,
      default: "0",
      label: "Lean Meat",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Skim Milk",
      name: "skimMilk",
      validation: "",
      tag: true,
      default: "0",
      label: "Skim Milk",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Non-Starchy Vegetable",
      name: "nonStarchyVegetable",
      validation: "",
      tag: true,
      default: "0",
      label: "Non-Starchy Vegetable",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Fruits",
      name: "fruits",
      validation: "",
      tag: true,
      default: "0",
      label: "Fruits",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "Fats",
      name: "fats",
      validation: "",
      tag: true,
      default: "0",
      label: "Fats",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "Sugar",
      name: "sugar",
      validation: "",
      tag: true,
      default: "0",
      label: "Sugar",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "Very Lean Meat",
      name: "veryLeanMeat",
      validation: "",
      tag: true,
      default: "0",
      label: "Very Lean Meat",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Medium Fat Meat / Egg",
      name: "mediumFatMeat",
      validation: "",
      tag: true,
      default: "0",
      label: "Medium Fat Meat / Egg",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "High Fat Meat",
      name: "highFatMeat",
      validation: "",
      tag: true,
      default: "0",
      label: "High Fat Meat",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Vegetarian Protein",
      name: "vegetarianProtein",
      validation: "",
      tag: true,
      default: "0",
      label: "Vegetarian Protein",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
    
    },
    {
      type: "number",
      placeholder: "Low Fat Milk",
      name: "lowfatMilk",
      validation: "",
      tag: true,
      default: "0",
      label: "Low Fat Milk",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "Regular Milk",
      name: "regularMilk",
      validation: "",
      tag: true,
      default: "0",
      label: "Regular Milk",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    },
    {
      type: "number",
      placeholder: "Other",
      name: "other",
      validation: "",
      tag: true,
      default: "0",
      label: "Other",
      required: true,
      view: false,
      filter: false,
      add: true,
      update: true,
   
    }
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`available-calories`}
        preFilter={{ category: "FoodExchange" }}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "calories", type: "text", collection: "" }}
        shortName={`Food Exchange  Calories`}
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