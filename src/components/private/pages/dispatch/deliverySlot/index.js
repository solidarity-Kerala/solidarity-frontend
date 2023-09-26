import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DeliverySlot = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Slot - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Slot",
      // Name of the input field
      name: "slot",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      tag: true,
      // Label text for the input field
      label: "Slot",
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
      type: "multiSelect",
      apiType: "API",
      selectApi: "mealtime-category/select",
      placeholder: "Meal Time Category",
      name: "mealTimeCategory",
      showItem: "mealtimeCategoriesName",
      validation: "",
      default: "",
      tag: true,
      label: "Meal Time Category",
      required: false,
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
        api={`delivery-slot`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{ name: "slot", type: "text", collection: "" }}
        shortName={`Delivery Slot`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DeliverySlot);
