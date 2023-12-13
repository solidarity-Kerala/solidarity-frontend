import React, { useEffect, useState } from "react";
//
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const DietPrice = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Diet Price - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Liquid Diet Price",
      name: "liquid",
      validation: "",
      default: "",
      label: "Liquid Diet Price",
      tag: "true",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Soft Diet Price",
      name: "soft",
      validation: "",
      default: "",
      label: "Soft Diet Price",
      tag: "true",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Lowcarb Price",
      name: "lowcarb",
      validation: "",
      default: "",
      tag: "true",
      label: "Lowcarb Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Regular Price",
      name: "regular",
      validation: "",
      default: "",
      tag: "true",
      label: "Regular Price",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`diet-price`}
        displayColumn="Single"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "regular", type: "text", collection: "" }}
        shortName={`Diet price`}
        // parentReference={"userType"}
        // referenceId={"64815bde89e0a44fc31c53b0"}
        // formMode={`single`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(DietPrice);
