import React, { useEffect, useState } from "react";
import Layout from "../../../elements/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Franchise = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Franchise - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Franchise Name",
      name: "name",
      validation: "",
      default: "",
      label: "Franchise Name",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Owner",
      name: "owner",
      validation: "",
      default: "",
      tag: true,
      label: "Owner",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Location",
      name: "location",
      validation: "",
      default: "",
      tag: true,
      label: "Location",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Website",
      name: "website",
      validation: "",
      default: "",
      tag: true,
      label: "Website",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Email",
      name: "email",
      validation: "",
      default: "",
      tag: true,
      label: "Email",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Phone",
      name: "phone",
      validation: "",
      default: "",
      tag: true,
      label: "Phone",
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
        api={`franchise`}
        // itemTitle={`label`}
        itemTitle={{
          name: "name",
          type: "text",
          collection: "",
        }}
        shortName={`Franchise`}
        formMode={`double`}
        attributes={attributes}
        {...props}
      ></ListTable>
    </Container>
  );
};

export default Layout(Franchise);
