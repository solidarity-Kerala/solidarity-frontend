import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AttendenceByMonth = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Attendence By Month- Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "TotalPresent",
      name: "totalPresent",
      validation: "",
      default: "",
      label: "TotalPresent",
      tag: true,
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "text",
      placeholder: "Total Absent",
      name: "totalAbsent",
      validation: "",
      default: "",
      label: "Total Absent",
      tag: true,
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "text",
      placeholder: "Month",
      name: "month",
      validation: "",
      default: "",
      label: "Month",
      tag: true,
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
        api={`attendence/report/month`}
        itemTitle={{ name: "month", type: "text", collection: "" }}
        shortName={`Attendence by month`}
        formMode={`single`}
        // viewMode={"subItem"}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(AttendenceByMonth);
