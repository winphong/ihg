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
    <div>
      {!byDate && <p className={classes.headerRow}>{selectedSport.name}</p>}
      {schedules.map((schedule, index) => {
        if (index < limit) {
          if (byDate && schedule.startTime.substring(8, 10) != currentDate) {
            if (lim <= limit / 2) {
              return;
            }
            lim = lim - 1;
            currentDate = schedule.startTime.substring(8, 10);
            return (
              <div>
                <Typography className={classes.date}>
                  {dateformat(new Date(schedule.startTime), "dd'th' mmm")}
                </Typography>
                {schedule.stage === "Carnival" ? (
                  <ResultRowCarnival schedule={schedule} isAdmin={isAdmin} />
                ) : (
                  <ResultRow schedule={schedule} isAdmin={isAdmin} />
                )}
                <Divider />
              </div>
            );
          }
          return (
            <div>
              {schedule.stage === "Carnival" ? (
                <ResultRowCarnival schedule={schedule} isAdmin={isAdmin} />
              ) : (
                <ResultRow schedule={schedule} isAdmin={isAdmin} />
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
  date: { padding: "2%", backgroundColor: "cyan" }
});
