import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Designation = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Designation - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Designation",
      name: "designation",
      validation: "",
      default: "",
      label: "Designation",
      // tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`designation`}
        itemTitle={{ name: "designation", type: "text", collection: "" }}
        shortName={`Designation`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Designation);
