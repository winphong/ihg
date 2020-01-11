import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function ResultRowCarnival({ schedule, isAdmin, byDate }) {
  const classes = useStyles();

  const sortedHall = schedule.halls[0].score
    ? schedule.halls.sort((a, b) => {
        return a.score >= b.score ? 1 : -1;
      })
    : schedule.halls.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      });
  const isMobilePortrait = useMediaQuery({ minDeviceWidth: 500 });
  const dateFormat = byDate ? "HHMM'h'" : "dd mmm',' HHMM'h'";
  const gender = schedule.gender.substr(0, 1);

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        xs={4}
        sm={2}
        // md={2}
        className={classes.barContainer}
      >
        {sortedHall.map(hall => {
          return (
            <Grid
              item
              key={hall.colourCode}
              xs={true}
              className={classes.bar}
              style={{
                backgroundColor: hall.colourCode,
                border:
                  hall.colourCode === "#ffffff" ? "0.005vh solid black" : ``
              }}
            />
          );
        })}
      </Grid>

      <Grid
        item
        container
        xs={12}
        className={sortedHall[0].score ? "" : classes.infoContainer}
        style={{
          margin: isMobilePortrait ? "" : "1% 0"
        }}
        alignItems="center"
      >
        <Grid item xs={5} sm={4} md={3} className={classes.nameContainer}>
          {isAdmin && (
            <React.Fragment>
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
                  {schedule.sport}{" "}
                  {schedule.sport === "Floorball" ? `(${gender})` : ""}{" "}
                  {schedule.stage}
                </Typography>
              </Link>
              {!isMobilePortrait && (
                <Grid item xs={12}>
                  <Typography className={classes.information}>
                    {dateformat(new Date(schedule.startTime), dateFormat)},
                    {schedule.venue}
                  </Typography>
                </Grid>
              )}
            </React.Fragment>
          )}
          {/* Admin */}
          {!isAdmin && (
            <React.Fragment>
              <Typography className={classes.sport}>
                {schedule.sport}
                {schedule.sport === "Floorball" ? `(${gender})` : ""}{" "}
                {schedule.stage}
              </Typography>
              {!isMobilePortrait && (
                <Grid item xs={12}>
                  <Typography className={classes.information}>
                    {dateformat(new Date(schedule.startTime), "HHMM'h'")},
                    {schedule.venue}
                  </Typography>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Grid>
        {isMobilePortrait && (
          <Grid item xs={4} sm={3}>
            <Typography className={classes.information}>
              {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
              {schedule.venue}
            </Typography>
          </Grid>
        )}
        <Grid
          item
          container
          xs={7}
          sm={5}
          md={5}
          style={{ textAlign: "center" }}
        >
          {sortedHall.map((hall, index) => {
            return (
              <Grid item xs={true} key={index}>
                <Typography
                  className={
                    hall.score && index === 0 ? classes.winner : classes.neutral
                  }
                >
                  {hall.abbreviation}
                  {hall.score && (
                    <div>
                      {hall.score}
                      {index === 0 ? "st" : ""}
                      {index === 1 ? "nd" : ""}
                      {index === 2 ? "rd" : ""}
                      {index > 2 ? "th" : ""}
                    </div>
                  )}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    // backgroundColor: "pink"
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
    // backgroundColor: "brown",
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
    // backgroundColor: "silver",
    textAlign: "center",
    color: "#958F87"
  }
}));
