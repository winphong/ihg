import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function ResultRow({ schedule, isAdmin, byDate }) {
  const classes = useStyles();
  const hasHalls = schedule.halls.length > 0;

  const hasScore =
    hasHalls &&
    schedule.halls[0].score >= 0 &&
    schedule.halls[1].score >= 0 &&
    schedule.halls[0].score !== schedule.halls[1].score
      ? true
      : false;
  const firstWinner =
    hasHalls && schedule.halls[0].score > schedule.halls[1].score;

  const isMobilePortrait = useMediaQuery({ minDeviceWidth: 500 });
  const dateFormat = byDate ? "HHMM'h'" : "dd mmm',' HHMM'h'";
  const gender = schedule.gender.substr(0, 1);

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        xs={8}
        sm={4}
        // md={4}
        className={classes.barContainer}
      >
        <Grid
          item
          xs={3}
          className={classes.bar}
          style={{
            backgroundColor: hasHalls
              ? schedule.halls[0].colourCode
              : "#C8B06B",
            border:
              hasHalls && schedule.halls[0].colourCode === "#ffffff"
                ? "1px solid black"
                : ``
          }}
        />
        <Grid
          item
          xs={3}
          className={classes.bar}
          style={{
            backgroundColor: hasHalls
              ? schedule.halls[1].colourCode
              : "#C8B06B",
            border:
              hasHalls && schedule.halls[1].colourCode === "#ffffff"
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
        <Grid item xs={6} sm={4} md={3} className={classes.nameContainer}>
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
                {schedule.sport} ({gender}) {schedule.stage}
              </Typography>
            </Link>
          )}
          {!isAdmin && (
            <React.Fragment>
              <Typography className={classes.sport}>
                {schedule.sport} ({gender}) {schedule.stage}
              </Typography>
            </React.Fragment>
          )}
          {/* sports venue / timing */}
          {!isMobilePortrait && (
            <Typography className={classes.information}>
              {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
              {schedule.venue}
            </Typography>
          )}
        </Grid>
        {/* sports venue / timing */}
        {isMobilePortrait && (
          <Grid item sm={3}>
            <Typography className={classes.information}>
              {dateformat(new Date(schedule.startTime), dateFormat)},{" "}
              {schedule.venue}
            </Typography>
          </Grid>
        )}
        {/* hall 1 */}
        <Grid item xs={1} sm={1} md={1}>
          <Typography
            className={
              hasScore && firstWinner ? classes.winner : classes.neutral
            }
          >
            {hasHalls ? schedule.halls[0].abbreviation : "TBA"}
          </Typography>
        </Grid>
        {/* score 1 */}
        <Grid item xs={1}>
          <Typography
            className={
              hasScore && firstWinner ? classes.winner : classes.neutral
            }
          >
            {hasHalls ? schedule.halls[0].score : ""}
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
            {hasHalls ? schedule.halls[1].score : ""}
          </Typography>
        </Grid>
        {/* hall 2 */}
        <Grid item xs={1} sm={1} md={1}>
          <Typography
            className={
              hasScore && !firstWinner ? classes.winner : classes.neutral
            }
          >
            {hasHalls ? schedule.halls[1].abbreviation : "TBA"}
          </Typography>
        </Grid>
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
    [theme.breakpoints.only("xs")]: {
      fontSize: "70%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    color: "#252527"
  },
  information: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "70%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "90%"
    },
    fontSize: "100%",
    color: "#958F87",
    fontStyle: "italic"
    // fontWeight: "bold"
  },
  winner: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "70%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    // backgroundColor: "pink",
    textAlign: "center",
    color: "#252527"
  },
  neutral: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "70%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "90%"
    },
    fontWeight: "bold",
    textAlign: "center",
    color: "#958F87"
  }
}));
