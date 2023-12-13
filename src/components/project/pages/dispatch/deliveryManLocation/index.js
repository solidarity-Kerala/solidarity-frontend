import React, { useEffect, useState } from "react";
//
import Layout from "../../../../core/layout";
import ListTable from "../../../../core/list/list";
import { Container } from "../../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const DeliveryManLocation = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Delivery Location- Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Delivery Location",
      name: "deliveryLocation",
      validation: "",
      default: "",
      label: "Delivery Location",
      required: true,
      view: true,
      add: true,
      update: true,
    },{
      type: "select",
      apiType: "API",
      selectApi: "user/select?userType=64815bde89e0a44fc31c53b0",
      placeholder: "Delivery Men",
      name: "deliveryMan",
      validation: "",
      showItem: "userDisplayName",
      default: "",
      tag: true,
      label: "Delivery Men",
      required: true,
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
        api={`deliveryman-location`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "deliveryLocation", type: "text", collection: "" }}
        shortName={`Delivery Location`}
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
export default Layout(DeliveryManLocation);
