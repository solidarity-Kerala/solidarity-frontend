// import React, { useEffect, useState } from "react";
// import { Grid, Card, CardContent, Typography, Fab } from "@mui/material";
// import {
//   PersonAddAltOutlined as PersonAddIcon,
//   PermContactCalendarOutlined as ContactIcon,
//   DeliveryDiningOutlined as DeliveryIcon,
//   EditNoteOutlined as EditIcon,
// } from "@mui/icons-material";
// //
// import { GetAccessToken } from "../../../../backend/authentication";
// import api from "../../../../utils/api";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPageObject } from "../../../../store/actions/pages";
import withLayout from "../../common/layout";
import {
  Count,
  DashboardSection,
  IconWrapper,
  Tile,
  Title,
  TitleBox,
} from "./styles";
import { GetIcon } from "../../../../icons";
const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const dashboard = useSelector((state) =>
    state.pages[`dashboard`]
      ? state.pages[`dashboard`]
      : {
          data: null,
          isLoading: true,
          error: null,
        }
  );
  useEffect(() => {
    props.setLoaderBox(dashboard.isLoading);
    dashboard.isLoading && setInitialized(true);
  }, [dashboard, props]);

  useEffect(() => {
    if (initialized) {
      dispatch(addPageObject("dashboard", 0, {}));
    }
  }, [initialized, dispatch]);
  useEffect(() => {
    console.log(dashboard);
  }, [dashboard]);

  return (
    <DashboardSection>
      {/* <h1>dasfasdfds</h1> */}
      {dashboard.data?.length > 0 &&
        dashboard.data.map((item, index) => (
          <Tile key={index}>
            <TitleBox>
              <Count>{item.count}</Count>
              <Title>{item.title}</Title>
            </TitleBox>
            <IconWrapper
              style={{ background: item.background, color: item.color }}
            >
              <GetIcon icon={item.icon} />
            </IconWrapper>
          </Tile>
        ))}
    </DashboardSection>
  );
};

export default withLayout(Dashboard);
