import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const UserType = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `User Type - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      // Type of input, in this case, a text input
      type: "text",
      // Placeholder text for the input field
      placeholder: "Role",
      // Name of the input field
      name: "role",
      // Validation rules for the input
      validation: "",
      // Default value for the input field
      default: "",
      // Label text for the input field
      label: "Role",
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
      placeholder: "Display Name",
      name: "roleDisplayName",
      validation: "",
      default: "",
      tag: true,
      label: "Display Name",
      required: true,
      view: true,
      add: true,
      update: false,
    },
  ]);
 return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // actions={actions}
        displayColumn="double"
        // API endpoint for fetching menu data
        api={`user-type`}
        // Property name for the title of each menu item
        itemTitle={{ name: "role", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Role`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(UserType);
