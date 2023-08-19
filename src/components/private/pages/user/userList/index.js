import React, { useEffect, useState } from "react";
//
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const UserList = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `User List - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "CPR/Mobile",
      name: "username",
      validation: "",
      default: "",
      tag: true,
      label: "CPR/Mobile",
      required: true,
      view: false,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "CPR/Mobile",
      name: "username",
      showItem: "",
      tag: true,
      validation: "",
      default: "",
      label: "CPR/Mobile",
      required: false,
      view: true,
      add: false,
      update: true,
    },
    {
      type: "text",
      placeholder: "Name",
      name: "userDisplayName",
      validation: "",
      default: "",
      tag: true,
      label: "Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "text",
    //   placeholder: "Cpr Number",
    //   name: "cprNumber",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Cpr Number",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
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
      update: false,
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "Password",
      required: false,
      view: true,
      add: true,
      update: false,
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
    //   collection: "subscriber",
    //   name: "subscriber",
    //   showItem: "dateOfBirth",
    //   tag: true,
    //   validation: "",
    //   default: "",
    //   label: "DOB",
    //   required: true,
    //   view: true,
    //   add: false,
    //   update: false,
    // },
    // {
    //   type: "date",
    //   placeholder: "",
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
    // {
    //   type: "hidden",
    //   apiType: "API",
    //   selectApi: "user-type/select",
    //   placeholder: "User Type",
    //   name: "userType",
    //   validation: "",
    //   showItem: "role",
    //   tag: true,
    //   default: "role",
    //   label: "User Type",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    //   filter: false,
    // },
    {
      type: "select",
      apiType: "API",
      selectApi: "user-type/select",
      placeholder: "Role",
      name: "userType",
      validation: "",
      showItem: "roleDisplayName",
      tag: true,
      default: "",
      label: "Role",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
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
    //   type: "textarea",
    //   apiType: "API",
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
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
        shortName={`User`}
        // formMode={`single`}
        formMode={`double`}
        //
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(UserList);
