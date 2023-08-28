import React from "react";
import Menu from "../../private/pages/menu";
import Franchise from "../../private/pages/franchise";
import Login from "../../public/login";
import Page404 from "../../private/pages/page404";
import UserType from "../../private/pages/user/userType";
import UserList from "../../private/pages/user/userList";
import Dashboard from "../../private/pages/dashboard";
import PageSettings from "../../private/pages/settings/pageSettings";
import Area from "../../private/pages/area";
import District from "../../private/pages/district";
import Designation from "../../private/pages/designation";
import Members from "../../private/pages/members";
import Membergroup from "../../private/pages/membergroup/index.js";
import MemberStatus from "../../private/pages/memberStatus";
import Attendance from "../../private/pages/attendance";
import Bithulmal from "../../private/pages/bithulmal";
import BithulmalReport from "../../private/pages/bithulmalReport";
import BithulmalByMemberGroup from "../../private/pages/bithulmalByMemberGroup";
import AttendanceByMembergroup from "../../private/pages/attendanceByMembergroup";
import AttendanceBymonth from "../../private/pages/attendanceBymonth";

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
    case "bithulmal-report":
      return (
        <BithulmalReport
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "bithulmal-membergroup":
      return (
        <BithulmalByMemberGroup
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "attendence-by-memberGroup":
      return (
        <AttendanceByMembergroup
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    case "attendence-by-month":
      return (
        <AttendanceBymonth
          key={key}
          exportPrivilege={exportPrivilege}
          addPrivilege={addPrivilege}
          delPrivilege={delPrivilege}
          updatePrivilege={updatePrivilege}
        />
      );
    default:
      return <Page404 key={key}></Page404>;
  }
};

export default Switch;
