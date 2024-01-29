import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Unit = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Unit - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Title",
      name: "title",
      validation: "",
      default: "",
      label: "Title",
      tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "members-group/select",
      placeholder: "Member Group",
      name: "Member Group",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Member Group",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
        type: "select",
        apiType: "API",
        selectApi: "area/select",
        placeholder: "Area",
        name: "Area",
        showItem: "",
        validation: "",
        default: "",
        tag: true,
        label: "Area",
        required: false,
        view: true,
        add: true,
        update: true,
        filter: false,
      },
  
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`unit`}
        itemTitle={{ name: "status", type: "text", collection: "" }}
        shortName={`Unit`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Unit);
