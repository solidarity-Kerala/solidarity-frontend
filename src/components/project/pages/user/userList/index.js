import React, { useEffect, useState } from "react";
//
import Layout from "../../../../elements/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../../elements/layout/styels";
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
      type: "select",
      placeholder: "Gender",
      name: "gender",
      collection: "",
      showItem: "",
      validation: "",
      default: "",
      tag: true,
      label: "Gender",
      required: true,
      view: true,
      filter: false,
      add: true,
      update: true,
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
    // {
    //   type: "select",
    //   placeholder: "Gender",
    //   name: "subscriber",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Gender",
    //   showItem: "gender",
    //   required: true,
    //   view: true,
    //   add: false,
    //   update: false,
    //   filter: false,
    //   // apiType: "CSV",
    //   // selectApi: "Male,Female",
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
      type: "select",
      apiType: "API",
      selectApi: "deliveryman-location/select",
      placeholder: "Location",
      name: "deliveryManLocation",
      collection: "deliveryManLocation",
      showItem: "deliveryLocation",
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
      type: "select",
      apiType: "API",
      selectApi: "vehicle-category/select",
      placeholder: "Vehicle",
      name: "vehicleType",
      collection: "vehicleType",
      validation: "",
      showItem: "vehicleType",
      default: "",
      tag: true,
      label: "Vehicle",
      required: true,
      view: true,
      add: true,
      update: true,
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
      tag: false,
      label: "Identity Type",
      required: true,
      view: true,
      add: true,
      update: true,
      selectApi: "Passport, License",
      apiType: "CSV",
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
      update: true,
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
      update: true,
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
      required: true,
      view: true,
      filter: true,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Active,Leave,Resigned,Terminated",
    },
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
