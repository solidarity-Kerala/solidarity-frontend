import { useDispatch } from "react-redux";
import { LogoutIcon } from "../../../../icons";
import { clearLogin } from "../../../../store/actions/login";
import { generateThumbnail } from "../../functions/string";
import { Logout } from "../header/styels";
import { Bottom, Popbar, ProfileIcon, Top } from "../styels";
import { useNavigate } from "react-router-dom";

const ProfileBar = ({ data, setLoaderBox, setMessage }) => {
  const user = data.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Popbar className="ProfileBar">
      <Top>
        <div className="banner">
          <ProfileIcon>{generateThumbnail(user?.fullName ?? user.username ?? "", true, user.photo ?? "")}</ProfileIcon>
        </div>
        <span className="main">{user.fullName ?? user.username}</span>
        <span className="sub">{user.email}</span>
      </Top>
      <Bottom>
        <Logout
          onClick={() => {
            dispatch(clearLogin());
            navigate("/");
          }}
        >
          <LogoutIcon />
          Signout
        </Logout>
      </Bottom>
    </Popbar>
  );
};
export default ProfileBar;
