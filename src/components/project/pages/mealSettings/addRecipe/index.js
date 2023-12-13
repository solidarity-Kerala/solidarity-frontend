import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
import PopupView from "../../../../core/popupview";
import SetupRecipe from "./setupRecipe";
import { useSelector } from "react-redux";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AddRecipe = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Recipe - Diet Food Management Portal`;
  }, []);
  // Get the theme colors from the Redux store
  const themeColors = useSelector((state) => state.themeColors);
  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Recipe",
      name: "title",
      default: "",
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Arabic Name",
      name: "arTitle",
      validation: "",
      default: "",
      label: "Arabic Name",
      required: false,
      view: true,
      add: true,
      update: true,
      tag: true,
    },
    {
      type: "text",
      placeholder: "Recipe ID",
      name: "recipeID",
      validation: "",
      default: "",
      label: "Recipe ID",
      tag: true,
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "number",
      placeholder: "Preparation Time (Minutes)",
      name: "preparationTime",
      validation: "",
      default: "",
      tag: false,
      label: "Preparation Time (Minutes)",
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
      tag: false,
      label: "Description",
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
      view: false,
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
      required: false,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Number of Servings",
      name: "numberOfPortion",
      validation: "",
      default: "1",
      tag: true,
      label: "Number of Servings",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Type Of Recipe",
      name: "typeOfRecipe",
      validation: "",
      default: "",
      tag: true,
      label: "Type Of Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: "Bread,Meat,Fruit,Dessert,Salad,Soup,Fat,Snacking,Mixed",
      apiType: "CSV",
    },
    {
      type: "number",
      placeholder: "Bread %",
      name: "mixedBreadPercentage",
      validation: "",
      default: 50,
      condition: {
        item: "typeOfRecipe",
        if: "Mixed",
        then: "enabled",
        else: "disabled",
      },
      tag: false,
      label: "Bread %",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Meat %",
      name: "mixedMeatPercentage",
      validation: "",
      condition: {
        item: "typeOfRecipe",
        if: "Mixed",
        then: "enabled",
        else: "disabled",
      },
      default: 50,
      tag: false,
      label: "Meat %",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Ingredient Category",
      name: "proteinCategory",
      validation: "",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Ingredient Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "cuisine-category/select",
      placeholder: "Cuisine Category",
      name: "cuisineCategory",
      validation: "",
      showItem: "cuisineCategoriesName",
      default: "",
      tag: true,
      label: "Cuisine Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Mealtime Category",
      name: "mealTimeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Mealtime Category",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      placeholder: "Production Department",
      name: "productionDepartment",
      validation: "",
      default: "",
      tag: true,
      label: "Production Department",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi:
        "Hot kitchen, Cold kitchen, Bakery, Salad section, Sandwich section",
      apiType: "CSV",
    },
    {
      type: "text",
      placeholder: "Recipe URL",
      name: "recipeUrl",
      validation: "",
      default: "",
      label: "Recipe URL",
      required: false,
      view: true,
      add: true,
      update: true,
      tag: true,
    },
    {
      type: "image",
      placeholder: "Recipe",
      name: "photo",
      validation: "",
      default: "",
      tag: true,
      label: "Recipe",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [foodMenu] = useState([
    {
      type: "text",
      placeholder: "Title",
      name: "title",
      validation: "",
      default: "",
      tag: true,
      label: "Title",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Arabic Name",
      name: "arabicName",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Arabic Name",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "diet/select",
      placeholder: "Diet",
      name: "diet",
      validation: "",
      showItem: "title",
      default: "",
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
      default: "",
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
      placeholder: "Menu Type",
      name: "menuType",
      validation: "",
      default: "",
      tag: false,
      label: "Menu Type",
      required: true,
      view: true,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Fixed,Dynamic",
    },
    {
      type: "checkbox",
      placeholder: "Enable",
      name: "enable",
      validation: "",
      default: "",
      tag: false,
      label: "Enable",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "callback",
      callback: (item, data) => {
        // Set the data for the clicked item and open the SetupMenu popup
        console.log(item, data);
        setOpenItemData({ item, data });
        setOpenMenuSetup(true);
      },
      itemTitle: {
        name: "mealName",
        type: "text",
        collection: "meal",
      },
      icon: "menu",
      title: "Recipe Settings",
      // condition: {
      //   item: "title",
      //   if: "Mustard Peas Dip",
      //   then: true,
      //   else:true,
      // },
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
      },
    },
    {
      element: "button",
      type: "subList",
      id: "food-menu",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "",
      },
      exportPrivilege: true,
      title: "Week Menu",
      attributes: foodMenu,

      params: {
        api: `food-menu-item/food-menu`,
        parentReference: "recipe",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "",
        },
        shortName: "Week Menu",
        addPrivilege: false,
        delPrivilege: false,
        updatePrivilege: false,
        customClass: "medium",
        formMode: "double",
        exportPrivilege: true,
      },
    },
  ]);

  // State to control the display of the SetupMenu popup
  const [openMenuSetup, setOpenMenuSetup] = useState(false);

  // State to store the data for the item that was clicked on in the ListTable
  const [openItemData, setOpenItemData] = useState(null);

  // Function to close the SetupMenu popup
  const closeModal = () => {
    setOpenMenuSetup(false);
    setOpenItemData(null);
  };
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        actions={actions}
        api={`recipe`}
        // itemTitle={`Recipe`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        profileImage="photoThumbnail"
        shortName={`Recipe`}
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        attributes={attributes}
      ></ListTable>
      {openMenuSetup && openItemData && (
        <PopupView
          // Popup data is a JSX element which is binding to the Popup Data Area like HOC
          popupData={
            <SetupRecipe
              openData={openItemData}
              setMessage={props.setMessage}
              // Pass selected item data (Menu Title) to the popup for setting the time
            ></SetupRecipe>
          }
          themeColors={themeColors}
          closeModal={closeModal}
          itemTitle={{ name: "title", type: "text", collection: "" }}
          openData={openItemData} // Pass selected item data to the popup for setting the time and taking menu id and other required data from the list item
          customClass={"full-page"}
        ></PopupView>
      )}
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(AddRecipe);
