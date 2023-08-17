import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AdministrativeCouncil = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Administrative Council - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "title",
            title: "English",
            name: "enName",
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Name",
            name: "enName",
            validation: "",
            default: "",
            label: "Name",
            // tag: true,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Designation",
            name: "enDesignation",
            validation: "",
            default: "",
            label: "Designation",
            tag: true,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Description",
            name: "enDescription",
            validation: "",
            default: "",
            label: "Description",
            tag: true,
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "image",
            placeholder: "Image",
            name: "image",
            validation: "",
            default: "false",
            tag: true,
            label: "Image",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "checkbox",
            placeholder: "Active",
            name: "active",
            validation: "",
            default: "false",
            tag: true,
            label: "Active",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "title",
            title: "Arabic",
            name: "arName",
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Name",
            name: "arName",
            validation: "",
            default: "",
            label: "Name",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Designation",
            name: "arDesignation",
            validation: "",
            default: "",
            label: "Designation",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Description",
            name: "arDescription",
            validation: "",
            default: "",
            label: "Description",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "title",
            title: "Urdu",
            name: "urName",
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Name",
            name: "urName",
            validation: "",
            default: "",
            label: "Name",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Designation",
            name: "urDesignation",
            validation: "",
            default: "",
            label: "Designation",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Description",
            name: "urDescription",
            validation: "",
            default: "",
            label: "Description",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
    ]);

    return (
        <Container className="noshadow">
            <ListTable
                // actions={actions}
                api={`administrative-council`}
                itemTitle={{ name: "enName", type: "text", collection: "" }}
                shortName={`Administrative Council`}
                formMode={`double`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(AdministrativeCouncil);
