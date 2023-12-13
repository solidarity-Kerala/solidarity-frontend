import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Faq = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Faq - DFMS Site Builder Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "textarea",
      apiType: "",
      selectApi: "",
      placeholder: "Question",
      name: "question",
      validation: "",
      showItem: "",
      default: "",
      label: "Question",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "textarea",
      apiType: "",
      selectApi: "",
      placeholder: "Answer",
      name: "answer",
      validation: "",
      showItem: "",
      default: "",
      label: "Answer",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "franchise/select",
      placeholder: "Franchise",
      name: "franchise",
      validation: "",
      showItem: "name",
      default: "",
      label: "Franchise",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "text",
      apiType: "",
      selectApi: "",
      placeholder: "link",
      name: "link",
      validation: "",
      showItem: "",
      default: "",
      label: "link",
      required: false,
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
        api={`faq`}
        // Property name for the title of each menu item
        itemTitle={{ name: "question", type: "text", collection: "" }}
        viewMode={"subItem"}
        // Short name or label for the menu
        shortName={`Faq`}
        // Privilege flag indicating whether the user can add menu items
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        // Additional attributes related to the menu
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Faq);
