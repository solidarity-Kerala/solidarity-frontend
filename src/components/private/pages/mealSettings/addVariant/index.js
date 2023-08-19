import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AddVariant = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Add Variant - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Meal",
      name: "meal",
      showItem: "mealName",
      validation: "",
      default: "",
      tag: true,
      label: "Meal",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Variant Group",
      name: "variantGroup",
      showItem: "variantGroupName",
      validation: "",
      default: "",
      tag: true,
      label: "Variant Group",
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "text",
      placeholder: "Variant Level",
      name: "variantLevel",
      showItem: "variantLevelName",
      validation: "",
      default: "",
      tag: true,
      label: "Variant Level",
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "variant-group/select",
      showItem: "variantGroup",
      placeholder: "Variant Group",
      name: "variantGroupName",
      validation: "",
      default: "",
      tag: true,
      label: "variant Group",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "variant-level/select",
      placeholder: "Variant Level",
      name: "variantLevel",
      validation: "",
      default: "",
      tag: true,
      label: "variant Level",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      placeholder: "Meal Price",
      name: "mealPrice",
      validation: "",
      default: "",
      tag: true,
      label: "Meal Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Meal OfferPrice",
      name: "mealOfferPrice",
      validation: "",
      default: "",
      tag: true,
      label: "Meal OfferPrice",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Number of Persons",
      name: "numberOfPersons",
      validation: "",
      default: "",
      tag: true,
      label: "Number of Persons",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [timingAttributes] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "ingredient/select",
      placeholder: "Ingredient",
      name: "Ingredient",
      validation: "",
      default: "",
      label: "Ingredient",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Ingredient Quantity",
      name: "Ingredient Quantity",
      validation: "",
      default: "",
      label: "Ingredient Quantity",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "select",
    //   apiType: "API",
    //   selectApi: "meal/select",
    //   placeholder: "Meal",
    //   name: "meal",
    //   validation: "",
    //   default: "",
    //   label: "Meal",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    // {
    //   type: "checkbox",
    //   placeholder: "Status",
    //   name: "status",
    //   validation: "",
    //   default: "true",
    //   label: "Status",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    // {
    //   type: "checkbox",
    //   placeholder: "Is Link",
    //   name: "isLink",
    //   validation: "",
    //   default: "false",
    //   label: "Is Link",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
  ]);

  const [actions] = useState([
    {
      // Element type for rendering
      element: "button",
      // Type of action, in this case a sublist
      type: "subList",
      // Unique identifier for the submenu
      id: "sub-menu",
      // Displayed item title
      itemTitle: "title",
      // Title of the submenu
      title: "Meal Ingredient",
      // Additional attributes for timing
      attributes: timingAttributes,
      // Parameters for API and submenu configuration
      params: {
        // API endpoint for submenu data
        api: `sub-menu`,
        // Parent reference for the submenu
        parentReference: "menu",
        // Property name for the submenu item title
        itemTitle: "label",
        // Short name for the submenu
        shortName: "Ingredient",
        // Privileges for adding submenu items
        addPrivilege: true,
        // Privileges for deleting submenu items
        delPrivilege: true,
        // Privileges for updating submenu items
        updatePrivilege: true,
        // Custom CSS class for styling
        customClass: "medium",
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
        displayColumn="double"
        // API endpoint for fetching meal data
        api={`meal-variant`}
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "meal", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Variant`}
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
export default Layout(AddVariant);
