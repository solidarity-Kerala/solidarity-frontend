import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const LabelPrintSetting = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Label Print Setting - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "textarea",
            placeholder: "Foot Note",
            name: "footNote",
            validation: "",
            default: "",
            label: "Foot Note",
            tag: false,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Address",
            name: "address",
            validation: "",
            default: "",
            label: "Address",
            tag: true,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Contact",
            name: "contact",
            validation: "",
            default: "",
            label: "Contact",
            tag: true,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "image",
            placeholder: "Image",
            name: "logo",
            validation: "",
            default: "",
            tag: true,
            label: "Image",
            required: false,
            view: true,
            add: true,
            update: true,
        },
    ]);

    return (
        <Container className="noshadow">
            <ListTable
                api={`label-print-setting`}
                itemTitle={{ name: "footNote", type: "text", collection: "" }}
                shortName={`Label Print Setting`}
                displayColumn="single"
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(LabelPrintSetting);
