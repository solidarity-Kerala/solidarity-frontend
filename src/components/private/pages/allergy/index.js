import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Allergy = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Allergy - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Allergy",
            name: "title",
            validation: "",
            default: "",
            label: "Allergy",
            tag: false,
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
                api={`allergy`}
                itemTitle={{ name: "title", type: "text", collection: "" }}
                shortName={`Allergy`}
                displayColumn="double"
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(Allergy);
