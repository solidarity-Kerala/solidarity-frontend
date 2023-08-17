import React from "react";
import { Link } from "react-router-dom";
import { Header, MenuGroup, Nav, SubMenu } from "./styels";
import { useTranslation } from "react-i18next"; // react-i18next hook for translations
import { useDispatch, useSelector } from "react-redux";
import { currentMenu, menuStatus, openedMenu, selectedMenu } from "../../../../../store/actions/common";
import { CloseIcon, GetIcon } from "../../../../../icons";
import { Logo, MNavClose } from "../header/styels";
import { logo } from "../../../../../images";
const Menu = (props) => {
  const { t } = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);
  const openedMenus = useSelector((state) => state.openedMenu);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();
  return (
    <>
      <Logo src={logo} alt="logo" />
      <Header>
        {/* <User>{props.user.user.email}</User> */}
        {/* <Logout
          onClick={() => {
            dispatch(clearLogin());
            navigate("/");
          }}
        >
          <LogoutIcon />
        </Logout> */}
        <MNavClose
          onClick={() => {
            dispatch(menuStatus(false));
          }}
        >
          <CloseIcon />
        </MNavClose>
      </Header>
      <Nav theme={themeColors}>
        {/* Link to the home page */}
        {props.user.menu?.map((menuItem) => (
          <div key={menuItem._id}>
            {menuItem.submenus.length > 0 ? (
              <React.Fragment>
                <MenuGroup
                  key={menuItem._id}
                  href="#"
                  onClick={() => {
                    console.log(menuItem);
                    dispatch(openedMenu(menuItem._id));
                  }}
                  className={openedMenus[menuItem._id] === true ? "open active" : " open"}
                >
                  <GetIcon icon={menuItem.icon} /> <span>{t(menuItem.label)} </span>
                  <GetIcon icon={"down"}></GetIcon>
                </MenuGroup>
                <SubMenu className={openedMenus[menuItem._id] === true ? "down" : "close"}>
                  {menuItem.submenus?.map((submenu) => (
                    <Link
                      key={submenu._id} // Use submenu.label as the key
                      onClick={() => {
                        dispatch(menuStatus(false));
                        dispatch(selectedMenu(submenu));
                        dispatch(currentMenu(submenu.label)); // Use submenu.label in currentMenu dispatch
                      }}
                      className={submenu._id === selectedMenuItem._id ? "main active" : "main"} // Use submenu.path for the active class
                      to={submenu.path} // Use submenu.path for the link destination
                    >
                      <GetIcon icon={submenu.icon} />
                      <span> {t(submenu.label)}</span> {/* Use submenu.label for the link text */}
                    </Link>
                  ))}
                </SubMenu>
              </React.Fragment>
            ) : (
              <Link
                onClick={() => {
                  dispatch(menuStatus(false));
                  dispatch(selectedMenu(menuItem));
                  dispatch(currentMenu(menuItem.label));
                }}
                className={menuItem._id === selectedMenuItem._id ? "main active" : "main"}
                to={menuItem.path}
              >
                <GetIcon icon={menuItem.icon} /> {t(menuItem.label)}
              </Link>
            )}
          </div>
        ))}
      </Nav>
    </>
  );
};

export default Menu;
