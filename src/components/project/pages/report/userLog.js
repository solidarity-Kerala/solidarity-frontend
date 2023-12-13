import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";

const SubscriberLog = (props) => {
    useEffect(() => {
        document.title = `Subscriber Log - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "select",
            apiType: "API",
            selectApi: "user/select",
            placeholder: "User",
            name: "user",
            validation: "",
            showItem: "username",
            default: "",
            tag: true,
            label: "User",
            required: true,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "date",
            placeholder: "Date",
            name: "date",
            collection: "",
            showItem: "",
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
            type: "date",
            placeholder: "Effective Date",
            name: "effectiveDate",
            collection: "",
            showItem: "",
            validation: "",
            default: "",
            tag: true,
            label: "Effective Date",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "select",
            placeholder: "Action",
            name: "action",
            validation: "",
            default: "",
            tag: true,
            label: "Action",
            required: true,
            view: true,
            add: true,
            update: true,
            selectApi: "Deleted,Swapped,Skipped,Paused,CustomRecipe",
            apiType: "CSV",
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "mealtime-category/select",
            placeholder: "Mealtime Category",
            name: "mealtimeCategory",
            validation: "",
            showItem: "mealtimeCategoriesName",
            default: "",
            tag: true,
            label: "Mealtime Category",
            required: false,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "recipes/select",
            placeholder: "Current Recipe",
            name: "currentRecipe",
            validation: "",
            showItem: "title",
            default: "",
            tag: true,
            label: "Current Recipe",
            required: false,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
        {
            type: "select",
            apiType: "API",
            selectApi: "recipes/select",
            placeholder: "Replaced Recipe",
            name: "replacedRecipe",
            validation: "",
            showItem: "title",
            default: "",
            tag: true,
            label: "Replaced Recipe",
            required: false,
            view: true,
            add: true,
            update: true,
            filter: false,
        },
    ]);

    return (
        <Container className="noshadow">
            {/* Render a ListTable component */}
            <ListTable
                // actions={actions}
                api={`subscriber-log`}
                itemTitle={{ name: "username", type: "text", collection: "user" }}
                // profileImage="photo"
                shortName={`Subscriber Log`}
                formMode={`double`}
                viewMode="table"
                {...props}
                attributes={attributes}
                datefilter={true}
            ></ListTable>
        </Container>
    );
};

export default Layout(SubscriberLog);
