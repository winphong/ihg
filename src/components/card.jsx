import React from "react";
import dateformat from "dateformat";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Card({ schedule, center, size, white }) {
  const classes = useStyles();
  const hasHalls = schedule.halls.length > 0;

  const mate10Landscapre = useMediaQuery({
    minWidth: 565,
    maxWidth: 570,
    orientation: "landscape",
  });

  const xxs = useMediaQuery({ maxWidth: 329 });
  const sm = useMediaQuery({ maxWidth: 959 });
  const md = useMediaQuery({ maxWidth: 1279 });

  let width = "";
  let transform = "";

  if (xxs) width = "65%";
  else if (sm) width = "55%";
  else if (md) width = "40%";

  if (mate10Landscapre) {
    transform = "scale(0.65)";
  }

  return (
    <Grid
      container
      className={
        center ? classes.center : size === "big" ? classes.big : classes.small
      }
      style={{
        width: width,
        transform: transform,
      }}
    >
      {schedule.halls.length <= 2 && (
        <React.Fragment>
          <Grid container>
            <Grid item xs={5}>
              <img
                style={{
                  width: "90%",
                }}
                src={hasHalls ? schedule.halls[0].imgUrl : "./blank.png"}
                alt="hall-1"
              />
            </Grid>
            <Grid item xs={2} className={classes.vs}></Grid>
            <Grid item xs={5}>
              <img
                style={{
                  width: "90%",
                }}
                src={hasHalls ? schedule.halls[1].imgUrl : "./blank.png"}
                alt="hall-2"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.hallContainer} alignItems="center">
            <Grid item xs={5}>
              <Typography
                className={size === "small" ? classes.hallSlider : classes.hall}
                style={{ color: white ? "#F9FBFA" : "" }}
              >
                {hasHalls ? schedule.halls[0].name.toUpperCase() : "TBA"}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Typography
                className={size === "small" ? classes.hallSlider : classes.hall}
                style={{ color: white ? "#F9FBFA" : "" }}
              >
                {hasHalls ? schedule.halls[1].name.toUpperCase() : "TBA"}
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      {schedule.halls.length === 6 && (
        <Grid container>
          {schedule.halls.map((hall, index) => {
            return (
              <Grid item xs={4} key={index}>
                <img
                  className={classes.sixHallImage}
                  src={hall.imgUrl}
                  alt="hall-img"
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      {schedule.halls.length === 7 && (
        <Grid container>
          {schedule.halls.map((hall, index) => {
            if (index < 4) {
              return (
                <Grid item xs={3} key={index}>
                  <img
                    className={classes.sevenHallImageTop}
                    src={hall.imgUrl}
                    alt="hall-img-3"
                  />
                </Grid>
              );
            } else if (index === 4) {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    <img
                      style={{
                        marginLeft: "46%",
                      }}
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[4].imgUrl}
                      alt="hall-img-4"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[5].imgUrl}
                      alt="hall-mg-5"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{
                        marginLeft: "-46%",
                      }}
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[6].imgUrl}
                      alt="hall-mg-6"
                    />
                  </Grid>
                </React.Fragment>
              );
            }
            return null;
          })}
        </Grid>
      )}
      {schedule.halls.length > 2 && (
        <Grid container className={classes.hallContainer} alignItems="center">
          {schedule.halls.map((hall, index) => {
            return (
              <Grid item xs={true} key={index}>
                <Typography
                  className={
                    size === "small" ? classes.hallSlider : classes.hall
                  }
                  style={{ color: white ? "#F9FBFA" : "" }}
                >
                  {hall.abbreviation}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography
          variant="h1"
          className={size === "small" ? classes.sportSlider : classes.sport}
        >
          {schedule.sport.toUpperCase()} ({schedule.gender.substr(0, 1)}){" "}
          {schedule.stage.toUpperCase()}
        </Typography>
        <Typography
          className={classes.information}
          style={{
            fontSize: size === "small" ? "100%" : "",
            color: white ? "#F9FBFA" : "",
          }}
        >
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h', ")}
          {schedule.venue}
        </Typography>
      </Grid>
    </Grid>
  );
}

const styles = (theme) => ({
  big: {
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      height: "310px", // to align buttons
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
      flexShrink: 0,
    },
    transform: "scale(0.8)",
  },
  small: {
    textAlign: "center",
    margin: "1% 0.5%",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    opacity: 0.3,
    transform: "scale(0.8)",
  },
  center: {
    textAlign: "center",
    padding: "1%",
    transform: "scale(1.3)",
    [theme.breakpoints.down("md")]: {},
  },
  vs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  hall: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "130%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "170%",
    },
    fontSize: "140%",
    lineHeight: "100%",
    fontFamily: "TheNextFont",
  },
  sport: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "120%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "150%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "250%",
    },
    fontSize: "180%",
    lineHeight: "100%",
  },
  hallSlider: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "130%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "170%",
    },
    fontSize: "120%",
    lineHeight: "100%",
    color: "#F9FBFA",
    fontFamily: "TheNextFont",
  },
  sportSlider: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "120%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "150%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "250%",
    },
    fontSize: "170%",
    lineHeight: "100%",
  },
  hallContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "40px",
    },
    [theme.breakpoints.only("md")]: {
      height: "80px",
    },
    height: "60px",
  },
  information: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "90%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "120%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "180%",
    },
    fontSize: "130%",
    color: "grey",
    lineHeight: "100%",
    marginTop: "1%",
  },
  sixHallImage: {
    [theme.breakpoints.down("md")]: {},
    width: "55%",
  },
  sevenHallImageTop: {
    [theme.breakpoints.down("md")]: {},
    width: "70%",
  },
  sevenHallImageBottom: {
    [theme.breakpoints.down("md")]: {
      width: "55%",
    },
    width: "60%",
  },
});

const useStyles = makeStyles(styles);
