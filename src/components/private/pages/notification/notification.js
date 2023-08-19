import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Notification = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Notification - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "select",
            apiType: "API",
            selectApi: "franchise/select",
            placeholder: "Franchise",
            name: "franchise",
            showItem: "name",
            validation: "",
            default: "",
            label: "Franchise",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "user-type/select",
            placeholder: "User Role",
            name: "role",
            showItem: "role",
            validation: "",
            default: "",
            label: "User role",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "text",
            placeholder: "Title",
            name: "title",
            validation: "",
            default: "",
            label: "Title",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "textarea",
            placeholder: "Message",
            name: "message",
            validation: "",
            default: "",
            tag: true,
            label: "Message",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "image",
            placeholder: "Image",
            name: "banner",
            validation: "",
            default: "",
            tag: true,
            label: "Image",
            required: false,
            view: true,
            add: true,
            update: false,
        },

    ]);

    return (
        <Container className="noshadow">
            {/* Render a ListTable component */}
            <ListTable
                // Actions to be displayed in the ListTable
                // actions={actions}
                // API endpoint for fetching menu data
                api={`notification`}
                // Property name for the title of each menu item
                // itemTitle={`label`}
                itemTitle={{ name: "title", type: "text", collection: "" }}
                // Short name or label for the menu
                shortName={`Notification`}
                formMode={`double`}
                // Privilege flag indicating whether the user can add menu items
                {...props}
                // Additional attributes related to the menu
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(Notification);
