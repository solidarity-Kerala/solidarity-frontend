import React, { useEffect, useState } from "react";
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DietCentreBranch = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Diet Centre Branch  - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Name",
      name: "name",
      validation: "",
      default: "",
      tag: false,
      label: "Name",
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
        api={`diet-centre-branch`}
        displayColumn="single"
        itemTitle={{ name: "name", type: "text", collection: "" }}
        shortName={`Diet Centre Branch`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DietCentreBranch);
