import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DiscountType = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Discount Type - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Discount Type",
      name: "discountTypeName",
      validation: "",
      default: "",
      tag: true,
      label: "Discount Type",
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
        api={`discount-type`}
        displayColumn="double"
        // itemTitle={`label`}
        itemTitle={{ name: "discountTypeName", type: "text", collection: "" }}
        shortName={`Discount Type`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(DiscountType);
