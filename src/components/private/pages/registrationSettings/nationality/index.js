import React, { useEffect, useState } from "react";
import Layout from "../../../common/layout";
import ListTable from "../../../../elements/list/list";
import { Container } from "../../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Nationality = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Nationality  - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Nationality",
            name: "nationality",
            validation: "",
            default: "",
            tag: false,
            label: "Nationality",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "checkbox",
            placeholder: "Status",
            name: "isActive",
            validation: "",
            default: "",
            tag: true,
            label: "Status",
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
                // Actions to be displayed in the ListTable
                // actions={actions}
                // API endpoint for fetching menu data
                api={``}
                displayColumn="double"
                // Property name for the title of each menu item
                itemTitle={{ name: "nationality", type: "text", collection: "" }}
                // Short name or label for the menu
                shortName={`Nationality`}
                // Privilege flag indicating whether the user can add menu items
                {...props}
                // Additional attributes related to the menu
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};
// exporting the page with parent container layout..
export default Layout(Nationality);
