import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Ingredient = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Ingredient - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Ingredient",
      name: "ingredientsName",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Ingredient",
      required: true,
      view: true,
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
      placeholder: "Measurement Type",
      name: "measureType",
      validation: "",
      default: "",
      tag: true,
      label: "Measurement Type",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi:
        "Gram,Teaspoon,Tablespoon,Cup,Ounce,Piece,Milliliter,Pinch,Bunch",
      apiType: "CSV",
    },
    {
      type: "number",
      placeholder: "Gram Per Measurement Type",
      name: "gramOfType",
      validation: "number",
      default: "",
      tag: true,
      label: "Gram Per Measurement Type",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Ingredient Category",
      name: "proteinCategory",
      validation: "",
      collection: "proteinCategory",
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
      type: "number",
      placeholder: "Calories (Kcal)",
      name: "calories",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Calories (Kcal) ",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Protein (g)",
      name: "protein",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Protein",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "SatFat (g)",
      name: "satFat",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "SatFat (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "UnSatFat (g)",
      name: "unSatFat",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "UnSatFat (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "TotalFat (g)",
      name: "totalFat",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "TotalFat (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Cholesterol (mg)",
      name: "cholesterol",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Cholesterol (mg)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Fiber (g)",
      name: "fiber",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Fiber (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Carbohydrate (g)",
      name: "carbohydrate",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Carbohydrate (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Sugar (g)",
      name: "sugars",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Sugar (g)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Iron (%)",
      name: "iron",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Iron (%)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Calcium (%)",
      name: "calcium",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Calcium (%)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Quantity",
      name: "quantity",
      validation: "",
      showItem: "",
      default: "100",
      tag: false,
      label: "Quantity",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Sodium (mg)",
      name: "sodium",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Sodium (mg)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Potassium (mg)",
      name: "potassium",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Potassium (mg)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Vitamin A (%)",
      name: "vitaminA",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Vitamin A (%)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Vitamin C (%)",
      name: "vitaminC",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Vitamin C (%)",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Vitamin E (%)",
      name: "vitaminE",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Vitamin E (%)",
      required: true,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "select",
      placeholder: "Yield Type",
      name: "yieldType",
      validation: "",
      default: "other",
      tag: true,
      label: "Yield Type",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "water,fat,both,other",
      apiType: "CSV",
    },
    // {
    //   type: "multiSelect",
    //   apiType: "API",
    //   selectApi: "allergy/select",
    //   placeholder: "Allergy",
    //   name: "allergy",
    //   showItem: "title",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Allergy",
    //   required: false,
    //   view: true,
    //   add: true,
    //   update: true,
    //   filter: false,
    // },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "allergy/select",
      placeholder: "Allergy",
      name: "allergy",
      validation: "",
      showItem: "title",
      default: "",
      tag: true,
      label: "Allergy",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "multiSelect",
      apiType: "API",
      selectApi: "medical-conditions/select",
      placeholder: "Medical Condition",
      name: "medicalCondition",
      validation: "",
      showItem: "medicalConditionsName",
      default: "",
      tag: true,
      label: "Medical Condition",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      placeholder: "Type Of Ingredient",
      name: "typeOfIngredient",
      validation: "",
      default: "",
      tag: true,
      label: "Type Of Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: "Meat,Bread,Fruit,Soup,Dessert,Salad,Fat,Snacking,Other",
      apiType: "CSV",
    },
    {
      type: "select",
      placeholder: "Food Exchange Category",
      name: "foodExchangeCategoryName",
      validation: "",
      default: "",
      tag: true,
      label: "Food Exchange Category",
      required: true,
      search: false,
      view: true,
      add: true,
      update: true,
      filter: true,
      selectApi: [
        { id: "starch", value: "Starch" },
        { id: "leanMeat", value: "Lean Meat" },
        { id: "skimMilk", value: "Skim Milk" },
        { id: "nonStarchyVegetable", value: "Non Starchy Vegetable" },
        { id: "fruits", value: "Fruits" },
        { id: "fats", value: "Fats" },
        { id: "sugar", value: "Sugar" },
        { id: "veryLeanMeat", value: "Very Lean Meat" },
        { id: "mediumFatMeat", value: "Medium Fat Meat / egg" },
        { id: "vegetarianProtein", value: "Vegetarian Protein" },
        { id: "lowfatMilk", value: "Low fat Milk" },
        { id: "regularMilk", value: "Regular Milk" },
      ],
      apiType: "JSON",
    },
    {
      type: "checkbox",
      placeholder: "Added Sugar",
      name: "isAddonSugar",
      validation: "",
      showItem: "",
      default: "false",
      tag: false,
      label: "Added Sugar",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Ingredient",
      name: "photo",
      validation: "",
      default: "",
      tag: true,
      label: "Ingredient",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        // api={`recipe-ingredients`}
        api={`ingredient`}
        // itemTitle={`label`}
        itemTitle={{
          name: "ingredientsName",
          type: "text",
          collection: "",
        }}
        profileImage="photo"
        shortName={`Ingredient`}
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
export default Layout(Ingredient);
