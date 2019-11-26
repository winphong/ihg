import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import dateformat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import { Info } from "@material-ui/icons";

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
              backgroundColor: schedule.halls[0].colourCode,
              border:
                schedule.halls[0].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
              // transform:
              //   schedule.halls[0].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
          <Grid
            item
            xs={6}
            className={classes.bar}
            style={{
              backgroundColor: schedule.halls[1].colourCode,
              border:
                schedule.halls[1].colourCode === "#ffffff"
                  ? "0.005vh solid black"
                  : ``
              // transform:
              //   schedule.halls[1].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
        </Grid>
      )}
      <Grid item xs={5}>
        {schedule.halls[0].abbreviation}
      </Grid>
      <Grid item xs={2}>
        vs
      </Grid>
      <Grid item xs={5}>
        {schedule.halls[1].abbreviation}
      </Grid>
      <Grid item xs={12}>
        <Link
          style={{
            color: "#0074d9",
            cursor: "pointer",
            textDecoration: "none"
          }}
          to={{
            pathname: `/admin/score/${schedule._id}`,
            data: schedule // your data array of objects
          }}
        >
          <Typography>{schedule.sport}</Typography>
        </Link>
        <Link to={{}}></Link>
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
    border: "1px solid black",
    padding: "7%",
    [theme.breakpoints.up("sm")]: {
      width: "100%"
    }
  },
  bar: {
    height: "10px"
  }
});

const useStyles = makeStyles(styles);
