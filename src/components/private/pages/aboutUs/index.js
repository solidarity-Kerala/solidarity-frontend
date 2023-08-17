import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const AboutUs = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `About Us - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Vision",
            name: "vision",
            validation: "",
            default: "",
            label: "Vision",
            // tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Mission",
            name: "mission",
            validation: "",
            default: "",
            label: "Mission",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Short Description",
            name: "shortDescription",
            validation: "",
            default: "",
            label: "Short Description",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Long Description",
            name: "longDescription",
            validation: "",
            default: "",
            label: "Long Description",
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
                api={`about-us`}
                itemTitle={{ name: "vision", type: "text", collection: "" }}
                shortName={`About Us`}
                formMode={`single`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(AboutUs);
