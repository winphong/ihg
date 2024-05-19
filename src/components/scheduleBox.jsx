import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dateformat from "dateformat";
import BoxDivider from "./BoxDivider";

export default function ScheduleBox({ schedule, isAdmin }) {
  const classes = useStyles();
  const size = schedule.halls.length;

  return (
    <Grid container className={classes.container}>
      <BoxDivider />
      <div
        style={{
          padding: "15%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Grid item container md={12}>
          {/* Colour Bar */}
          <Grid item container md={12}>
            {schedule.halls.length > 0 &&
              schedule.halls.map(({ colourCode }) => {
                return (
                  <Grid
                    key={colourCode}
                    item
                    xs={true}
                    className={classes.bar}
                    style={{
                      backgroundColor: colourCode,
                      border:
                        colourCode === "#ffffff"
                          ? "0.05px solid #252527"
                          : `0.05px solid ${colourCode}`,
                    }}
                  />
                );
              })}
            {schedule.halls.length === 0 &&
              [0, 1].map((key) => {
                return (
                  <Grid
                    key={key}
                    item
                    xs={true}
                    className={classes.bar}
                    style={{
                      backgroundColor: "#C8B06B",
                    }}
                  />
                );
              })}
          </Grid>
          <Grid
            item
            container
            md={12}
            className={classes.hallContainer}
            alignItems="center"
          >
            {size === 2 &&
              schedule.halls.map((hall, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={5}>
                      <Typography className={classes.hallDuo}>
                        {hall.abbreviation}
                      </Typography>
                    </Grid>
                    {index === 0 && (
                      <Grid item xs={2}>
                        <Typography
                          style={{
                            fontSize: "100%",
                            color: "#958F87",
                          }}
                        >
                          vs
                        </Typography>
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}
            {schedule.halls.length < 2 && (
              <React.Fragment>
                <Grid item xs={5}>
                  <Typography className={classes.hallDuo}>TBA</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    style={{
                      fontSize: "100%",
                      color: "#958F87",
                      fontStyle: "italic",
                    }}
                  >
                    vs
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography className={classes.hallDuo}>TBA</Typography>
                </Grid>
              </React.Fragment>
            )}
            {size === 6 &&
              schedule.halls.map((hall, index) => {
                return (
                  <Grid key={index} item xs={4}>
                    <Typography className={classes.hallCarnival}>
                      {hall.abbreviation}
                    </Typography>
                  </Grid>
                );
              })}
            {size === 7 &&
              schedule.halls.map((hall, index) => {
                if (index < 4) {
                  return (
                    <Grid key={index} item xs={3}>
                      <Typography className={classes.hallCarnival}>
                        {hall.abbreviation}
                      </Typography>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item xs={4}>
                      <Typography
                        className={classes.hallCarnival}
                        style={{
                          marginLeft:
                            index === 6 ? "-46%" : index !== 5 ? "46%" : "",
                        }}
                      >
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
                textDecoration: "none",
              }}
              to={{
                pathname: `/admin/schedule/${schedule._id}`,
              }}
            >
              <Typography
                className={classes.sport}
                style={{
                  color: "#0074d9",
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
            {dateformat(new Date(schedule.startTime), "dd mmm yy, HHMM'h'")}
          </Typography>
          <Typography className={classes.information}>
            {schedule.venue}
          </Typography>
        </Grid>
      </div>
    </Grid>
  );
}

const styles = (theme) => ({
  container: {
    [theme.breakpoints.only("xs")]: {
      width: "200px",
    },
    [theme.breakpoints.only("sm")]: {
      transform: "scale(0.9)",
      width: "inherit",
    },
    height: "160px",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  bar: {
    height: "8px",
  },
  hallContainer: {
    minHeight: "50px",
  },
  hallDuo: {
    [theme.breakpoints.down("md")]: {
      fontSize: "100%",
    },
    fontWeight: "bold",
    fontSize: "150%",
    color: "black",
  },
  hallCarnival: {
    [theme.breakpoints.down("md")]: {},
    fontWeight: "bold",
    fontSize: "100%",
    color: "black",
  },
  sport: {
    [theme.breakpoints.only("md")]: {
      fontSize: "95%",
    },
    fontWeight: "bold",
    fontSize: "110%",
    lineHeight: "120%",
    color: "#958F87",
  },
  information: {
    [theme.breakpoints.only("md")]: {
      fontSize: "80%",
    },
    fontStyle: "italic",
    fontSize: "90%",
    color: "#958F87",
  },
});

const useStyles = makeStyles(styles);
