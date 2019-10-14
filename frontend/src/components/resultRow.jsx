import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";

export default function ResultRow({ schedule }) {
  const classes = useStyles();
  const hasScore =
    schedule.hall[0].score >= 0 && schedule.hall[1].score >= 0 ? true : false;
  const firstWinner = schedule.hall[0].score > schedule.hall[1].score;

  const isLaptop = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        xs={8}
        md={4}
        style={{ textAlign: "left", marginLeft: "2%" }}
      >
        <Grid
          item
          xs={3}
          md={2}
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
          xs={3}
          md={2}
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

      <Grid item container xs={12} style={{ textAlign: "center" }}>
        {/* sports name */}
        <Grid
          item
          xs={5}
          md={3}
          style={{ textAlign: "left", paddingLeft: "2%" }}
        >
          <strong>
            {schedule.sport} {schedule.stage}
          </strong>
        </Grid>
        {/* sports venue / timing */}
        {isLaptop && (
          <Grid item xs={4} style={{ textAlign: "left", paddingLeft: "2%" }}>
            {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
            {schedule.venue}
          </Grid>
        )}
        {/* hall 1 */}
        <Grid
          item
          xs={2}
          md={1}
          className={
            hasScore
              ? firstWinner
                ? classes.winner
                : classes.neutral
              : classes.neutral
          }
        >
          {schedule.hall[0].abbreviation}
        </Grid>
        {/* score 1 */}
        <Grid
          item
          xs={1}
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
        {/* versus */}
        <Grid item xs={1}>
          -
        </Grid>
        {/* score 2 */}
        <Grid
          item
          xs={1}
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
        {/* hall 2 */}
        <Grid
          item
          xs={1}
          md={1}
          className={
            hasScore
              ? firstWinner
                ? classes.neutral
                : classes.winner
              : classes.neutral
          }
        >
          {schedule.hall[1].abbreviation}
        </Grid>
        {!isLaptop && (
          <Grid item xs={12} style={{ textAlign: "left", paddingLeft: "2%" }}>
            {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
            {schedule.venue}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center"
    // backgroundColor: "gold"
  },
  bar: {
    height: "0.6vh",
    margin: "1.5% 0"
  },
  winner: {
    fontWeight: "bold"
    // backgroundColor: "pink"
  },
  neutral: {
    // backgroundColor: "beige"
  }
});
