import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedMenu } from "../../../store/actions/common";
import RenderPage from "../../project/router/switch.js";

const Switch = ({ page, key, user, ...privileges }) => {
  const location = useLocation();
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedMenuItem.path !== location.pathname) {
      // console.log("not equal", location.pathname, "/" + selectedMenuItem.path, user.menu);
      user &&
        user.menu.forEach((element) => {
          // console.log("path", element.path, location.pathname);
          if (element.path === location.pathname) {
            console.log("equal", element.label);
            dispatch(selectedMenu(element));
          } else {
            element.submenus?.forEach((subelement) => {
              // console.log("path", subelement.path, location.pathname);
              if (subelement.path === location.pathname) {
                dispatch(selectedMenu(subelement));
                console.log("equal", subelement.label);
              }
            });
          }
        });
    }
  }, [location.pathname, selectedMenuItem, user, dispatch]);
  return RenderPage(page, key, user, privileges);
};

export default Switch;
