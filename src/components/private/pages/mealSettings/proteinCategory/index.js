import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const ProteinCategory = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Ingredient Category - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Ingredient Category",
      name: "proteinCategoriesName",
      validation: "",
      default: "",
      // tag: true,
      label: "Ingredient Category",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Code",
      name: "code",
      validation: "",
      default: "",
      tag: true,
      label: "Code",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Image",
      name: "protienImage",
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
        api={`protein-categories`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{
          name: "proteinCategoriesName",
          type: "text",
          collection: "",
        }}
        // Short name or label for the menu
        shortName={`Ingredient Category`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(ProteinCategory);
