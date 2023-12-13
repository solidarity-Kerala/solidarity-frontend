import React, { useEffect, useState } from "react";
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DayOfWeek = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `DayOfWeek - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "DayOfWeek",
      name: "day",
      validation: "",
      default: "",
      tag: true,
      label: "DayOfWeek",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Active",
      name: "isActive",
      validation: "",
      default: "true",
      tag: true, // when its true this field show as items in view
      label: "Active",
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
        api={`dayof-week`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "day", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Day Of Week`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DayOfWeek);
