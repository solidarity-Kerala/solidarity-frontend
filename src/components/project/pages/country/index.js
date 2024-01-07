import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Country = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Country - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Country",
      name: "title",
      validation: "",
      default: "",
      tag: true,
      label: "Country",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Country Code",
      name: "countryCode",
      validation: "",
      default: "",
      tag: true,
      label: "Country Code",
      required: true,
      view: true,
      add: true,
      update: true,
    },
    {
        type: "text",
        placeholder: "Phone Code",
        name: "phoneCode",
        validation: "",
        default: "",
        tag: true,
        label: "Phone Code",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Time Zone Value",
        name: "timeZoneValue",
        validation: "",
        default: "",
        tag: true,
        label: "Time Zone Value",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Time Zone Label",
        name: "timeZoneLabel",
        validation: "",
        default: "",
        tag: true,
        label: "Time Zone Label",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Currency",
        name: "currency",
        validation: "",
        default: "",
        tag: true,
        label: "Currency",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "CurrencyShort",
        name: "currencyShort",
        validation: "",
        default: "",
        tag: true,
        label: "Currency Short",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Currency Symbol",
        name: "currencySymbol",
        validation: "",
        default: "",
        tag: true,
        label: "Currency Symbol",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Currency Flag",
        name: "currencyFlag",
        validation: "",
        default: "",
        tag: true,
        label: "Currency Flag",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Name of State Tax",
        name: "nameofStateTax",
        validation: "",
        default: "",
        tag: true,
        label: "Name of State Tax",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "State Tax",
        name: "stateTax",
        validation: "",
        default: "",
        tag: true,
        label: "State Tax",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Name of Central Tax",
        name: "nameofCentralTax",
        validation: "",
        default: "",
        tag: true,
        label: "Name of Central Tax",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "text",
        placeholder: "Central Tax",
        name: "centralTax",
        validation: "",
        default: "",
        tag: true,
        label: "Central Tax",
        required: true,
        view: true,
        add: true,
        update: true,
      },
      
  ]);

  // Use the useTranslation hook from react-i18next to handle translations
  // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
  return (
    <Container className="noshadow">
      {/* Render a ListTable component */}
      <ListTable
        // actions={actions}
        api={`country`}
        itemTitle={{
          name: "title",
          type: "text",
          collection: "",
        }}
        shortName={`country`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};

export default Layout(Country);
