import React, { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Members = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Members - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Name",
      name: "name",
      validation: "",
      default: "",
      label: "Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Address",
      name: "address",
      validation: "",
      default: "",
      label: "Address",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Mobile Number",
      name: "mobileNumber",
      validation: "",
      default: "",
      label: "Mobile Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Blood Group",
      name: "bloodGroup",
      validation: "",
      default: "",
      tag: true,
      label: "Blood Group",
      showItem: "",
      required: false,
      view: true,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "A+, A-, B+, B-, AB+, AB-, O+, O-",
    },
    {
      type: "text",
      placeholder: "Profession",
      name: "profession",
      validation: "",
      default: "",
      label: "Profession",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Qualification",
      name: "qualification",
      validation: "",
      default: "",
      label: "Qualification",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Area of Interest",
      name: "areaOfInterest",
      validation: "",
      default: "",
      label: "Area of Interest",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Birthulmal",
      name: "birthulmal",
      validation: "",
      default: "",
      label: "Birthulmal",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Type",
      name: "type",
      validation: "",
      default: "Member",
      tag: true,
      label: "Type",
      showItem: "type",
      required: false,
      view: false,
      filter: false,
      add: true,
      update: false,
      apiType: "CSV",
      selectApi: "Member",
    },
    // {
    //   type: "date",
    //   placeholder: "Date of Birth",
    //   name: "dob",
    //   validation: "",
    //   default: "",
    //   label: "Date of Birth",
    //   required: false,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "date",
      placeholder: "",
      name: "dob",
      showItem: "dateOfBirth",
      collection: "subscriber",
      validation: "",
      minDate: moment().add(-70, "years").toDate(),
      default: moment().toDate(),
      tag: true,
      label: "DOB",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "member-status/select",
      placeholder: "Member Status",
      name: "memberStatus",
      showItem: "status",
      validation: "",
      default: "",
      tag: true,
      label: "Member Status",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "designation/select",
      placeholder: "Designation",
      name: "designation",
      showItem: "designation",
      validation: "",
      default: "",
      tag: true,
      label: "Designation",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "members-group/select",
      placeholder: "Group",
      name: "group",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Group",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`member`}
        itemTitle={{ name: "name", type: "text", collection: "" }}
        shortName={`Member`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Members);
