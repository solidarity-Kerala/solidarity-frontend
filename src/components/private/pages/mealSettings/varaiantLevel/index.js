import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const VariantLevel = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Variant Level - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Variant Level",
      name: "variantLevelName",
      validation: "",
      default: "",
      tag: true,
      label: "Variant Level",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "variant-group/select",
      placeholder: "Variant Group",
      name: "variantGroup",
      validation: "",
      showItem: "variantGroupName",
      default: "",
      tag: true,
      label: "Variant Group",
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
        api={`variant-level`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "variantLevelName", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Variant Level`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(VariantLevel);
