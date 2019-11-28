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
                <p className={classes.headerRow}>
                  {dateformat(new Date(schedule.startTime), "dd'th' mmm")}
                </p>
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

const useStyles = makeStyles({});
