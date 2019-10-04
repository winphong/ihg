import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import dateformat from "dateformat";

const colours = ["white", "green", "maroon", "blue", "yellow", "orange"];

export default function ScheduleBox({ schedule }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {/* Carnival colour */}
      <Grid item container xs={12}>
        {schedule.stage === "Carnival" &&
          colours.map(colour => {
            return (
              <Grid
                item
                xs={true}
                className={classes.bar}
                style={{
                  backgroundColor: colour,
                  border: colour === "white" ? "0.005vh solid black" : ``
                }}
              />
            );
          })}
      </Grid>
      {schedule.stage !== "Carnival" && (
        <Grid item container xs={12}>
          <Grid
            item
            xs={6}
            className={classes.bar}
            style={{
              backgroundColor: schedule.hall[0].colourCode,
              border:
                schedule.hall[0].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
              // transform:
              //   schedule.hall[0].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
          <Grid
            item
            xs={6}
            className={classes.bar}
            style={{
              backgroundColor: schedule.hall[1].colourCode,
              border:
                schedule.hall[1].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
              // transform:
              //   schedule.hall[1].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
        </Grid>
      )}
      <Grid item xs={5}>
        {schedule.hall[0].abbreviation}
      </Grid>
      <Grid item xs={2}>
        vs
      </Grid>
      <Grid item xs={5}>
        {schedule.hall[1].abbreviation}
      </Grid>
      <Grid item xs={12}>
        <Typography>{schedule.sport}</Typography>
        <Typography>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h'")}
        </Typography>
        <Typography>{schedule.venue}</Typography>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  container: {
    textAlign: "center",
    border: "0.005vh solid grey",
    padding: "5%",
    [theme.breakpoints.up("sm")]: {
      width: "210px"
    }
  },
  bar: {
    height: "10px"
  }
});

const useStyles = makeStyles(styles);
