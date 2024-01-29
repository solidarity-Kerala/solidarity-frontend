import React from "react";
import Menu from "../pages /menu/index.js";
import Franchise from "../pages /franchise/index.js";
import Login from "../../public/login";
import Page404 from "../pages /page404/index.js";
import UserType from "../pages /user/userType/index.js";
import UserList from "../pages /user/userList/index.js";
import Dashboard from "../pages /dashboard/index.js";
import PageSettings from "../pages /settings/pageSettings/index.js";
import Area from "../pages /area/index.js";
import District from "../pages /district/index.js";
import Members from "../pages /members/index.js";
import Membergroup from "../pages /membergroup/index.js";
import MemberStatus from "../pages /memberStatus/index.js";
import Attendance from "../pages /attendance/index.js";
import Bithulmal from "../pages /bithulmal/index.js";
import Designation from "../pages /designation/index.js";
import Unit from "../pages /unit/index.js";
// import BithulmalReport from "../../private/pages/bithulmalReport";
// import BithulmalByMemberGroup from "../../private/pages/bithulmalByMemberGroup";
// import AttendanceByMembergroup from "../../private/pages/attendanceByMembergroup";
// import AttendanceBymonth from "../../private/pages/attendanceBymonth";

/**
 * Switch component to render different pages based on the provided page prop.
 * @param {string} page - The page to be rendered.
 * @param {string} key - The key prop for React's list reconciliation.
 * @param {boolean} addPrivilege - Flag indicating whether the user has add privilege.
 * @param {boolean} delPrivilege - Flag indicating whether the user has delete privilege.
 * @param {boolean} updatePrivilege - Flag indicating whether the user has update privilege.
 * @returns {JSX.Element} - The JSX element representing the rendered page.
 */

const Switch = ({
  page,
  key,
  addPrivilege = false,
  delPrivilege = false,
  updatePrivilege = false,
  exportPrivilege = false,
}) => {
  switch (page) {
    case "login":
      return <Login key={key} />;
    case "menu":
      return (
        <Menu
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "franchise":
      return (
        <Franchise
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "user-role":
      return (
        <UserType
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "user-list":
      return (
        <UserList
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "page-settings":
      return (
        <PageSettings
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "dashboard":
      return (
        <Dashboard
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "area":
      return (
        <Area
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "district":
      return (
        <District
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "members":
      return (
        <Members
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "member-group":
      return (
        <Membergroup
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "member-status":
      return (
        <MemberStatus
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "attendence":
      return (
        <Attendance
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "bithulmal":
      return (
        <Bithulmal
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
      case "designation":
        return (
          <Designation
            key={key}
            exportPrivilege={exportPrivilege}
            addPrivilege={addPrivilege}
            delPrivilege={delPrivilege}
            updatePrivilege={updatePrivilege}
          />
        );
        case "unit":
          return (
            <Unit
              key={key}
              exportPrivilege={exportPrivilege}
              addPrivilege={addPrivilege}
              delPrivilege={delPrivilege}
              updatePrivilege={updatePrivilege}
            />
          );
    // case "bithulmal-report":
    //   return (
    //     <BithulmalReport
    //       key={key}
    //       exportPrivilege={exportPrivilege}
    //       addPrivilege={addPrivilege}
    //       delPrivilege={delPrivilege}
    //       updatePrivilege={updatePrivilege}
    //     />
    //   );
    // case "bithulmal-membergroup":
    //   return (
    //     <BithulmalByMemberGroup
    //       key={key}
    //       exportPrivilege={exportPrivilege}
    //       addPrivilege={addPrivilege}
    //       delPrivilege={delPrivilege}
    //       updatePrivilege={updatePrivilege}
    //     />
    //   );
    // case "attendence-by-memberGroup":
    //   return (
    //     <AttendanceByMembergroup
    //       key={key}
    //       exportPrivilege={exportPrivilege}
    //       addPrivilege={addPrivilege}
    //       delPrivilege={delPrivilege}
    //       updatePrivilege={updatePrivilege}
    //     />
    //   );
    // case "attendence-by-month":
    //   return (
    //     <AttendanceBymonth
    //       key={key}
    //       exportPrivilege={exportPrivilege}
    //       addPrivilege={addPrivilege}
    //       delPrivilege={delPrivilege}
    //       updatePrivilege={updatePrivilege}
    //     />
    //   );
    default:
      return <Page404 key={key}></Page404>;
  }
};

export default Switch;
