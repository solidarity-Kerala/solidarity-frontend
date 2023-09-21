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
    }, {
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
      filter: false,
      selectApi: "Gram,Teaspoon,Tablespoon,Cup,Ounce,Piece,Milliliter,Pinch,Bunch",
      apiType: "CSV",
    },
    {
      type: "number",
      placeholder: "Gram Per Measurement Type",
      name: "gramOfType",
      validation: "",
      default: "",
      dynamicClass: "direct",
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
      filter: false,
    },
    {
      type: "number",
      placeholder: "Calories",
      name: "calories",
      validation: "",
      showItem: "",
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
      placeholder: "Protein",
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
      placeholder: "SatFat",
      name: "satFat",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "SatFat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "UnSatFat",
      name: "unSatFat",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "UnSatFat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "TotalFat",
      name: "totalFat",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "TotalFat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Cholesterol",
      name: "cholesterol",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Cholesterol",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Fiber",
      name: "fiber",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Fiber",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Carbohydrate",
      name: "carbohydrate",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Carbohydrate",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Sugar",
      name: "sugars",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Sugar",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Iron",
      name: "iron",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Iron",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Calcium",
      name: "calcium",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Calcium",
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
      default: "",
      tag: false,
      label: "Quantity",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Vitamin A",
      name: "VitaminA",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Vitamin A",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Vitamin C",
      name: "vitaminC",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Vitamin C",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Vitamin E",
      name: "vitaminE",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Vitamin E",
      required: true,
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
