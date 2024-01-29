import React, { useEffect, useState } from "react";
//
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const Dietitian = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Dietitian - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "User Name",
      name: "username",
      validation: "",
      default: "",
      label: "User Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Name",
      name: "userDisplayName",
      validation: "",
      default: "",
      label: "Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "email",
      placeholder: "E-Mail",
      name: "email",
      validation: "",
      default: "",
      tag: true,
      label: "E-Mail",
      required: false,
      view: true,
      add: true,
      update: true,
    },

    {
      type: "select",
      placeholder: "Gender",
      name: "subscriber",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      showItem: "gender",
      required: true,
      view: true,
      add: false,
      update: false,
      filter: false,
      // apiType: "CSV",
      // selectApi: "Male,Female",
    },
    {
      type: "select",
      placeholder: "Gender",
      name: "gender",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      showItem: "Gender",
      required: false,
      view: false,
      filter: false,
      add: true,
      update: false,
      apiType: "CSV",
      selectApi: "Male,Female",
    },
    // {
    //   type: "date",
    //   apiType: "API",
    //   selectApi: "",
    //   placeholder: "DOB",
    //   name: "subscriber",
    //   validation: "",
    //   showItem: "dateOfBirth",
    //   default: "",
    //   tag: true,
    //   label: "DOB",
    //   required: true,
    //   view: true,
    //   add: false,
    //   update: false,
    // },
    // {
    //   type: "date",
    //   placeholder: "YYYY/MM/DD",
    //   name: "dateOfBirth",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "DOB",
    //   required: true,
    //   view: false,
    //   add: true,
    //   update: true,
    // },
    {
      type: "password",
      placeholder: "password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "password",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    // {
    //   type: "textarea",
    //   apiType: "",
    //   selectApi: "",
    //   placeholder: "Address",
    //   name: "subscriber",
    //   // collection: "subscribers",
    //   validation: "",
    //   showItem: "address",
    //   default: "",
    //   tag: true,
    //   label: "Address",
    //   required: false,
    //   view: true,
    //   add: false,
    //   update: false,
    // },

    // {
    //   type: "textarea",
    //   apiType: "",
    //   selectApi: "",
    //   placeholder: "Address",
    //   name: "address",
    //   validation: "",
    //   showItem: "address",
    //   default: "",
    //   tag: true,
    //   label: "Address",
    //   required: false,
    //   view: false,
    //   add: true,
    //   update: false,
    // },
    {
      type: "textarea",
      apiType: "",
      selectApi: "",
      placeholder: "Address",
      name: "address",
      collection: "subscriber",
      validation: "",
      showItem: "address",
      default: "",
      tag: true,
      label: "Address",
      required: false,
      view: true,
      add: true,
      update: false,
    },
    // {
    //   type: "hidden",
    //   apiType: "API",
    //   selectApi: "user-type/select",
    //   placeholder: "User Type",
    //   name: "userType",
    //   validation: "",
    //   showItem: "role",
    //   default: "role",
    //   tag: true,
    //   label: "User Type",
    //   required: true,
    //   view: false,
    //   add: true,
    //   update: true,
    //   filter: false,
    // },
    // {
    //   type: "hidden",
    //   apiType: "",
    //   selectApi: "",
    //   placeholder: "User Type",
    //   name: "userType",
    //   validation: "",
    //   showItem: "",
    //   default: "6471b3849fb2b29fe045887b",
    //   tag: true,
    //   label: "User Type",
    //   required: true,
    //   view: false,
    //   add: true,
    //   update: true,
    //   filter: false,
    // },
    // {
    //   type: "select",
    //   apiType: "API",
    //   selectApi: "franchise/select",
    //   placeholder: "Franchise",
    //   name: "franchise",
    //   validation: "",
    //   showItem: "name",
    //   default: "name",
    //   tag: true,
    //   label: "Franchise",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    //   filter: false,
    // },
    {
      type: "image",
      placeholder: "Image",
      name: "userImage",
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
      <ListTable
        // actions={actions}
        api={`user`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
        shortName={`Dietitian`}
        parentReference={"userType"}
        referenceId={"6471b34d9fb2b29fe0458878"}
        // formMode={`single`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(Dietitian);
