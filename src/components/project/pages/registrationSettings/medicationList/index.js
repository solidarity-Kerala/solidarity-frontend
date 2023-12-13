import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const MedicationList = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `MedicationList- Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "UnderAnyMedication",
      name: "underAnyMedicationName",
      validation: "",
      default: "",
      tag: false,
      label: "Under AnyMedication",
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
        api={`under-any-medication`}
        displayColumn="double"
        // Property name for the title of each menu item
        // itemTitle={`label`}
        // Short name or label for the menu
        itemTitle={{
          name: "underAnyMedicationName",
          type: "text",
          collection: "",
        }}
        shortName={`MedicationList`}
        // Privilege flag indicating whether the user can add menu items
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(MedicationList);
