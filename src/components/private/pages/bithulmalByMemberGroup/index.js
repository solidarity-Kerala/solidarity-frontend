import React, { useEffect, useState } from "react";
import Layout from "../../common/layout";
import ListTable from "../../../elements/list/list";
import { Container } from "../../common/layout/styels";
//src/components/styles/page/index.js
//if you want to write custom style wirte in above file
const BithulmalByMemberGroup = (props) => {
  //to update the page title
  useEffect(() => {
    document.title = `Bithulmal By MemberGroup- Membership Mangement`;
  }, []);

  const [attributes] = useState([
    {
      type: "text",
      placeholder: "groupId",
      name: "_id",
      validation: "",
      default: "",
      label: "groupId",
      tag: true,
      required: false,
      view: true,
      add: false,
      update: false,
    },
    {
      type: "text",
      placeholder: "AmountPaid",
      name: "amount",
      validation: "",
      default: "",
      label: "AmountPaid",
      tag: true,
      required: false,
      view: true,
      add: false,
      update: false,
    },
  ]);

  return (
    <Container className="noshadow">
      <ListTable
        // actions={actions}
        api={`bithulmal/report/member-group`}
        itemTitle={{ name: "_id", type: "text", collection: "" }}
        shortName={`Bithulmal by MemberGroup`}
        formMode={`single`}
        // viewMode={"subItem"}
        {...props}
        attributes={attributes}
      ></ListTable>
    </Container>
  );
};
// exporting the page with parent container layout..
export default Layout(BithulmalByMemberGroup);
