import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const BithulmalByMemberGroup = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Bithulmal By MemberGroup - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Amount Paid",
      name: "amountPaid",
      validation: "",
      default: "",
      tag: true,
      label: "Amount Paid",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "text",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "",
      tag: true,
      label: "Status",
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "date",
      placeholder: "Date",
      name: "month",
      validation: "",
      default: "",
      tag: true,
      label: "Date",
      required: false,
      view: true,
      add: false,
      update: false,
      filter: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "members-group/select",
      placeholder: "Group",
      name: "group",
      collection: "group",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Group",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "member/select",
      placeholder: "Member",
      name: "member",
      collection: "member",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Member",
      required: false,
      view: false,
      add: false,
      update: false,
      filter: true,
    },
    // {
    //   type: "date",
    //   placeholder: "Booking Date",
    //   name: "bookingDate",
    //   validation: "",
    //   default: "",
    //   tag: true,
    //   label: "Booking Date",
    //   required: false,
    //   view: true,
    //   add: true,
    //   update: true,
    //   filter: true,
    // },
  ]);

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        datefilter="true"
        // preFilter={{ startDate: startOfDay, endDate: endOfDay }}
        api={`bithulmal`}
        itemTitle={{ name: "name", type: "text", collection: "member" }}
        shortName={`bithulmal`}
        formMode={`double`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(BithulmalByMemberGroup);
