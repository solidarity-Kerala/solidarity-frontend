import React, { useEffect, useState } from "react";
import Layout from "../../../elements/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../../elements/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const ErrorLog = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Error Log - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "date",
            placeholder: "Date",
            name: "date",
            validation: "",
            default: "",
            tag: true,
            label: "Date",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Page",
            name: "page",
            validation: "",
            default: "",
            tag: true,
            label: "Page",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "API",
            name: "api",
            validation: "",
            default: "",
            tag: true,
            label: "API",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Error",
            name: "error",
            validation: "",
            default: "",
            tag: true,
            label: "Error",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "select",
            placeholder: "Status",
            name: "status",
            validation: "",
            default: "Occurred",
            tag: true,
            label: "Status",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
            selectApi: "Occurred,Solved",
            apiType: "CSV",
        },
    ]);

    return (
        <Container className="noshadow">
            {/* Render a ListTable component */}
            <ListTable
                // actions={actions}
                api={`error-log`}
                itemTitle={{ name: "date", type: "text", collection: "", }}
                shortName={`Error Log`}
                formMode={`single`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};

export default Layout(ErrorLog);
