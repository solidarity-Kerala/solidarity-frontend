import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const OrderStatus = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Order Status - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Order Status",
      name: "orderStatus",
      validation: "",
      default: "",
      tag: true,
      label: "Order Status",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Color",
      name: "color",
      validation: "",
      default: "",
      label: "Color",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Sequence",
      name: "sequence",
      validation: "",
      default: "",
      label: "Sequence",
      tag: true,
      required: true,
      view: true,
      add: true,
      update: true,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        api={`order-statuses`}
        displayColumn="double"
        itemTitle={{ name: "orderStatus", type: "text", collection: "" }}
        shortName={`Order Status`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(OrderStatus);
