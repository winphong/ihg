import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";

export default function ResultRow({ schedule }) {
  const classes = useStyles();
  const hasScore =
    schedule.hall[0].score >= 0 && schedule.hall[1].score >= 0 ? true : false;
  const firstWinner = schedule.hall[0].score > schedule.hall[1].score;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={true} sm={3} style={{ textAlign: "left" }}>
        <Grid container style={{ marginBottom: "0.5vh" }}>
          <Grid
            item
            sm={2}
            className={classes.bar}
            style={{
              backgroundColor: schedule.hall[0].colourCode,
              border:
                schedule.hall[0].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
            }}
          />
          <Grid
            item
            sm={2}
            className={classes.bar}
            style={{
              backgroundColor: schedule.hall[1].colourCode,
              border:
                schedule.hall[1].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
            }}
          />
        </Grid>
        <strong>
          {schedule.sport} {schedule.stage}
        </strong>
      </Grid>
      <Grid
        item
        xs={true}
        sm={4}
        style={{ marginTop: "1vh", textAlign: "left" }}
      >
        {/* {dateformat(
          new Date(schedule.startTime).toLocaleString("default", {
            timeZone: "Asia/Singapore"
          }),
          "HHMM"
        )} */}
        {schedule.startTime} , {schedule.venue}
      </Grid>
      <Grid
        item
        sm={1}
        className={
          hasScore
            ? firstWinner
              ? classes.winner
              : classes.neutral
            : classes.neutral
        }
      >
        {schedule.hall[0].name.split(" ")[0]}
      </Grid>
      <Grid
        item
        sm={1}
        className={
          hasScore
            ? firstWinner
              ? classes.winner
              : classes.neutral
            : classes.neutral
        }
      >
        {schedule.hall[0].score}
      </Grid>
      <Grid item sm={1} style={{ marginTop: "1vh" }}>
        -
      </Grid>
      <Grid
        item
        sm={1}
        className={
          hasScore
            ? firstWinner
              ? classes.neutral
              : classes.winner
            : classes.neutral
        }
      >
        {schedule.hall[1].score}
      </Grid>
      <Grid
        item
        sm={1}
        className={
          hasScore
            ? firstWinner
              ? classes.neutral
              : classes.winner
            : classes.neutral
        }
      >
        {schedule.hall[1].name.split(" ")[0]}
      </Grid>
    </Grid>
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
