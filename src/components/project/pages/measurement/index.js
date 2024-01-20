import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Measurement = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Measurement - Diet Food Management Portal`;
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
            placeholder: "Weight",
            name: "weight",
            validation: "",
            default: "",
            tag: true,
            label: "Weight",
            required: true,
            view: true,
            add: true,
            update: true,
        },
    ]);

    return (
        <Container className="noshadow">
            {/* Render a ListTable component */}
            <ListTable
                // actions={actions}
                api={`measurement`}
                itemTitle={{ name: "weight", type: "text", collection: "", }}
                shortName={`Measurement`}
                formMode={`single`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};

export default Layout(Measurement);
