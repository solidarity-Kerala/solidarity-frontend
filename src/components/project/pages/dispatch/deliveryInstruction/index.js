import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DeliveryInstruction = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Instruction - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Delivery Instruction Name",
      // Name of the input field
      name: "deliveryInstructionName",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      tag: true,
      // Label text for the input field
      label: "Delivery Instruction Name",
      // Indicates if the input field is required
      required: true,
      // Indicates if the input field should be displayed in the view mode
      view: true,
      // Indicates if the input field should be displayed in the add mode
      add: true,
      // Indicates if the input field should be displayed in the update mode
      update: true,
    },
  ]);
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // API endpoint for fetching menu data
        api={`delivery-instruction`}
        displayColumn="double"
        // Property name for the title of each menu item
        itemTitle={{
          name: "deliveryInstructionName",
          type: "text",
          collection: "",
        }}
        // itemTitle={`label`}
        // Short name or label for the menu
        shortName={`Delivery Instruction`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DeliveryInstruction);
