import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import ResultRow from "../components/resultRow";
import { Divider, Button } from "@material-ui/core";
import ResultRowCarnival from "../components/resultRowCarnival";

export default function ResultsTable({
  schedules,
  selectedSport,
  byDate,
  limit
}) {
  const classes = useStyles();
  let currentDate = "";

  let lim = limit;

  return (
    <div>
      {!byDate && <p className={classes.headerRow}>{selectedSport.name}</p>}
      {schedules.map((schedule, index) => {
        if (index < lim) {
          if (byDate && schedule.startTime.substring(8, 10) != currentDate) {
            lim = lim - 1;
            if (lim <= limit / 2) {
              return;
            }
            currentDate = schedule.startTime.substring(8, 10);
            return (
              <div>
                <p className={classes.headerRow}>
                  {dateformat(
                    new Date(schedule.startTime).toLocaleString("default", {
                      timeZone: "Asia/Singapore"
                    }),
                    "dd'th' mmm"
                  )}
                </p>
                {schedule.stage == "Carnival" ? (
                  <ResultRowCarnival schedule={schedule} />
                ) : (
                  <ResultRow schedule={schedule} />
                )}
                <Divider />
              </div>
            );
          }
          return (
            <div>
              {schedule.stage == "Carnival" ? (
                <ResultRowCarnival schedule={schedule} />
              ) : (
                <ResultRow schedule={schedule} />
              )}
              <Divider />
            </div>
          );
        }
      })}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    margin: "1vh",
    height: "3.5vh"
    // backgroundColor: "gold"
  },
  bar: {
    height: "0.6vh"
  },
  winner: {
    marginTop: "1vh",
    fontWeight: "bold"
    // backgroundColor: "pink"
  },
  neutral: {
    marginTop: "1vh"
    // backgroundColor: "beige"
  }
});
