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
      <Grid item xs={true} sm={11 / 2}>
        <img style={{ maxHeight: 150 }} src={schedule.hall[0].imgUrl} />
        <p> {schedule.hall[0].name} </p>
      </Grid>
      <Grid item xs={true} sm={1} className={classes.vs}>
        <p>vs</p>
      </Grid>
      <Grid item xs={true} sm={11 / 2}>
        <img style={{ maxHeight: 150 }} src={schedule.hall[1].imgUrl} />
        <p> {schedule.hall[1].name} </p>
      </Grid>
      <Grid item xs={12}>
        {schedule.sport} <br />
        {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h',")}{" "}
        {schedule.venue}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  big: {
    height: "27vh",
    width: "28vw",
    textAlign: "center",
    margin: "1vh 0.5vw",
    // backgroundColor: "beige",
    padding: "0.5vh",
    border: "0.05vh solid gold"
  },
  small: {
    height: "27vh",
    width: "26vw",
    textAlign: "center",
    margin: "1vh 0.5vw",
    // backgroundColor: "beige",
    padding: "0.5vh",
    opacity: 0.3,
    transform: "scale(0.85)",
    border: "0.05vh solid gold"
  },
  center: {
    height: "27vh",
    width: "26vw",
    textAlign: "center",
    margin: "1vh 0.5vw",
    // backgroundColor: "beige",
    padding: "0.5vh",
    transform: "scale(1.3)",
    border: "0.05vh solid gold"
  },
  vs: {
    // word in the center
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left"
  }
});
