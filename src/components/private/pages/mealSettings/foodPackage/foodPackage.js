import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const FoodPackage = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Food Package - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      apiType: "API",
      selectApi: "",
      placeholder: "Day of Week",
      name: "dayOfWeek",
      validation: "",
      showItem: "day",
      default: "",
      tag: true,
      label: "Day of Week",
      required: false,
      view: true,
      add: false,
      update: false,
      filter: false,
    },
    {
      type: "text",
      apiType: "API",
      selectApi: "",
      placeholder: "Meal Time Category",
      name: "mealTimeCategory",
      validation: "",
      showItem: "mealtimeCategoriesName",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: false,
      view: true,
      add: false,
      update: false,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "dayof-week/select",
      placeholder: "Day of Week",
      name: "dayOfWeek",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Day of Week",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Meal Time Category",
      name: "mealTimeCategory",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    // TYPE OF DIET IS A DIET //
    {
      type: "select",
      apiType: "API",
      selectApi: "type-of-diet/select",
      placeholder: "Diet",
      name: "typeofdiet",
      validation: "",
      showItem: "typeOfDietName",
      default: "",
      tag: true,
      label: "Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "meal/select",
      placeholder: "Recipe",
      name: "foodGroup",
      validation: "",
      showItem: "packageName",
      default: "",
      tag: true,
      label: "Recipe",
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
        api={``}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "day", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Food Package`}
        formMode={`double`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(FoodPackage);
