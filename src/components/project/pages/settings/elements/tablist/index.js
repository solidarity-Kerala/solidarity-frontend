import { useState } from "react";
import { ElementContainer, ListTabs } from "../../../../../core/elements";
export const Tab5 = (props) => {
  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Page Title",
      name: "pageTitle",
      validation: "",
      default: "",
      tag: true,
      label: "Page Title",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Meta",
      name: "meta",
      validation: "",
      default: "",
      tag: true,
      label: "Meta",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "textarea",
      placeholder: "Page Content",
      name: "pageContent",
      validation: "",
      default: "",
      tag: true,
      label: "Page Content",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Slug",
      name: "slug",
      validation: "",
      default: "",
      tag: true,
      label: "Slug",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);
  const [actions] = useState([
    {
      element: "button",
      type: "subItem",
      id: "user/subscriber/web",
      itemTitle: {
        name: "username",
        type: "text",
        collection: "user",
      },
      title: "Medical Record",
      attributes: attributes,
      params: {
        api: `user/subscriber/web`,
        parentReference: "user",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "user",
        },
        shortName: "Medical Record",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        //if you want to show edit button for passed previlges then make value for condtion is 'true' or you dont want to give edit option for the pased previlges then 'false'
        customClass: "medium",
        formMode: "double",
      },
    },
    {
      element: "button",
      type: "subList",
      id: "user/subscriber/web",
      itemTitle: {
        name: "username",
        type: "text",
        collection: "user",
      },
      title: "Medical Records",
      attributes: attributes,
      params: {
        api: `user/subscriber/web`,
        parentReference: "user",
        itemTitle: {
          name: "username",
          type: "text",
          collection: "user",
        },
        shortName: "Medical Record",
        addPrivilege: true,
        delPrivilege: true,
        updatePrivilege: true,
        //if you want to show edit button for passed previlges then make value for condtion is 'true' or you dont want to give edit option for the pased previlges then 'false'
        customClass: "medium",
        formMode: "double",
      },
    },
  ]);

  return (
    <ElementContainer className="column">
      <ListTabs actions={actions} titleValue={"Users"} setLoaderBox={props.setLoaderBox} setMessage={props.setMessage}></ListTabs>
    </ElementContainer>
  );
};
