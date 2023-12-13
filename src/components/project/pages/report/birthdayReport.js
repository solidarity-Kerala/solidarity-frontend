import React, { useEffect, useState } from "react";
import Layout from "../../../core/layout";
import ListTable from "../../../core/list/list";
import { Container } from "../../../core/layout/styels";

const BirthdayReport = (props) => {
    useEffect(() => {
        document.title = `Birthday Report - Diet Food Management Portal`;
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
            name: "userName",
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
                viewMode="table"
                {...props}
                attributes={attributes}
                datefilter={true}
            ></ListTable>
        </Container>
    );
};

export default Layout(BirthdayReport);
