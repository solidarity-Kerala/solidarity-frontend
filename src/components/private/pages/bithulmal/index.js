import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const Bithulmal = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Bithulmal - Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "Month",
      name: "month",
      validation: "",
      default: "",
      label: "month",
      tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "member/select",
      placeholder: "memberId",
      name: "memberId",
      showItem: "name",
      validation: "",
      default: "",
      tag: true,
      label: "MemberId",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "select",
      apiType: "API",
      selectApi: "members-group/select",
      placeholder: "Group ID",
      name: "groupId",
      showItem: "groupName",
      validation: "",
      default: "",
      tag: true,
      label: "Group ID",
      required: false,
      view: true,
      add: true,
      update: true,
      filter: false,
    },
    {
      type: "text",
      placeholder: "AmountPaid",
      name: "amountPaid",
      validation: "",
      default: "",
      label: "AmountPaid",
      tag: true,
      required: false,
      view: true,
      add: true,
      update: true,
    },
    {
      type: "select",
      placeholder: "Status",
      name: "status",
      validation: "",
      default: "",
      tag: true,
      label: "Status",
      showItem: "status",
      required: false,
      view: false,
      filter: false,
      add: true,
      update: true,
      apiType: "CSV",
      selectApi: "Paid,Unpaid",
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`bithulmal`}
        itemTitle={{ name: "status", type: "text", collection: "" }}
        shortName={`Bithulmal`}
        formMode={`single`}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(Bithulmal);
