import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function ResultRowCarnival({ schedule, isAdmin }) {
  const classes = useStyles();

  const sortedHall = schedule.halls[0].score
    ? schedule.halls.sort((a, b) => {
        return a.score >= b.score ? 1 : -1;
      })
    : schedule.halls.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      });
  const isLaptop = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container className={classes.container}>
      <Grid item container xs={4} md={2} className={classes.barContainer}>
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
        className={classes.infoContainer}
        alignItems="center"
      >
        <Grid item xs={5} md={3} className={classes.nameContainer}>
          {isAdmin && (
            <React.Fragment>
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
              {!isLaptop && (
                <Grid item xs={12}>
                  <Typography>
                    {dateformat(new Date(schedule.startTime), "HHMM'h'")},
                    {schedule.venue}
                  </Typography>
                </Grid>
              )}
            </React.Fragment>
          )}
          {!isAdmin && (
            <React.Fragment>
              <Typography>
                {schedule.sport} {schedule.stage}
              </Typography>
              {!isLaptop && (
                <Grid item xs={12}>
                  <Typography>
                    {dateformat(new Date(schedule.startTime), "HHMM'h'")},
                    {schedule.venue}
                  </Typography>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Grid>
        {isLaptop && (
          <Grid item xs={4}>
            <Typography>
              {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
              {schedule.venue}
            </Typography>
          </Grid>
        )}
        <Grid item container xs={7} md={5} style={{ textAlign: "center" }}>
          {sortedHall.map((hall, index) => {
            return (
              <Grid item xs={true} key={index}>
                <div
                  style={{
                    fontWeight: hall.score
                      ? index === 0
                        ? "bold"
                        : "normal"
                      : "normal"
                  }}
                >
                  {hall.abbreviation}
                  <br />
                  {hall.score && (
                    <div>
                      {hall.score}
                      {index === 0 ? "st" : ""}
                      {index === 1 ? "nd" : ""}
                      {index === 2 ? "rd" : ""}
                      {index > 2 ? "th" : ""}
                    </div>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    backgroundColor: "pink"
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
    backgroundColor: "brown"
  },
  neutral: {
    backgroundColor: "silver"
  }
});
