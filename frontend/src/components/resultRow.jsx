import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function ResultRow({ schedule, isAdmin }) {
  const classes = useStyles();
  const hasScore =
    schedule.halls[0].score >= 0 && schedule.halls[1].score >= 0 ? true : false;
  const firstWinner = schedule.halls[0].score > schedule.halls[1].score;

  const isLaptop = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container className={classes.container}>
      <Grid item container xs={8} md={4} className={classes.barContainer}>
        <Grid
          item
          xs={3}
          md={3}
          className={classes.bar}
          style={{
            backgroundColor: schedule.halls[0].colourCode,
            border:
              schedule.halls[0].colourCode === "#ffffff"
                ? "1px solid black"
                : ``
          }}
        />
        <Grid
          item
          xs={3}
          md={3}
          className={classes.bar}
          style={{
            backgroundColor: schedule.halls[1].colourCode,
            border:
              schedule.halls[1].colourCode === "#ffffff"
                ? "1px solid black"
                : ``
          }}
        />
      </Grid>

      <Grid item container xs={12} className={classes.infoContainer}>
        {/* sports name */}
        <Grid item xs={5} md={3} className={classes.nameContainer}>
          {isAdmin && (
            <Link
              style={{
                color: "#0074d9",
                cursor: "pointer",
                textDecoration: "none"
              }}
              to={{
                pathname: `/admin/score/${schedule._id}`
              }}
            >
              <Typography>
                {schedule.sport} {schedule.stage}
              </Typography>
            </Link>
          )}
          {!isAdmin && (
            <Typography>
              {schedule.sport} {schedule.stage}
            </Typography>
          )}
        </Grid>
        {/* sports venue / timing */}
        {isLaptop && (
          <Grid item xs={4}>
            <Typography>
              {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
              {schedule.venue}
            </Typography>
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
          <Typography>{schedule.halls[0].abbreviation}</Typography>
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
          <Typography>{schedule.halls[0].score}</Typography>
        </Grid>
        {/* versus */}
        <Grid item xs={1} style={{ textAlign: "center" }}>
          <Typography> - </Typography>
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
          <Typography>{schedule.halls[1].score}</Typography>
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
          <Typography>{schedule.halls[1].abbreviation}</Typography>
        </Grid>
        {!isLaptop && (
          <Grid item xs={12} style={{ paddingLeft: "2%" }}>
            {dateformat(new Date(schedule.startTime), "dd mmm',' HHMM'h'")},{" "}
            {schedule.venue}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: "gold"
  },
  infoContainer: {
    margin: "1% 0"
  },
  nameContainer: {
    paddingLeft: "2%"
  },
  barContainer: {
    margin: "1% 0 0 2%"
  },
  bar: {
    height: "10px"
  },
  winner: {
    fontWeight: "bold",
    backgroundColor: "pink",
    textAlign: "center"
  },
  neutral: {
    backgroundColor: "beige",
    textAlign: "center"
  }
});
