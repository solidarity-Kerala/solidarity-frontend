import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Switch from "./switch";
import { useSelector } from "react-redux";
import Page404 from "../private/pages/page404";
import {
  Container,
  MainContainer,
  SideBar,
} from "../private/common/layout/styels";
import { RowContainer } from "../styles/containers/styles";
import Header from "../private/common/layout/header";
import Footer from "../private/common/layout/footer";
import Menu from "../private/common/layout/menu";
import Body from "../private/pages/dashboard";
// import dietitian from "../private/pages/dashboard/dietitian";

const PageRouter = () => {
  const user = useSelector((state) => state.login);
  const menuStatus = useSelector((state) => state.menuStatus);
  const createRouter = (router, menu = true) => {
    const role = menu ? router.menuRoles[0] : router.subMenuRoles[0];
    return (
      <Route
        key={`${router._id}`}
        path={`${router.path}`}
        element={
          <Switch
            addPrivilege={role.add ?? false}
            delPrivilege={role.delete ?? false}
            updatePrivilege={role.update ?? false}
            exportPrivilege={role.export ?? false}
            page={router.element}
          />
        }
      />
    );
  };
  const themeColors = useSelector((state) => state.themeColors);
  return user.data.token ? (
    <BrowserRouter>
      <MainContainer>
        <SideBar theme={themeColors} className={menuStatus && "active"}>
          <Menu user={user.data}></Menu>
          <Footer></Footer>
        </SideBar>
        <RowContainer className="content">
          <Header user={user.data}></Header>
          <Container className="nopadding" theme={themeColors}>
            <Routes>
              <Route path="/" element={<Switch page="login" />} />
              <Route path="/dashboard" element={<Body />} />
              <Route path="/dietitian-dashboard" element={<Body />} />
              {user?.data?.menu?.map((menu) => {
                if (menu.submenus?.length > 0) {
                  return (
                    <React.Fragment key={menu._id}>
                      {createRouter(menu)}
                      {menu.submenus.map((submenu) =>
                        createRouter(submenu, false)
                      )}
                    </React.Fragment>
                  );
                }
                return createRouter(menu);
              })}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Container>
        </RowContainer>
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
