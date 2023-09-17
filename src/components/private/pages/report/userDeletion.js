import React, { useEffect, useState } from "react";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const UserDeletion = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Man - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    // {
    //   type: "text",
    //   placeholder: "User Name",
    //   name: "username",
    //   validation: "",
    //   default: "",
    //   label: "User Name",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "text",
      placeholder: "Employee ID",
      name: "employeeID",
      validation: "",
      default: "",
      label: "Employee ID",
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "user-type/select",
      placeholder: "User Type",
      name: "userType",
      validation: "",
      showItem: "role",
      tag: true,
      default: "",
      label: "User Type",
      required: true,
      view: true,
      add: true,
      update: false,
      filter: true,
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
      view: false,
      filter: false,
      add: true,
      update: false,
      apiType: "CSV",
      selectApi: "Male,Female",
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
      type: "password",
      placeholder: "password",
      name: "password",
      validation: "",
      default: "",
      // tag: true,
      label: "password",
      required: true,
      view: false,
      add: true,
      update: false,
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
      update: false,
    },
    {
      type: "select",
      placeholder: "Identity Type",
      name: "identityType",
      validation: "",
      default: "",
      tag: false,
      label: "Identity Type",
      required: true,
      view: true,
      add: true,
      update: false,
      selectApi: "Passport, License",
      apiType: "CSV",
      filter: false,
    },
    {
      type: "image",
      placeholder: "Identity Doc",
      name: "identityDocument",
      validation: "",
      default: "",
      tag: true,
      label: "Identity Doc",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "text",
      placeholder: "Identity Number",
      name: "identityNumber",
      validation: "",
      default: "",
      label: "Identity Number",
      required: true,
      view: true,
      add: true,
      update: false,
    },
    {
      type: "select",
      placeholder: "Delete",
      name: "delete",
      validation: "",
      default: "",
      tag: false,
      label: "Delete",
      required: false,
      view: false,
      add: false,
      update: true,
      selectApi: "True, False",
      apiType: "CSV",
      filter: false,
    },
  ]);

  const [Restore] = useState([
    {
      type: "select",
      placeholder: "Delete",
      name: "identityType",
      validation: "",
      default: "",
      tag: false,
      label: "Delete",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "True, False",
      apiType: "CSV",
      filter: false,
    },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "appointment",
      // itemTitle: "username",
      itemTitle: {
        name: "username",
        type: "text",
        collection: "dietician",
      },
      title: "Restore",
      attributes: Restore,
      params: {
        api: `user/user-deletion`,
        parentReference: "user",
        // itemTitle: "username",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "dietician",
        },
        shortName: "Restore",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        customClass: "medium",
        formMode: "double",
      },
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        delPrivilege={false}
        // actions={actions}
        api={`user/user-deletion`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "userDisplayName", type: "text", collection: "" }}
        shortName={`Delivery Man`}
        // parentReference={"userType"}
        // referenceId={"64815bde89e0a44fc31c53b0"}
        // formMode={`single`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(UserDeletion);
