import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DeliveryLocation = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Location - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Delivery Location",
      name: "location",
      validation: "",
      default: "",
      tag: true,
      label: "Delivery Location",
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
        api={`delivery-location`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        itemTitle={{ name: "location", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Delivery Location`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DeliveryLocation);
