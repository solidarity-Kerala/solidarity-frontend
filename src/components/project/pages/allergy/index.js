import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
import { projectSettings } from "../../brand/project";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Allergy = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Allergy - ${projectSettings.title}`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Allergy",
      name: "title",
      validation: "",
      default: "",
      label: "Allergy",
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
      <ListTable api={`allergy`} itemTitle={{ name: "title", type: "text", collection: "" }} shortName={`Allergy`} displayColumn="double" {...props} attributes={attributes}></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Allergy);
