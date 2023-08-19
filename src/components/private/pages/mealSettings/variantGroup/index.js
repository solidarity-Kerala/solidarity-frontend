import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const VariantGroup = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `variant Group - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "variant Group",
      name: "variantGroupName",
      validation: "",
      default: "",
      tag: true,
      label: "Variant Group Name",
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  const [addVariantLevel] = useState([
    {
      type: "text",
      apiType: "",
      selectApi: "",
      placeholder: "Variant Level",
      name: "variantLevelName",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Variant Level",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "variant-group/select",
      placeholder: "Variant Group",
      name: "variantGroup",
      validation: "",
      showItem: "variantGroupName",
      default: "",
      tag: true,
      label: "Variant Group",
      required: true,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
  ]);

  const [actions] = useState([
    {
      element: "button",
      type: "subList",
      id: "variantLevelName",
      // itemTitle: "username",
      itemTitle: {
        name: "variantLevelName",
        type: "text",
        collection: "",
      },
      title: "Variant Level",
      attributes: addVariantLevel,
      params: {
        api: `variant-level`,
        parentReference: "",
        // itemTitle: "username",
        itemTitle: {
          name: "variantLevelName",
          type: "text",
          collection: "",
        },
        shortName: "Variant Level",
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
        api={`variant-group`}
        displayColumn="double"
        // itemTitle={`label`}
        itemTitle={{ name: "variantGroupName", type: "text", collection: "" }}
        shortName={`Variant Group`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(VariantGroup);
