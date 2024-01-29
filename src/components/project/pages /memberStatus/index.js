import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const MemberStatus = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Member Status - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "",
      tag: true,
      label: "Status",
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
        api={`member-status`}
        itemTitle={{ name: "status", type: "text", collection: "" }}
        shortName={`Member Status`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(MemberStatus);
