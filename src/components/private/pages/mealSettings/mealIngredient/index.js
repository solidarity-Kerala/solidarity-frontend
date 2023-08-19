import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const MealIngredient = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Meal Ingredient - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "number",
      placeholder: "Quantity",
      name: "ingredientQuantity",
      validation: "",
      default: "",
      tag: true,
      label: "Quantity",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "meal/select",
      placeholder: "Recipe",
      name: "meal",
      validation: "",
      showItem: "mealName",
      default: "",
      tag: true,
      label: "Recipe",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "recipe-ingredients/select",
      placeholder: "Recipe Ingredient",
      name: "recipeIngredient",
      validation: "",
      showItem: "ingredientName",
      default: "",
      tag: true,
      label: "Recipe Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // API endpoint for fetching menu data
        api={`meal-ingredients`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "ingredientQuantity", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Meal Ingredient`}
        // Privilege flag indicating whether the user can add menu items
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(MealIngredient);
