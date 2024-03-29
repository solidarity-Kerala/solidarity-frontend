import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Attendence = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Attendence - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "date",
      placeholder: "Date",
      name: "date",
      validation: "",
      default: "",
      label: "date",
      // tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "member/select",
      placeholder: "member",
      name: "member",
      showItem: "name",
      validation: "",
      default: "",
      // tag: true,
      label: "Member",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "members-group/select",
      placeholder: "Group",
      name: "group",
      collection: "group",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Group",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "",
      tag: true,
      label: "Status",
      showItem: "status",
      required: false,
      view: true,
      filter: true,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Present,Absent",
    },
    {
      type: "text",
      placeholder: "Month",
      name: "month",
      validation: "",
      default: "",
      label: "month",
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
        datefilter="true"
        api={`attendence`}
        itemTitle={{ name: "name", type: "text", collection: "member" }}
        shortName={`Attendence`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Attendence);
