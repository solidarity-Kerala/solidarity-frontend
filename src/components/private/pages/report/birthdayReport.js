import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";

const BirthdayReport = (props) => {
    useEffect(() => {
        document.title = `Birthday Report - Diet Food Management Portal`;
    }, []);

    // const themeColors = useSelector((state) => state.themeColors);

    const [attributes] = useState([
        {
            type: "text",
            placeholder: "Name",
            name: "cprNumber",
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
            type: "textarea",
            placeholder: "Address",
            name: "address",
            validation: "",
            default: "",
            tag: true,
            label: "Address",
            required: false,
            view: true,
            add: true,
            update: true,
        },
        {
            type: "date",
            placeholder: "Date Of Birth",
            name: "dateOfBirth",
            validation: "",
            default: "",
            tag: true,
            label: "Date Of Birth",
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
                api={`user/subscriber/birthday`}
                itemTitle={{ name: "cprNumber", type: "text", collection: "" }}
                // profileImage="photo"
                shortName={`Birthday`}
                formMode={`double`}
                {...props}
                attributes={attributes}
                datefilter={true}
            ></ListTable>
        </Container>
    );
};

export default Layout(BirthdayReport);
