import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const ActivenessStatus = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Activeness Status - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Activeness Status",
      // Name of the input field
      name: "activenessStatusName",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      tag: false,
      // Label text for the input field
      label: "Activeness Status",
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
      type: "textarea",
      apiType: "",
      selectApi: "",
      placeholder: "Description",
      name: "description",
      collection: "",
      validation: "",
      showItem: "",
      default: "",
      tag: false,
      label: "Description",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Image",
      name: "activenessStatusImage",
      validation: "",
      default: "",
      tag: false,
      label: "Image",
      required: false,
      view: true,
      add: true,
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
        api={`activeness-status`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "activenessStatusName",
          type: "text",
          collection: "",
        }}
        shortName={`Activeness Status`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(ActivenessStatus);
