import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const DaySlot = (props) => {
    //to update the page title
    useEffect(() => {
        document.title = `Day Slot - Diet Food Management Portal`;
    }, []);

    const [attributes] = useState([
        {
            type: "select",
            placeholder: "Day",
            name: "day",
            validation: "",
            default: "",
            tag: true,
            label: "Day",
            showItem: "",
            required: true,
            view: true,
            filter: false,
            add: true,
            update: false,
            apiType: "CSV",
            selectApi: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        },
        {
            type: "text",
            placeholder: "Available Slots",
            name: "availableSlots",
            validation: "",
            default: "",
            tag: true,
            label: "Available Slots",
            required: true,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "number",
            placeholder: "Maximum Booking Per Slot",
            name: "maxBookingsPerSlot",
            validation: "",
            default: "",
            tag: true,
            label: "Maximum Booking Per Slot",
            required: true,
            view: true,
            add: true,
            update: true,
        },
    ]);

    // Use the useTranslation hook from react-i18next to handle translations
    // const parkingDuration = totalDuration > 120 ? (days > 0 ? days + `d, ` : ``) + (hours > 0 ? hours + `h, ` : ``) + (minutes + t("m")) : totalDuration.toFixed(0) + ` ` + t("minutes");
    return (
        <Container className="noshadow">
            {/* Render a ListTable component */}
            <ListTable
                // actions={actions}
                api={`day-slot`}
                itemTitle={{
                    name: "availableSlots",
                    type: "text",
                    collection: "",
                }}
                shortName={`Day Slot`}
                formMode={`double`}
                {...props}
                attributes={attributes}
            ></ListTable>
        </Container>
    );
};

export default Layout(DaySlot);
