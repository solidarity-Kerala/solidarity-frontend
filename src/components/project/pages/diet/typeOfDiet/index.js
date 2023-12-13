import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

// TYPE OF DIET IS A DIET //

const TypeOfDiet = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Type Of Diet - Diet Food Management Portal`;
  }, []);

  const [diet] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Diet",
      // Name of the input field
      name: "title",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      // Label text for the input field
      label: "Diet",
      // Indicates if the input field is required
      required: true,
      // Indicates if the input field should be displayed in the view mode
      view: true,
      // Indicates if the input field should be displayed in the add mode
      add: true,
      // Indicates if the input field should be displayed in the update mode
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
      type: "image",
      placeholder: "Image",
      name: "image",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [subDiet] = useState([
    // DIET PLAN IS A SUB DIET //
    {
      type: "text",
      apiType: "",
      selectApi: "",
      placeholder: "Sub Diet",
      name: "title",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Sub Diet",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
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
      placeholder: "Category",
      name: "category",
      validation: "",
      tag: true,
      default: "General",
      filter: false,
      label: "Category",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: [
        { id: "General", value: "General Diet" },
        { id: "FoodExchange", value: "Food Exchange Diet" },
        { id: "Liquid", value: "Liquid Diet" },
        { id: "Keto", value: "Keto Diet" },
      ],
      apiType: "JSON",
    },
    {
      type: "number",
      apiType: "",
      selectApi: "",
      placeholder: "Proteen %",
      name: "proteen",
      validation: "",
      showItem: "",
      default: "30",
      tag: true,
      label: "Proteen",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "number",
      apiType: "",
      selectApi: "",
      placeholder: "Fat %",
      name: "fat",
      validation: "",
      showItem: "",
      default: "30",
      tag: true,
      label: "Fat %",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "number",
      apiType: "",
      selectApi: "",
      placeholder: "Carb %",
      name: "carb",
      validation: "",
      showItem: "",
      default: "40",
      tag: true,
      label: "Carb %",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  const [actions] = useState([
    // DIET PLAN IS A SUB DIET //
    {
      element: "button",
      type: "subList",
      id: "dietPlan",
      // itemTitle: "username",
      itemTitle: {
        name: "title",
        type: "text",
        collection: "diet",
      },
      title: "Sub Diet",
      attributes: subDiet,
      params: {
        api: `sub-diet`,
        parentReference: "diet",
        // itemTitle: "username",
        itemTitle: {
          name: "title",
          type: "text",
          collection: "",
        },
        shortName: "Sub Diet",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
  ]);
  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        actions={actions}
        // API endpoint for fetching menu data
        api={`diet`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // TYPE OF DIET IS A DIET //
        itemTitle={{ name: "title", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Diet`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={diet}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(TypeOfDiet);
