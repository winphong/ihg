import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateformat from "dateformat";
import ResultRow from "../components/resultRow";
import { Divider } from "@material-ui/core";
import ResultRowCarnival from "../components/resultRowCarnival";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "react-responsive";

export default function ResultsTable({
  schedules,
  selectedSport,
  byDate,
  limit,
  isAdmin
}) {
  const classes = useStyles();
  const isIpadProPotrait = useMediaQuery({
    minWidth: 1020,
    maxWidth: 1030,
    orientation: "portrait"
  });
  const xxl = useMediaQuery({ minWidth: 1500 });
  const isLaptop = useMediaQuery({ minWidth: 1100 });
  const isIpadProLandscape = useMediaQuery({
    minWidth: 1360,
    maxWidth: 1370,
    orientation: "landscape"
  });

  let height = "";
  if (xxl) {
    height = "36vmax";
  } else if (isIpadProPotrait) {
    height = "40vmax";
  }

  let currentDate = "";

  return (
    <React.Fragment>
      <div className={classes.scrollableContainer}>
        <div
          className={classes.scrollable}
          style={{
            height: height,
            marginRight: isLaptop && !isIpadProLandscape ? "-13px" : ""
          }}
        >
          {schedules.length === 0 && (
            <Typography
              className={classes.noResult}
              style={{ textAlign: "center" }}
            >
              Results will be available soon
            </Typography>
          )}
          {schedules.map((schedule, index) => {
            if (
              byDate &&
              dateformat(new Date(schedule.startTime), "dd mm") !== currentDate
            ) {
              currentDate = dateformat(new Date(schedule.startTime), "dd mm");
              const date = new Date(schedule.startTime);
              return (
                <div
                  key={index}
                  style={
                    {
                      // WebkitScrollbar: { width: "0px", background: "transparent" } // optional: just make scrollbar invisible / }
                    }
                  }
                >
                  <Typography className={classes.date}>
                    {(date.getDate() === 1 ||
                      date.getDate() === 21 ||
                      date.getDate() === 31) &&
                      dateformat(date, "dd'st' mmm")}
                    {(date.getDate() === 2 || date.getDate() === 22) &&
                      dateformat(date, "dd'nd' mmm")}
                    {(date.getDate() === 3 || date.getDate() === 23) &&
                      dateformat(date, "dd'rd' mmm")}
                    {![1, 2, 3, 21, 22, 23, 31].includes(date.getDate()) &&
                      dateformat(date, "dd'th' mmm")}
                  </Typography>
                  {schedule.stage === "Carnival" ||
                  schedule.stage === "Playoffs" ? (
                    <ResultRowCarnival
                      schedule={schedule}
                      isAdmin={isAdmin}
                      byDate={byDate}
                    />
                  ) : (
                    <ResultRow
                      schedule={schedule}
                      isAdmin={isAdmin}
                      byDate={byDate}
                    />
                  )}
                  <Divider />
                </div>
              );
            }
            return (
              <div key={index}>
                {schedule.stage === "Carnival" ||
                schedule.stage === "Playoffs" ? (
                  <ResultRowCarnival
                    schedule={schedule}
                    isAdmin={isAdmin}
                    byDate={byDate}
                  />
                ) : (
                  <ResultRow
                    schedule={schedule}
                    isAdmin={isAdmin}
                    byDate={byDate}
                  />
                )}
                <Divider />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  sportHeader: {
    // fontWeight: "bold",
    padding: "1% 0 1% 2%",
    fontFamily: "TheNextFont",
    fontSize: "150%",
    color: "#958F87"
  },
  noResult: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "120%"
    },

    padding: "1% 0 1% 2%",
    fontSize: "150%",
    fontStyle: "italic",
    color: "#958F87"
  },
  date: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%"
    },
    padding: "3% 0 3% 2%",
    // backgroundColor: "cyan",
    color: "#958F87",
    fontWeight: "bold"
  },
  scrollable: {
    [theme.breakpoints.only("xs")]: {
      height: "70vmax"
    },
    [theme.breakpoints.only("sm")]: {
      height: "70vmax"
    },
    [theme.breakpoints.only("md")]: {
      height: "53vmax"
    },
    [theme.breakpoints.only("lg")]: {
      height: "43vmax"
    },
    [theme.breakpoints.only("xl")]: {
      height: "39vmax"
    },
    [theme.breakpoints.up("md")]: {
      // marginRight: "-13px"
    },
    // backgroundColor: "beige",
    display: "flex",
    overflowY: "scroll",
    flexDirection: "column"
  },
  scrollableContainer: {
    [theme.breakpoints.up("md")]: {
      overflow: "hidden"
    }
  }
}));

// export default function ResultsTable({
//   schedules,
//   selectedSport,
//   byDate,
//   limit,
//   isAdmin
// }) {
//   const classes = useStyles();
//   let currentDate = "";

//   let lim = limit;

//   return (
//     <React.Fragment>
//       {!byDate && (
//         <Typography className={classes.sportHeader}>
//           {selectedSport.name}
//         </Typography>
//       )}
//       {schedules.map((schedule, index) => {
//         if (index < limit) {
//           if (
//             byDate &&
//             dateformat(new Date(schedule.startTime), "dd mm") !== currentDate
//           ) {
//             if (lim <= limit / 2) {
//               return;
//             }
//             lim = lim - 1;
//             currentDate = dateformat(new Date(schedule.startTime), "dd mm");
//             const date = new Date(schedule.startTime);
//             return (
//               <div key={index}>
//                 <Typography className={classes.date}>
//                   {(date.getDate() === 1 ||
//                     date.getDate() === 21 ||
//                     date.getDate() === 31) &&
//                     dateformat(date, "dd'st' mmm")}
//                   {(date.getDate() === 2 || date.getDate() === 22) &&
//                     dateformat(date, "dd'nd' mmm")}
//                   {(date.getDate() === 3 || date.getDate() === 23) &&
//                     dateformat(date, "dd'rd' mmm")}
//                   {![1, 2, 3, 21, 22, 23, 31].includes(date.getDate()) &&
//                     dateformat(date, "dd'th' mmm")}
//                 </Typography>
//                 {schedule.stage === "Carnival" ? (
//                   <ResultRowCarnival
//                     schedule={schedule}
//                     isAdmin={isAdmin}
//                     byDate={byDate}
//                   />
//                 ) : (
//                   <ResultRow
//                     schedule={schedule}
//                     isAdmin={isAdmin}
//                     byDate={byDate}
//                   />
//                 )}
//                 <Divider />
//               </div>
//             );
//           }
//           return (
//             <div key={index}>
//               {schedule.stage === "Carnival" ? (
//                 <ResultRowCarnival
//                   schedule={schedule}
//                   isAdmin={isAdmin}
//                   byDate={byDate}
//                 />
//               ) : (
//                 <ResultRow
//                   schedule={schedule}
//                   isAdmin={isAdmin}
//                   byDate={byDate}
//                 />
//               )}
//               <Divider />
//             </div>
//           );
//         }
//       })}
//     </React.Fragment>
//   );
// }
