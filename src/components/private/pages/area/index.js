import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Area = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Area - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Area Name",
      name: "areaName",
      validation: "",
      default: "",
      label: "Area Name",
      // tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "district/select",
      placeholder: "District",
      name: "district",
      showItem: "districtName",
      validation: "",
      default: "",
      tag: true,
      label: "District",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "checkbox",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "true",
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
        api={`area`}
        itemTitle={{ name: "areaName", type: "text", collection: "" }}
        shortName={`Area`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Area);
