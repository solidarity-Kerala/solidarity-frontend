import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, HeaderMenu, MNav, Status, Title } from "./styels";
import { menuStatus } from "../../../../../store/actions/common";
import { GetIcon } from "../../../../../icons";
import { generateThumbnail } from "../../../../functions/string";
import ProfileBar from "../profile";
const Header = (props) => {
  const dispatch = useDispatch();
  const menuCurrentStatus = useSelector((state) => state.menuStatus);
  // const currentMenu = useSelector((state) => state.currentMenu);
  const selectedMenuItem = useSelector((state) => state.selectedMenu);
  const [isProfileBarOpen, setIsProfileBarOpen] = useState(false);
  const profileRef = useRef(null);

  // Function to handle clicks outside of the Profile component
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileBarOpen(false);
    }
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle the ProfileBar when clicking the Profile
  const handleProfileClick = () => {
    setIsProfileBarOpen(!isProfileBarOpen);
  };
  // const navigate = useNavigate();
  return (
    <Container>
      <MNav
        onClick={() => {
          dispatch(menuStatus(!menuCurrentStatus));
        }}
      >
        <GetIcon icon={selectedMenuItem.icon} />
      </MNav>
      <Status>
        <Title>{selectedMenuItem.label}</Title>
        {/* <User>{props.user.user.email}</User> */}
        <HeaderMenu
        ref={profileRef}
          onClick={() => {
            handleProfileClick();
          }}
        >
          
          {generateThumbnail(props.user.user?.username ?? "", null, props.user.user.photo ?? "")}
          {isProfileBarOpen && (
            <div className="ProfileBar" onClick={(e) => e.stopPropagation()}>
              <ProfileBar setLoaderBox={props.setLoaderBox} setMessage={props.setMessage} data={props.user}></ProfileBar>
            </div>
          )}
        </HeaderMenu>
      </Status>
    </Container>
  );
};

export default Header;
