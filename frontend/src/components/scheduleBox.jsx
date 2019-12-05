import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import dateformat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

export default function ScheduleBox({ schedule, isAdmin, printLeftBorder }) {
  const classes = useStyles();
  const size = schedule.halls.length;
  return (
    <React.Fragment>
      <Grid
        container
        style={{
          position: "absolute",
          height: "5vmax",
          borderLeft: printLeftBorder ? 0 : "2.5px solid #C8B06B",
          borderRight: "2.5px solid #C8B06B",
          marginTop: "30%"
        }}
      ></Grid>
      <Grid container className={classes.container}>
        <Grid item container xs={12}>
          <Grid item container xs={12}>
            {schedule.halls.map(({ colourCode }) => {
              return (
                <Grid
                  item
                  xs={true}
                  className={classes.bar}
                  style={{
                    backgroundColor: colourCode,
                    border:
                      colourCode === "#ffffff"
                        ? "0.05px solid #252527"
                        : `0.05px solid ${colourCode}`
                  }}
                />
              );
            })}
          </Grid>
          <Grid
            item
            container
            xs={12}
            className={classes.hallContainer}
            alignItems="center"
          >
            {size === 2 &&
              schedule.halls.map(hall => {
                return (
                  <Grid item xs={true}>
                    <Typography variant="h1" className={classes.hallDuo}>
                      {hall.abbreviation}
                    </Typography>
                  </Grid>
                );
              })}
            {size === 6 &&
              schedule.halls.map(hall => {
                return (
                  <Grid item xs={4}>
                    <Typography variant="h1" className={classes.hallCarnival}>
                      {hall.abbreviation}
                    </Typography>
                  </Grid>
                );
              })}
            {size === 7 &&
              schedule.halls.map((hall, index) => {
                if (index < 4) {
                  return (
                    <Grid item xs={3}>
                      <Typography variant="h1" className={classes.hallCarnival}>
                        {hall.abbreviation}
                      </Typography>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={4}>
                      <Typography variant="h1" className={classes.hallCarnival}>
                        {hall.abbreviation}
                      </Typography>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {!isAdmin && (
            <Typography className={classes.sport}>
              {schedule.sport}{" "}
              {schedule.sport !== "Ultimate Frisbee" &&
                schedule.sport !== "Softball" &&
                `(${schedule.gender.substr(0, 1)})`}
            </Typography>
          )}

          {isAdmin && (
            <Link
              style={{
                color: "#0074d9",
                cursor: "pointer",
                textDecoration: "none"
              }}
              to={{
                pathname: `/admin/schedule/${schedule._id}`,
                data: schedule // your data array of objects
              }}
            >
              <Typography
                className={classes.sport}
                style={{
                  color: "#0074d9"
                }}
              >
                {schedule.sport}{" "}
                {schedule.sport !== "Ultimate Frisbee" &&
                  schedule.sport !== "Softball" &&
                  `(${schedule.gender.substr(0, 1)})`}
              </Typography>
            </Link>
          )}
          <Typography className={classes.sport}>{schedule.stage}</Typography>
          <Typography className={classes.information}>
            {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
            {schedule.venue}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const styles = theme => ({
  container: {
    textAlign: "center",
    // border: "1px solid black",
    // borderLeft: "1px solid #C8B06B",
    marginTop: "5%",
    padding: "10%",
    [theme.breakpoints.up("sm")]: {
      // width: "100%"
    }
  },
  bar: {
    height: "10px"
  },
  hallContainer: {
    minHeight: "50px"
  },
  hallDuo: {
    fontSize: "150%",
    color: "black"
  },
  hallCarnival: {
    fontSize: "100%",
    color: "black"
  },
  sport: {
    fontWeight: "bold",
    fontSize: "110%",
    lineHeight: "120%",
    color: "#958F87"
  },
  information: {
    fontStyle: "italic",
    fontSize: "90%",
    color: "#D3DBD9"
  }
});

const useStyles = makeStyles(styles);
