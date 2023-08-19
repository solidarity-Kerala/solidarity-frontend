import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const RedeemCoupon = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Redeem Coupon - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Coupon",
      name: "coupon",
      validation: "",
      default: "",
      tag: true,
      label: "Coupon",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Coupon Code",
      name: "code",
      validation: "",
      default: "",
      tag: true,
      label: "Coupon Code",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    // {
    //   type: "text",
    //   placeholder: "Discount Type",
    //   name: "type",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Coupon Type",
    //   required: true,
    //   view: true,
    //   add: true,
    //   update: true,
    // },
    {
      type: "select",
      apiType: "API",
      selectApi: "discount-type/select",
      placeholder: "Discount Type",
      name: "discountType",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Discount Type",
      required: true,
      view: false,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "number",
      placeholder: "User Count",
      name: "userCount",
      validation: "",
      default: "",
      tag: true,
      label: "User Count",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Min Purchase",
      name: "minPurchase",
      validation: "",
      default: "",
      tag: true,
      label: "Min Purchase",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Max Purchase",
      name: "maxDiscount",
      validation: "",
      default: "",
      tag: true,
      label: "Max Purchase",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "number",
      placeholder: "Discount",
      name: "discount",
      validation: "",
      default: "",
      tag: true,
      label: "Discount",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Customer Type",
      name: "customerType",
      validation: "",
      default: "",
      tag: true,
      label: "Customer Type",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Start Date",
      name: "startDate",
      validation: "",
      default: "",
      tag: true,
      label: "Start Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "End Date",
      name: "endDate",
      validation: "",
      default: "",
      tag: true,
      label: "End Date",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "checkbox",
      placeholder: "Is Active",
      name: "status",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Is Active",
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
        api={`redeem-coupon`}
        displayColumn="double"
        // itemTitle={`redeem coupon`}
        itemTitle={{ name: "coupon", type: "text", collection: "" }}
        // Short name or label for the menu
        shortName={`Redeem coupon`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(RedeemCoupon);
