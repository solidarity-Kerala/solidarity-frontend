import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logout, MNav, Status, Title } from "./styels";
import { menuStatus } from "../../../../../store/actions/common";
import { LogoutIcon, MenuIcon } from "../../../../../icons";
import { clearLogin } from "../../../../../store/actions/login";
const Header = (props) => {
  const dispatch = useDispatch();
  const menuCurrentStatus = useSelector((state) => state.menuStatus);
  // const currentMenu = useSelector((state) => state.currentMenu);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);

  const navigate = useNavigate();
  return (
    <Container>
      <MNav
        onClick={() => {
          dispatch(menuStatus(!menuCurrentStatus));
        }}
      >
        <MenuIcon />
      </MNav>
      <Status>
        <Title>{selectedMenuItem.label}</Title>
        {/* <User>{props.user.user.email}</User> */}
        <Logout
          onClick={() => {
            dispatch(clearLogin());
            navigate("/");
          }}
        >
          <LogoutIcon />
        </Logout>
      </Status>
    </Container>
  );
};

export default Header;
