import React, { useEffect, useState } from "react";
//
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const AvailableSizes = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Available Calories - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Size",
      name: "size",
      validation: "",
      default: "",
      label: "Size",
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
        api={`available-sizes`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "size", type: "text", collection: "" }}
        shortName={`Available sizes`}
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
export default Layout(AvailableSizes);
