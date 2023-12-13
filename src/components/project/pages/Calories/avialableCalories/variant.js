import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Variant = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Variant - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Variant",
      name: "variant",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Variant",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "recipe/select",
      iconImage: { collection: "", item: "photo" },
      tags: [
        {
          type: "text",
          item: "description",
          title: "description",
          collection: "",
        },
      ],
      placeholder: "Recipe",
      name: "recipe",
      collection: "recipe",
      validation: "",
      showItem: "recipe",
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
      type: "number",
      placeholder: "PreparationTime",
      name: "preparationTime",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "PreparationTime",
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
      showItem: "",
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
      showItem: "",
      default: "",
      tag: true,
      label: "Offer Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Meal Time Category",
      name: "mealTimeCategory",
      collection: "mealTimeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "protein-categories/select",
      placeholder: "Protein Category",
      name: "proteinCategory",
      validation: "",
      collection: "proteinCategory",
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
      collection: "cuisineCategory",
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
      type: "select",
      apiType: "API",
      selectApi: "recipe-tag/select",
      placeholder: "Recipe Tag",
      name: "recipeTag",
      validation: "",
      collection: "recipeTag",
      showItem: "recipeTag",
      default: "",
      tag: true,
      label: "Recipe Tag",
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
      tag: true,
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
      tag: true,
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
      tag: true,
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
      tag: true,
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
      tag: true,
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
      tag: true,
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
      tag: true,
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
      tag: true,
      label: "Calcium",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "CHO",
      name: "cho",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "CHO",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Fat",
      name: "fat",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Fat",
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
        api={`recipe-variant`}
        // itemTitle={`label`}
        itemTitle={{
          name: "variant",
          type: "text",
          collection: "",
        }}
        shortName={`Variant`}
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
export default Layout(Variant);
