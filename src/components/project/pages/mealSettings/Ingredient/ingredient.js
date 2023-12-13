import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Ingredient = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Ingredient - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "title",
      title: "General Infromations",
      view: false,
      add: true,
      update: true,
    },
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
      selectApi: "Gram,Teaspoon,Tablespoon,Cup,Ounce,Piece,Milliliter,Pinch,Bunch",
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
      customClass:"small",
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
      customClass:"small",
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
      customClass:"small",
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
      customClass:"small",
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
      selectApi: "Meat,Bread,Fruit,Soup,Dessert,Salad,Mixed,Fat,Snacking,Other",
      apiType: "CSV",
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
      type: "title",
      title: "Food Exchange Values",
      view: false,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "starch",
      name: "starch",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Starch",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "leanMeat",
      name: "leanMeat",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Lean Meat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "skimMilk",
      name: "skimMilk",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Skim Milk",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "nonStarchyVegetable",
      name: "nonStarchyVegetable",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Non-Starchy Vegetable",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "fruits",
      name: "fruits",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Fruits",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "fats",
      name: "fats",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Fats",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "sugar",
      name: "sugar",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Sugar",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "veryLeanMeat",
      name: "veryLeanMeat",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Very Lean Meat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "mediumFatMeat",
      name: "mediumFatMeat",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Medium Fat Meat / Egg",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "highFatMeat",
      name: "highFatMeat",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "High Fat Meat",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "vegetarianProtein",
      name: "vegetarianProtein",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Vegetarian Protein",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "lowfatMilk",
      name: "lowfatMilk",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Low Fat Milk",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "regularMilk",
      name: "regularMilk",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Regular Milk",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "other",
      name: "other",
      validation: "",
      showItem: "",
      default: "0",
      tag: false,
      label: "Other",
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

  const [recipe] = useState([
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

  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "recipe",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "",
      },
      exportPrivilege: true,
      title: "Recipe",
      attributes: recipe,

      params: {
        api: `recipe-ingredients/recipe`,
        parentReference: "ingredient",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "",
        },
        shortName: "Recipe",
        profileImage: "photo",
        addPrivilege: false,
        delPrivilege: false,
        updatePrivilege: false,
        customClass: "medium",
        formMode: "double",
        exportPrivilege: true,
      },
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        actions={actions}
        // api={`recipe-ingredients`}
        api={`ingredient`}
        // itemTitle={`label`}
        itemTitle={{
          name: "ingredientsName",
          type: "text",
          collection: "",
        }}
        profileImage="photoThumbnail"
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
