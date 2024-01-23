import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AddFile = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Files - Diet Food Management Portal`;
  }, []);

  const [attributes] = useState([
    {
        type: "text",
        placeholder: "Name",
        name: "name",
        validation: "",
        default: "",
        tag: true,
        label: "Name",
        required: false,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "date",
        placeholder: "Date",
        name: "date",
        validation: "",
        default: "",
        tag: true,
        label: "Date",
        required: false,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "textarea",
        placeholder: "Description",
        name: "description",
        validation: "",
        default: "",
        tag: true,
        label: "Description",
        required: false,
        view: true,
        add: true,
        update: true,
      },
      {
        type: "file",
        placeholder: "Files Attached",
        name: "fileAttachment",
        validation: "",
        default: "",
        tag: true,
        label: "Files Attached",
        required: false,
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
        api={`add-file`}
        itemTitle={{
          name: "name",
          type: "text",
          collection: "",
        }}
        shortName={`Files`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};

export default Layout(AddFile);
