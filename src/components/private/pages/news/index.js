import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const News = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `News - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Title",
            name: "title",
            validation: "",
            default: "",
            label: "Title",
            // tag: true,
            required: true,
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
            label: "Description",
            tag: true,
            required: true,
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
            label: "Date",
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
    ]);

    return (
        <Container className="noshadow">
            <ListTable
                // actions={actions}
                api={`news`}
                itemTitle={{ name: "title", type: "text", collection: "" }}
                shortName={`News`}
                formMode={`single`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(News);
