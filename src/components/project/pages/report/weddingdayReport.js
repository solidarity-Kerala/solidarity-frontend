import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";

const WeddingdayReport = (props) => {
    useEffect(() => {
        document.title = `Wedding Day Report - Diet Food Management Portal`;
    }, []);

    // const themeColors = useSelector((state) => state.themeColors);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "CPR Number",
            name: "cprNumber",
            showItem: "",
            tag: false,
            validation: "",
            default: "",
            label: "CPR Number",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Name",
            name: "userDisplayName",
            showItem: "",
            tag: false,
            validation: "",
            default: "",
            label: "Name",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "Mobile Number",
            name: "mobileNumber",
            validation: "",
            default: "",
            tag: true,
            label: "Mobile Number",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "text",
            placeholder: "E-Mail",
            name: "emailId",
            validation: "",
            default: "",
            tag: true,
            label: "E-Mail",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "date",
            placeholder: "Anniversary Day",
            name: "weddingDay",
            validation: "",
            default: "",
            tag: true,
            label: "Anniversary Day",
            required: false,
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
                api={`user/subscriber/today-wedding-day`}
                itemTitle={{ name: "cprNumber", type: "text", collection: "" }}
                // profileImage="photo"
                shortName={`Wedding Day`}
                formMode={`double`}
                viewMode="table"
                {...props}
                attributes={attributes}
                datefilter={true}
            ></ListTable>
        </Container>
    );
};

export default Layout(WeddingdayReport);
