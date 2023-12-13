import React, { useEffect, useState } from "react";
import Layout from "../../../elements/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../../elements/layout/styels";

const InvoiceSetting = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Invoice Setting - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Company Name",
      name: "companyName",
      validation: "",
      default: "",
      label: "Company Name",
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
      label: "Email",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Contact Number",
      name: "firstContact",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Contact Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Second Contact Number",
      name: "secondContact",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Second Contact Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "textarea",
      placeholder: "Foot Note",
      name: "footNote",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Foot Note",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Address",
      name: "address",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Address",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "image",
      placeholder: "Logo",
      name: "logo",
      validation: "",
      default: "",
      tag: true,
      label: "Logo",
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
        api={`invoice-setting`}
        // itemTitle={`label`}
        itemTitle={{
          name: "companyName",
          type: "text",
          collection: "",
        }}
        shortName={`Invoice Setting`}
        profileImage={"logo"}
        formMode={`double`}
        attributes={attributes}
        {...props}
      ></ListTable>
    </Container>
  );
};

export default Layout(InvoiceSetting);
