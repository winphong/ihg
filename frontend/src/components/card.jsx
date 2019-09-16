import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";

export default function Card({ schedule, center, size }) {
  const classes = useStyles();

  return (
    <Grid
      container
      className={
        center ? classes.center : size === "big" ? classes.big : classes.small
      }
    >
      <Grid container>
        <Grid item xs={5}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={schedule.hall[0].imgUrl}
          />
        </Grid>
        <Grid item xs={2} className={classes.vs}>
          vs{" "}
        </Grid>
        <Grid item xs={5}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={schedule.hall[1].imgUrl}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <p> {schedule.hall[0].name} </p>
        </Grid>
        <Grid item xs={2} className={classes.vs}></Grid>
        <Grid item xs={5}>
          <p> {schedule.hall[1].name} </p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {schedule.sport} <br />
        {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h',")}
        {schedule.venue}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  big: {
    textAlign: "center",
    margin: "1% 0.5%",
    // backgroundColor: "beige",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    border: "1px solid gold"
  },
  small: {
    textAlign: "center",
    margin: "1% 0.5%",
    // backgroundColor: "beige",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    opacity: 0.3,
    transform: "scale(0.85)",
    border: "1px solid gold"
  },
  center: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    padding: "1%",
    transform: "scale(1.3)",
    border: "1px solid gold"
  },
  vs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
});
