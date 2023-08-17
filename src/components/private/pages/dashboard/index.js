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
      {dashboard?.data?.length > 0 &&
        dashboard?.data?.map((item, index) => (
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

//   const data = [
//     { icon: <PersonAddIcon />, value: count.dieticianCount, text: "Dietician" },
//     { icon: <ContactIcon />, value: count.patientCount, text: "Patient" },
//     {
//       icon: <DeliveryIcon />,
//       value: count.deliveryManCount,
//       text: "Delivery Man",
//     },
//     { icon: <EditIcon />, value: count.appointmentCount, text: "Appointment" },
//   ];
//     <Grid container spacing={2} sx={{ margin: 1.5 }}>
//       {data.map(({ icon, value, text }, index) => (
//         <Grid item xs={12} lg={3} sm={4} key={index}>
//           <Card variant="outlined">
//             <CardContent>
//               <Typography
//                 sx={{ fontSize: 14, mb: 1.5 }}
//                 color="text.secondary"
//                 gutterBottom
//               >
//                 <Fab aria-label="save" color="primary">
//                   <span style={{ display: "flex", justifyContent: "center" }}>
//                     {icon}
//                   </span>
//                 </Fab>
//               </Typography>
//               <Typography
//                 sx={{ mb: 1.5, fontWeight: "bold", fontSize: "x-large" }}
//                 color="text.secondary"
//               >
//                 {value}
//               </Typography>
//               <Typography variant="body2">
//                 {text}
//                 <br />
//                 {'"a benevolent smile"'}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>

// // import React, { useState } from "react";
// // import { Grid, Typography, TextField, Button, Box, Paper } from "@mui/material";

// // const MarksComponent = () => {
// //   const [marks, setMarks] = useState({
// //     Eng: { obtained: "", maximum: 100 },
// //     Mal: { obtained: "", maximum: 100 },
// //     Phy: { obtained: "", maximum: 80 },
// //     Chem: { obtained: "", maximum: 80 },
// //     Bio: { obtained: "", maximum: 80 },
// //     Math: { obtained: "", maximum: 80 },
// //   });
// //   const [percentage, setPercentage] = useState(null);

// //   const handleChange = (subject, field, value) => {
// //     setMarks((prevMarks) => ({
// //       ...prevMarks,
// //       [subject]: {
// //         ...prevMarks[subject],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   const calculatePercentage = () => {
// //     const obtainedMarks = Object.values(marks).reduce(
// //       (total, subject) => total + Number(subject.obtained),
// //       0
// //     );

// //     const maximumMarks = Object.values(marks).reduce(
// //       (total, subject) => total + Number(subject.maximum),
// //       0
// //     );

// //     return ((obtainedMarks / maximumMarks) * 100).toFixed(2);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const calculatedPercentage = calculatePercentage();
// //     setPercentage(calculatedPercentage);
// //   };

// //   return (
// //     <Box p={2} component={Paper}>
// //       <Typography variant="h5" gutterBottom>
// //         Marks Calculation
// //       </Typography>
// //       <form onSubmit={handleSubmit}>
// //         <Grid container spacing={2} direction="column">
// //           {Object.entries(marks).map(([subject, { obtained, maximum }]) => (
// //             <Grid item key={subject}>
// //               <Box display="flex" alignItems="center" mb={2}>
// //                 <Typography variant="subtitle1" sx={{ width: 80 }}>
// //                   {subject}:
// //                 </Typography>
// //                 <TextField
// //                   size="small"
// //                   variant="outlined"
// //                   type="number"
// //                   value={obtained}
// //                   onChange={(e) =>
// //                     handleChange(subject, "obtained", e.target.value)
// //                   }
// //                   inputProps={{ min: 0 }}
// //                   sx={{ mx: 1, width: 70 }}
// //                 />
// //                 <Typography variant="subtitle1">out of</Typography>
// //                 <TextField
// //                   size="small"
// //                   variant="outlined"
// //                   disabled
// //                   value={maximum}
// //                   sx={{ mx: 1, width: 70 }}
// //                 />
// //               </Box>
// //             </Grid>
// //           ))}
// //           <Grid item>
// //             <Button variant="contained" color="primary" type="submit">
// //               Calculate
// //             </Button>
// //           </Grid>
// //           {percentage && (
// //             <Grid item>
// //               <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
// //                 Total Percentage: {percentage}%
// //               </Typography>
// //             </Grid>
// //           )}
// //         </Grid>
// //       </form>
// //     </Box>
// //   );
// // };

// // export default MarksComponent;
