import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file

const Invoice = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Plan Category - Diet Food Management Portal`;
  }, []);
  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Invoice Number",
      name: "invoiceNumber",
      validation: "",
      showItem: "",
      default: "",
      tag: true,
      label: "Invoice Number",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
        type: "date",
        placeholder: "Date Issued",
        name: "dateIssued",
        validation: "",
        showItem: "",
        default: "",
        tag: true,
        label: "Date Issued",
        required: true,
        view: true,
        add: true,
        update: true,
        filter:true,
      },
      {
        type: "text",
        placeholder: "Name",
        name: "fullName",
        validation: "",
        collection:"user",
        showItem: "fullName",
        default: "",
        tag: true,
        label: "Name",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "number",
        placeholder: "Price",
        name: "price",
        validation: "",
        showItem: "",
        default: "",
        tag: true,
        label: "Price",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "number",
        placeholder: "Tax",
        name: "tax",
        validation: "",
        showItem: "",
        default: "",
        tag: true,
        label: "Tax",
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
        showItem: "",
        default: "",
        tag: true,
        label: "Discount",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "number",
        placeholder: "Total",
        name: "total",
        validation: "",
        showItem: "",
        default: "",
        tag: true,
        label: "Total",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "textarea",
        placeholder: "Billing Address",
        name: "billingAddress",
        validation: "",
        showItem: "",
        default: "",
        tag: true,
        label: "Billing Address",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      
      {
        type: "select",
        placeholder: "Payment Mode",
        listView: true,
        name: "paymentMode",
        validation: "",
        label: "Payment Mode",
        required: true,
        view: true,
        add: true,
        tag: true,
        update: true,
        apiType: "JSON",
        search: false,
        filter:true,
        selectApi: [
          { value: "Cash", id: "Cash" },
          { value: "CreditCard", id: "CreditCard" },
          { value: "DebitCard", id: "DebitCard" },
          { value: "OnlineTransfer", id: "OnlineTransfer" },
        ],
      },
      
  ]);
  const themeColors = useSelector((state) => state.themeColors);
  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`invoice`}
        displayColumn="double"
        // itemTitle={`userDisplayName`}
        itemTitle={{ name: "title", type: "text", collection: "" }}
        shortName={`Invoice`}

        formMode={`double`}
        viewMode="table"
        themeColors={themeColors}
        // formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
export default Layout(Invoice);
