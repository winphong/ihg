import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dateformat from "dateformat";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ScheduleBox({
  schedule,
  isAdmin,
  printLeftBorder,
  index
}) {
  const classes = useStyles();
  const theme = useTheme();
  const size = schedule.halls.length;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      {!isMobile && (
        <div
          style={{
            borderLeft: printLeftBorder
              ? 0
              : index === 0
              ? 0
              : "1px solid #C8B06B",
            borderRight: index === 6 ? 0 : "1px solid #C8B06B"
          }}
          className={classes.border}
        />
      )}
      <Grid container className={classes.container}>
        <Grid item container md={12}>
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
                          : `0.05px solid ${colourCode}`
                    }}
                  />
                );
              })}
            {schedule.halls.length === 0 &&
              [0, 1].map(key => {
                return (
                  <Grid
                    key={key}
                    item
                    xs={true}
                    className={classes.bar}
                    style={{
                      backgroundColor: "#C8B06B"
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
                            color: "#958F87"
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
                      fontStyle: "italic"
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
                            index === 6 ? "-46%" : index !== 5 ? "46%" : ""
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
                schedule.sport !== "Swimming" &&
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
                pathname: `/admin/schedule/${schedule._id}`
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
                  schedule.sport !== "Swimming" &&
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
    [theme.breakpoints.only("xs")]: {
      width: "50vmin",
      transform: "scale(0.9)"
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "5%"
    },
    [theme.breakpoints.only("sm")]: {
      transform: "scale(0.9)",
      width: "inherit"
      // borderLeft: "2.5px solid #C8B06B",
      // borderRight: "2.5px solid #C8B06B"
    },
    textAlign: "center",
    padding: "10%",
    // backgroundColor: "pink",
    position: "relative",
    zIndex: 2
  },
  border: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      height: "5.5vmax",
      marginTop: "35%",
      width: "100%"
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "40%",
      height: "7vmax"
    },
    [theme.breakpoints.up("xl")]: {
      height: "4.5vmax"
    },
    ["@media(min-width: 1501px)"]: {
      marginTop: "30%",
      height: "4.5vmax"
    },
    ["@media(min-width: 1760px)"]: {
      marginTop: "25%"
    },
    ["@media(min-width: 1980px)"]: {
      height: "4vmax"
    }
  },
  bar: {
    height: "8px"
  },
  hallContainer: {
    minHeight: "50px"
  },
  hallDuo: {
    [theme.breakpoints.down("md")]: {
      fontSize: "100%"
    },
    fontWeight: "bold",
    fontSize: "150%",
    color: "black"
  },
  hallCarnival: {
    [theme.breakpoints.down("md")]: {},
    fontWeight: "bold",
    fontSize: "100%",
    color: "black"
  },
  sport: {
    [theme.breakpoints.only("md")]: {
      fontSize: "95%"
    },
    fontWeight: "bold",
    fontSize: "110%",
    lineHeight: "120%",
    color: "#958F87"
  },
  information: {
    [theme.breakpoints.only("md")]: {
      fontSize: "80%"
    },
    fontStyle: "italic",
    fontSize: "90%",
    color: "#958F87",
    minHeight: "37px"
  }
});

const useStyles = makeStyles(styles);
