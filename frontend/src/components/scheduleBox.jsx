import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import dateformat from "dateformat";

export default function ScheduleBox({ schedule }) {
  const classes = useStyles();

  console.log(schedule);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container>
        {/* Carnival colour */}
        {/* <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "green" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "white" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "yellow" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "maroon" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "orange" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "blue" }}
        /> */}
        <Grid
          item
          xs={true}
          sm={6}
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
          xs={true}
          sm={6}
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
        <Grid item xs={12} sm={5}>
          {schedule.hall[0].name.split(" ")[0].substring(0, 1)}H
        </Grid>
        <Grid item xs={12} sm={2}>
          vs
        </Grid>
        <Grid item xs={12} sm={5}>
          {schedule.hall[1].name.split(" ")[0].substring(0, 1)}H
        </Grid>
        <Grid item xs={12}>
          <Typography>{schedule.sport}</Typography>
          <Typography>
            {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h'")}
          </Typography>
          <Typography>{schedule.venue}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    // backgroundColor: "beige",
    border: "0.005vh solid grey",
    padding: 10
  },
  bar: {
    height: "1vh"
  }
});
