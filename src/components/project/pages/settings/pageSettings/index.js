import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const PageSettings = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Page Settings - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Page Title",
      name: "pageTitle",
      validation: "",
      default: "",
      tag: true,
      label: "Page Title",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Meta",
      name: "meta",
      validation: "",
      default: "",
      tag: true,
      label: "Meta",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Page Content",
      name: "pageContent",
      validation: "",
      default: "",
      tag: true,
      label: "Page Content",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Slug",
      name: "slug",
      validation: "",
      default: "",
      tag: true,
      label: "Slug",
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
        api={`page`}
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "pageTitle",
          type: "text",
          collection: "",
        }}
        shortName={`Page Settings`}
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
export default Layout(PageSettings);
