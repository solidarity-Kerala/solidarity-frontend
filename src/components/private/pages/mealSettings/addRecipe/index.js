import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
import PopupView from "../../../../elements/popupview";
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
      validation: "",
      default: "",
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
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
      update: false,
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
      update: false,
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
      filter: false,
      selectApi: "Bread,Meat,Fruit,Dessert,Salad,Soup",
      apiType: "CSV",
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Protein Category",
      name: "proteinCategory",
      validation: "",
      showItem: "proteinCategoriesName",
      default: "",
      tag: true,
      label: "Protein Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
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
      filter: false,
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

  // const [addVariant] = useState([
  //   {
  //     type: "text",
  //     placeholder: "Variant",
  //     name: "variant",
  //     validation: "",
  //     default: "",
  //     label: "Default Variant",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Price",
  //     name: "price",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Price",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Offer Price",
  //     name: "offerPrice",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Offer Price",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Level",
  //     name: "percentage",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Level",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [mealIngredient] = useState([
  //   {
  //     type: "select",
  //     apiType: "API",
  //     selectApi: "ingredient/select",
  //     placeholder: "Ingredient",
  //     apiSearch: true,
  //     name: "ingredient",
  //     collection: "ingredient",
  //     validation: "",
  //     showItem: "ingredientsName",
  //     default: "",
  //     tag: false,
  //     label: "Ingredient",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //     filter: false,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Quantity",
  //     name: "percentage",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Quantity",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [nutritionInfo] = useState([
  //   {
  //     type: "text",
  //     placeholder: "Calories",
  //     name: "calories",
  //     validation: "",
  //     default: "fasdfasdfa",
  //     tag: true,
  //     label: "Calories",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Protein",
  //     name: "protein",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Protein",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Sat Fat",
  //     name: "satFat",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Sat Fat",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Un Sat Fat",
  //     name: "unSatFat",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Un Sat Fat",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Total Fat",
  //     name: "totalFat",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Total Fat",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Cholesterol",
  //     name: "cholesterol",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Cholesterol",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Fiber",
  //     name: "fiber",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Fiber",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Carbo Hydrate",
  //     name: "carbohydrate",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Carbo Hydrate",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Sugars",
  //     name: "sugars",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Sugars",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Iron",
  //     name: "iron",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Iron",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Calcium",
  //     name: "calcium",
  //     validation: "",
  //     default: "",
  //     tag: true,
  //     label: "Calcium",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [actions] = useState([
  //   {
  //     element: "button",
  //     type: "subList",
  //     id: "recipe-variant",
  //     itemTitle: { name: "title", type: "text", collection: "recipe" },
  //     title: "Recipe Variant",
  //     attributes: addVariant,
  //     params: {
  //       api: `recipe-variant`,
  //       parentReference: "recipe",
  //       itemTitle: { name: "variant", type: "text", collection: "" },
  //       shortName: "Recipe Variant",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: true,
  //       customClass: "medium",
  //       formMode: "double",
  //     },
  //   },
  //   {
  //     element: "button",
  //     type: "subList",
  //     id: "recipe-ingredients",
  //     itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //     title: "Recipe Ingredient",
  //     attributes: mealIngredient,
  //     params: {
  //       api: `recipe-ingredients`,
  //       parentReference: "recipe",
  //       itemTitle: {
  //         name: "ingredientsName",
  //         type: "text",
  //         collection: "ingredient",
  //       },
  //       shortName: "Recipe Ingredient",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: false,
  //       customClass: "medium",
  //     },
  //   },
  //   {
  //     element: "button",
  //     type: "subItem",
  //     id: "recipe/nutrition-info",
  //     // itemTitle: "username",
  //     itemTitle: { name: "mealName", type: "text", collection: "meal" },
  //     title: "Nutrition Info",
  //     attributes: nutritionInfo,
  //     params: {
  //       api: `meal-item/nutrition-info`,
  //       parentReference: "recipe",
  //       itemTitle: {
  //         name: "ingredientsName",
  //         type: "text",
  //         collection: "ingredient",
  //       },
  //       shortName: "Nutrition Info",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: true,
  //       customClass: "medium",
  //       formMode: "double",
  //     },
  //   },
  // ]);
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
    // More actions...
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
        profileImage="photo"
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
