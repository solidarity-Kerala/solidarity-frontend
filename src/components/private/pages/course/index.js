import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Course = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Course - DataHex Site Builder Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Course Name",
            name: "courseName",
            validation: "",
            default: "",
            label: "Course Name",
            // tag: true,
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
            label: "Description",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Eligibility",
            name: "eligibility",
            validation: "",
            default: "",
            label: "Eligibility",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Duration",
            name: "duration",
            validation: "",
            default: "",
            label: "Duration",
            tag: true,
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "select",
            placeholder: "Category",
            name: "category",
            validation: "",
            default: "",
            tag: true,
            label: "Category",
            showItem: "Category",
            required: false,
            view: true,
            filter: false,
            add: true,
            update: true,
            apiType: "CSV",
            selectApi: "UG,PG,Certificate",
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
                api={`course`}
                itemTitle={{ name: "courseName", type: "text", collection: "" }}
                shortName={`Course`}
                formMode={`single`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(Course);
