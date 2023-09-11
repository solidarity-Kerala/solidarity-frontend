import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AddictionList = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Addiction List Name - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Addiction ListName",
      name: "addictionListName",
      validation: "",
      default: "",
      tag: false,
      label: "Addiction ListName",
      required: true,
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
        api={`addiction-lists`}
        displayColumn="double"
        // Property name for the title of each menu item
        itemTitle={{
          name: "addictionListName",
          type: "text",
          collection: "",
        }}
        // Short name or label for the menu
        shortName={`Addiction List`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(AddictionList);
