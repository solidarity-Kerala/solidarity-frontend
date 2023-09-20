import React, { useEffect, useState } from "react";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const FranchiseAdmin = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Franchise Admin - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "select",
      apiType: "API",
      selectApi: "franchise/select",
      placeholder: "Franchise",
      name: "franchise",
      validation: "",
      showItem: "",
      default: "",
      label: "Franchise",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      placeholder: "User Name",
      name: "username",
      validation: "",
      default: "",
      tag: true,
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
      required: false,
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
      required: false,
      view: true,
      add: true,
      update: false,
    },
    
  ]);

  const [resetPassword] = useState([
    {
      type: "text",
      placeholder: "New Password",
      name: "newPassword",
      validation: "",
      default: "",
      label: "New Password",
      required: true,
      view: true,
      add: true,
      update: true,
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
      title: "Reset Password",
      attributes: resetPassword,
      params: {
        api: `auth/update-passoword`,
        parentReference: "user",
        // itemTitle: "username",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "dietician",
        },
        shortName: "Reset Password",
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
        actions={actions}
        api={`user`}
        // itemTitle={`label`}
        itemTitle={{ name: "name", type: "text", collection: "franchise" }}
        // preFilter={{ userType: "6493e7bf0fba44683fd8f51c" }}
        parentReference={"userType"}
        referenceId={"6493e7bf0fba44683fd8f51c"}
        shortName={`Franchise Admin`}
        formMode={`double`}
        attributes={attributes}
        {...props}
      ></ListTable>
    </Container>
  );
};
export default Layout(FranchiseAdmin);
