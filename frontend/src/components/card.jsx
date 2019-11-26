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
          <img style={{ width: "90%" }} src={schedule.halls[0].imgUrl} />
        </Grid>
        <Grid item xs={2} className={classes.vs}></Grid>
        <Grid item xs={5}>
          <img style={{ width: "90%" }} src={schedule.halls[1].imgUrl} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className={classes.hall}>
            {schedule.halls[0].name.toUpperCase()}
          </span>
        </Grid>
        <Grid item xs={2} className={classes.vs}></Grid>
        <Grid item xs={5}>
          <span className={classes.hall}>
            {schedule.halls[1].name.toUpperCase()}
          </span>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
        <span className={classes.sport}>{schedule.sport.toUpperCase()}</span>
        <br />
        <span className={classes.information}>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h',")}
          {schedule.venue}
        </span>
        <br />
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  big: {
    textAlign: "center",
    margin: "1% 0.5%",
    // backgroundColor: "beige",
    width: "100%",
    height: "100%",
    padding: "0.5%"
    // border: "1px solid gold"
  },
  small: {
    textAlign: "center",
    margin: "1% 0.5%",
    // backgroundColor: "beige",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    opacity: 0.3,
    transform: "scale(0.85)"
    // border: "1px solid gold"
  },
  center: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    padding: "1%",
    transform: "scale(1.3)",
    // border: "1px solid gold",
    [theme.breakpoints.down("sm")]: {
      transform: "scale(1)"
    }
  },
  vs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  sport: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px"
    },
    fontSize: "25px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%"
  },
  hall: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px"
    },
    fontSize: "20px",
    fontWeight: "900",
    lineHeight: "100%"
  },
  information: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    },
    fontSize: "16px",
    color: "grey",
    lineHeight: "100%"
  }
});

const useStyles = makeStyles(styles);
