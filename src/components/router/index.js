import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Switch from "./switch";
import { useSelector } from "react-redux";
import Page404 from "../project/pages /page404/index";
import { Container, MainContainer, SideBar } from "../core/layout/styels";
import { RowContainer } from "../styles/containers/styles";
import Header from "../core/layout/header";
import Footer from "../core/layout/footer";
import Menu from "../core/layout/menu";
import InternetStatusPopup from "../core/InternetStatusPopup";

const PageRouter = () => {
  const user = useSelector((state) => state.login);
  const menuStatus = useSelector((state) => state.menuStatus);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const createRouter = (router, menu = true) => {
    const role = router.privilege ?? (menu ? router.menuRoles[0] : router.subMenuRoles[0]);
    return <Route key={`${router._id}`} path={`${router.path}`} element={<Switch user={user.data} addPrivilege={role.add ?? false} delPrivilege={role.delete ?? false} updatePrivilege={role.update ?? false} exportPrivilege={role.export ?? false} clonePrivilege={role.clone ?? false} hideMenu={role.hideMenu ?? false} hideHeader={role.hideMenu ?? false} userType={role.userType} page={router.element} />} />;
  };

  const themeColors = useSelector((state) => state.themeColors);
  return user.data.token ? (
    <BrowserRouter>
      <MainContainer>
        {!(selectedMenuItem.hideMenu ?? false) && (
          <SideBar theme={themeColors} className={menuStatus && "active"}>
            <Menu user={user.data}></Menu>
            <Footer></Footer>
          </SideBar>
        )}
        <RowContainer className={`content ${selectedMenuItem.hideMenu && "hidemenu"}`}>
          {!(selectedMenuItem.hideHeader ?? false) && <Header user={user.data}></Header>}
          <Container className="nopadding" theme={themeColors}>
            <Routes>
              <Route path="/" element={<Switch page="login" />} />
              {user?.data?.menu?.map((menu) => {
                if (menu.submenus?.length > 0) {
                  return (
                    <React.Fragment key={menu._id}>
                      {createRouter(menu)}
                      {menu.submenus.map((submenu) => createRouter(submenu, false))}
                    </React.Fragment>
                  );
                }
                return createRouter(menu);
              })}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Container>
        </RowContainer>
        <InternetStatusPopup />
      </MainContainer>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Switch page="login" />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

// Export PageRouter component as the default export of the module
export default PageRouter;
