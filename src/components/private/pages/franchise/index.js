import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
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
    // {
    //   type: "checkbox",
    //   placeholder: "Status",
    //   name: "status",
    //   validation: "",
    //   default: "true",
    //   label: "Status",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    // {
    //   type: "checkbox",
    //   placeholder: "Is Link",
    //   name: "isLink",
    //   validation: "",
    //   default: "false",
    //   label: "Is Link",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
  ]);

  // const [timingAttributes] = useState([
  //   {
  //     type: "text",
  //     placeholder: "Label",
  //     name: "label",
  //     validation: "",
  //     default: "",
  //     label: "Label",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "number",
  //     placeholder: "Sequence",
  //     name: "sequence",
  //     validation: "",
  //     default: "",
  //     label: "Sequence",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Icon",
  //     name: "icon",
  //     validation: "",
  //     default: "",
  //     label: "Icon",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Path",
  //     name: "path",
  //     validation: "",
  //     default: "",
  //     label: "Path",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "text",
  //     placeholder: "Element Name",
  //     name: "element",
  //     validation: "",
  //     default: "",
  //     label: "Element Name",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "checkbox",
  //     placeholder: "Status",
  //     name: "status",
  //     validation: "",
  //     default: "true",
  //     label: "Status",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  //   {
  //     type: "checkbox",
  //     placeholder: "Is Link",
  //     name: "isLink",
  //     validation: "",
  //     default: "false",
  //     label: "Is Link",
  //     required: true,
  //     view: true,
  //     add: true,
  //     update: true,
  //   },
  // ]);

  // const [actions] = useState([
  //   {
  //     element: "button",
  //     type: "subList",
  //     id: "sub-menu",
  //     itemTitle: "title",
  //     title: "Order",
  //     attributes: timingAttributes,
  //     params: {
  //       api: `sub-menu`,
  //       parentReference: "menu",
  //       itemTitle: "label",
  //       shortName: "Sub Menu",
  //       addPrivilege: true,
  //       delPrivilege: true,
  //       updatePrivilege: true,
  //       customClass: "medium",
  //       formMode: "double",
  //     },
  //   },
  // ]);

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
