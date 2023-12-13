import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Supplement = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Supplement - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Supplement Name",
      name: "usingAnySupplementName",
      validation: "",
      default: "",
      label: "Supplement Name ",
      tag: false,
      required: true,
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
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // Actions to be displayed in the ListTable
        // actions={actions}
        // API endpoint for fetching menu data
        api={`using-any-supplement`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{
          name: "usingAnySupplementName",
          type: "text",
          collection: "",
        }}
        // Short name or label for the menu
        shortName={`supplement`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Supplement);
