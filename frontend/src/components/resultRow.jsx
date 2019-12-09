import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function ResultRow({ schedule, isAdmin, byDate }) {
  const classes = useStyles();
  const theme = useTheme();

  const hasScore =
    schedule.halls[0].score >= 0 &&
    schedule.halls[1].score >= 0 &&
    schedule.halls[0].score !== schedule.halls[1].score
      ? true
      : false;
  const firstWinner = schedule.halls[0].score > schedule.halls[1].score;

  const isLaptop = useMediaQuery({ minDeviceWidth: 960 });
  const dateFormat = byDate ? "HHMM'h'" : "dd mmm',' HHMM'h'";

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

      <Grid
        item
        container
        xs={12}
        className={classes.infoContainer}
        alignItems="center"
      >
        {/* sports name */}
        <Grid item xs={6} md={3} className={classes.nameContainer}>
          {isAdmin && (
            <Link
              style={{
                cursor: "pointer",
                textDecoration: "none"
              }}
              to={{
                pathname: `/admin/score/${schedule._id}`
              }}
            >
              <Typography
                className={classes.sport}
                style={{
                  color: "#0074d9"
                }}
              >
                {schedule.sport} {schedule.stage}
              </Typography>
            </Link>
          )}
          {!isAdmin && (
            <Typography className={classes.sport}>
              {schedule.sport} {schedule.stage}
            </Typography>
          )}
        </Grid>
        {/* sports venue / timing */}
        {isLaptop && (
          <Grid item xs={4}>
            <Typography className={classes.information}>
              {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
              {schedule.venue}
            </Typography>
          </Grid>
        )}
        {/* hall 1 */}
        <Grid item xs={1} md={1}>
          <Typography
            className={
              hasScore && firstWinner ? classes.winner : classes.neutral
            }
          >
            {schedule.halls[0].abbreviation}
          </Typography>
        </Grid>
        {/* score 1 */}
        <Grid item xs={1}>
          <Typography
            className={
              hasScore && firstWinner ? classes.winner : classes.neutral
            }
          >
            {schedule.halls[0].score}
          </Typography>
        </Grid>
        {/* versus */}
        <Grid item xs={1} style={{ textAlign: "center" }}>
          <Typography style={{ color: "#958F87" }}> - </Typography>
        </Grid>
        {/* score 2 */}
        <Grid item xs={1}>
          <Typography
            className={
              hasScore && !firstWinner ? classes.winner : classes.neutral
            }
          >
            {schedule.halls[1].score}
          </Typography>
        </Grid>
        {/* hall 2 */}
        <Grid item xs={1} md={1}>
          <Typography
            className={
              hasScore && !firstWinner ? classes.winner : classes.neutral
            }
          >
            {schedule.halls[1].abbreviation}
          </Typography>
        </Grid>
        {!isLaptop && (
          <Grid item xs={12} style={{ paddingLeft: "2%" }}>
            <Typography className={classes.information}>
              {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
              {schedule.venue}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    // backgroundColor: "gold"
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
    height: "5px"
  },
  sport: {
    [theme.breakpoints.down("md")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    color: "#252527"
  },
  information: {
    [theme.breakpoints.down("md")]: {
      fontSize: "90%"
    },
    fontSize: "100%",
    color: "#D3DBD9",
    fontStyle: "italic"
    // fontWeight: "bold"
  },
  winner: {
    [theme.breakpoints.down("md")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    // backgroundColor: "pink",
    textAlign: "center",
    color: "#252527"
  },
  neutral: {
    [theme.breakpoints.down("md")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    textAlign: "center",
    color: "#958F87"
  }
}));
