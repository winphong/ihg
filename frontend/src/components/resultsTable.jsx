import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dateformat from "dateformat";
import ResultRow from "../components/resultRow";
import { Divider } from "@material-ui/core";
import ResultRowCarnival from "../components/resultRowCarnival";
import Typography from "@material-ui/core/Typography";

export default function ResultsTable({
  schedules,
  selectedSport,
  byDate,
  limit,
  isAdmin
}) {
  const classes = useStyles();
  let currentDate = "";

  let lim = limit;

  return (
    <React.Fragment>
      {!byDate && (
        <Typography className={classes.sportHeader}>
          {selectedSport.name}
        </Typography>
      )}
      {schedules.map((schedule, index) => {
        if (index < limit) {
          if (
            byDate &&
            dateformat(new Date(schedule.startTime), "dd mm") !== currentDate
          ) {
            if (lim <= limit / 2) {
              return;
            }
            lim = lim - 1;
            currentDate = dateformat(new Date(schedule.startTime), "dd mm");
            return (
              <div key={index}>
                <Typography className={classes.date}>
                  {dateformat(new Date(schedule.startTime), "dd'th' mmm")}
                </Typography>
                {schedule.stage === "Carnival" ? (
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
              {schedule.stage === "Carnival" ? (
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
      })}
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
  date: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%"
    },
    padding: "1% 0 1% 2%",
    // backgroundColor: "cyan",
    color: "#958F87",
    fontWeight: "bold"
  }
}));
