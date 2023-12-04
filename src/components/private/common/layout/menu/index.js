import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, MenuGroup, Nav, SubMenu } from "./styels";
import { useTranslation } from "react-i18next"; // react-i18next hook for translations
import { useDispatch, useSelector } from "react-redux";
import { currentMenu, menuStatus, openedMenu, selectedMenu } from "../../../../../store/actions/common";
import { CloseIcon, GetIcon } from "../../../../../icons";
import { Logo, MNavClose } from "../header/styels";
import { logo } from "../../../../../images";
import Search from "../../../../elements/search";
const Menu = (props) => {
  const { t } = useTranslation();
  const themeColors = useSelector((state) => state.themeColors);
  const openedMenus = useSelector((state) => state.openedMenu);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const [currentMenus, setCurrentMenus] = useState(props.user.menu);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    const search = event.target.value.toLowerCase(); // Convert to lower case for case-insensitive matching
    setSearchValue(search);
    let menu = JSON.parse(JSON.stringify(props.user.menu));
    console.log(menu);
    const newMenu = menu.filter((menuItem) => {
      const labelMatches = menuItem.label.toLowerCase().includes(search);
      // Filter submenu labels
      const filteredSubmenu = menuItem.submenus.filter((submenuItem) => submenuItem.label.toLowerCase().includes(search));
      menuItem.submenus = labelMatches ? menuItem.submenus : filteredSubmenu;

      return labelMatches || filteredSubmenu.length > 0;
    });

    setCurrentMenus(newMenu);
  };

  return (
    <>
      
      <Header>
        {/* <User>{props.user.user.email}</User> */}
        {/* <Logout
          onClick={() => {
            dispatch(clearLogin());
            navigate("/");
          }}
        >
          <LogoutIcon />
        </Logout> */}<Logo src={logo} alt="logo" />
        <MNavClose
          onClick={() => {
            dispatch(menuStatus(false));
          }}
        >
          <CloseIcon />
        </MNavClose>
      </Header>
      <Nav theme={themeColors}>
        <Search title={"Search"} className="menu active" theme={themeColors} placeholder="Search Menu" value={searchValue} onChange={handleChange}></Search>
        {/* Link to the home page */}
        {currentMenus?.map((menuItem) => (
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
                  className={openedMenus[menuItem._id] === true || searchValue.length > 0 ? "open active" : " open"}
                >
                  <GetIcon icon={menuItem.icon} /> <span>{t(menuItem.label)} </span>
                  <GetIcon icon={"down"}></GetIcon>
                </MenuGroup>
                <SubMenu className={openedMenus[menuItem._id] === true || searchValue.length > 0 ? "down" : "close"}>
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
