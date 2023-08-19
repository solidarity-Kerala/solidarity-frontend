import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
import PopupView from "../../../../elements/popupview";
import Meal from "./meal/meal";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

// FOOD GROUP IS A MEAL //

const FoodGroup = (props) => {
  const [openMenuSetup, setOpenMenuSetup] = useState(false);
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };

  //to update the page title
  useEffect(() => {
    document.title = `Meal - Diet Food Management Portal`;
  }, []);

  const themeColors = useSelector((state) => state.themeColors);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Meal Goup",
      name: "title",
      validation: "",
      default: "",
      tag: false,
      label: "Meal Goup",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Description",
      name: "description",
      validation: "",
      default: "",
      tag: true,
      label: "Description",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Calories",
      name: "calories",
      validation: "",
      default: "",
      tag: true,
      label: "Calories",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Price",
      name: "price",
      validation: "",
      default: "",
      tag: true,
      label: "Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Offer Price",
      name: "offerPrice",
      validation: "",
      default: "",
      tag: true,
      label: "Offer Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [foodGroupItem] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "recipe/select",
      // // updateOn: "mealTimeCategory",
      // iconImage: { collection: "", item: "photo" },
      tags: [
        {
          type: "text",
          item: "description",
          title: "Description",
          collection: "",
        },
      ],
      placeholder: "Recipe",
      name: "recipe",
      validation: "",
      showItem: "title",
      collection: "recipe",
      default: "",
      tag: true,
      label: "Recipe",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "recipe-variant/select",
      placeholder: "Recipe Variant",
      name: "recipeVariant",
      validation: "",
      updateOn: "recipe",
      showItem: "variant",
      collection: "recipeVariant",
      default: "",
      tag: true,
      label: "Recipe Variant",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  const [nutritionInfo] = useState([
    {
      type: "text",
      placeholder: "Calories",
      name: "calories",
      validation: "",
      default: "",
      tag: true,
      label: "Calories",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Protein",
      name: "protein",
      validation: "",
      default: "",
      tag: true,
      label: "Protein",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Sat Fat",
      name: "satFat",
      validation: "",
      default: "",
      tag: true,
      label: "Sat Fat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Un Sat Fat",
      name: "unSatFat",
      validation: "",
      default: "",
      tag: true,
      label: "Un Sat Fat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Total Fat",
      name: "totalFat",
      validation: "",
      default: "",
      tag: true,
      label: "Total Fat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Cholesterol",
      name: "cholesterol",
      validation: "",
      default: "",
      tag: true,
      label: "Cholesterol",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Fiber",
      name: "fiber",
      validation: "",
      default: "",
      tag: true,
      label: "Fiber",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Carbo Hydrate",
      name: "carbohydrate",
      validation: "",
      default: "",
      tag: true,
      label: "Carbo Hydrate",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Sugars",
      name: "sugars",
      validation: "",
      default: "",
      tag: true,
      label: "Sugars",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Iron",
      name: "iron",
      validation: "",
      default: "",
      tag: true,
      label: "Iron",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Calcium",
      name: "calcium",
      validation: "",
      default: "",
      tag: true,
      label: "Calcium",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "meal-item",
      // itemTitle: "username",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "recipe",
      },
      title: "Recipe Items",
      attributes: foodGroupItem,
      params: {
        api: `meal-item`,
        parentReference: "meal",
        // itemTitle: "username",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "recipe",
        },
        shortName: "Recipe Items",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: false,
        customClass: "medium",
        // formMode: "double",
      },
    },
    {
      element: "button",
      type: "subItem",
      id: "recipe/nutrition-info",
      // itemTitle: "username",
      itemTitle: { name: "mealName", type: "text", collection: "meal" },
      title: "Nutrition Info",
      attributes: nutritionInfo,
      params: {
        api: `meal/meal-nutrition-info`,
        parentReference: "meal",
        itemTitle: {
          name: "variant",
          type: "text",
          collection: "recipeVariant",
        },
        shortName: "Nutrition Info",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        // Set the data for the clicked item and open the SetupMenu popup
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },
      itemTitle: {
        name: "mealName",
        type: "text",
        collection: "meal",
      },
      icon: "menu",
      title: "Recipe",
      params: {
        api: `food-group-item`,
        parentReference: "",
        // itemTitle: "username",
        itemTitle: {
          name: "mealName",
          type: "text",
          collection: "meal",
        },
        shortName: "Recipe Items",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        // formMode: "double",
      },
    },
  ]);

  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        actions={actions}
        // API endpoint for fetching menu data
        api={`meal`}
        displayColumn="single"
        parentReference="meal"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Meal`}
        formMode={`single`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <Meal
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
// exporting the page with parent container layout..
export default Layout(FoodGroup);
