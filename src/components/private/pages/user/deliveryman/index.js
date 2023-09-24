import React, { useEffect, useState } from "react";
//
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const DeliveryMan = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Man - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Username",
      name: "username",
      validation: "",
      default: "",
      tag: true,
      label: "Username",
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
      tag: true,
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
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "Password",
      required: true,
      view: false,
      add: true,
      update: false,
    },
    {
      type: "title",
      title: "Email and password are required for login",
      name: "bmr",
      add: true,
      update: false,
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
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Male,Female",
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
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "hidden",
      apiType: "API",
      selectApi: "user-type/select",
      placeholder: "User Type",
      name: "userType",
      validation: "",
      showItem: "role",
      default: "role",
      tag: true,
      label: "User Type",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    
    {
      type: "image",
      placeholder: "Image",
      name: "userImage",
      validation: "",
      default: "",
      tag: true,
      label: "Image",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Identity Type",
      name: "identityType",
      validation: "",
      default: "",
      tag: true,
      label: "Identity Type",
      showItem: "identityType",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Passport,Govt Id",
    },
    {
      type: "image",
      placeholder: "Identity Image",
      name: "identityImage",
      validation: "",
      default: "",
      tag: true,
      label: "Identity Image",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Identity Number",
      name: "identityNumber",
      validation: "",
      default: "",
      tag: true,
      label: "Identity Number",
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
        api={`user`}
        displayColumn="double"
        formMode={`double`}
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
        shortName={`Delivery Man`}
        parentReference={"userType"}
        profileImage={'userImage'}
        referenceId={"64815bde89e0a44fc31c53b0"}
        
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(DeliveryMan);
