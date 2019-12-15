import React from "react";
import dateformat from "dateformat";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export default function Card({ schedule, center, size, index, scheduleSize }) {
  const classes = useStyles();
  const theme = useTheme();
  const hasHalls = schedule.halls.length > 0;

  return (
    <Grid
      container
      className={
        center ? classes.center : size === "big" ? classes.big : classes.small
      }
    >
      {schedule.halls.length <= 2 && (
        <React.Fragment>
          <Grid container>
            <Grid item xs={5}>
              <img
                style={{
                  width: "90%",
                  border: hasHalls ? "" : "1px solid black"
                }}
                src={hasHalls ? schedule.halls[0].imgUrl : "./blank.png"}
              />
            </Grid>
            <Grid item xs={2} className={classes.vs}></Grid>
            <Grid item xs={5}>
              <img
                style={{
                  width: "90%",
                  border: hasHalls ? "" : "1px solid black"
                }}
                src={hasHalls ? schedule.halls[1].imgUrl : "./blank.png"}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.hallContainer} alignItems="center">
            <Grid item xs={5}>
              <Typography className={classes.hall}>
                {hasHalls ? schedule.halls[0].name.toUpperCase() : "TBA"}
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
              <Typography className={classes.hall}>
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
                <img className={classes.sixHallImage} src={hall.imgUrl} />
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
                  />
                </Grid>
              );
            } else if (index === 4) {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    <img
                      style={{
                        marginLeft: "46%"
                      }}
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[4].imgUrl}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[5].imgUrl}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{
                        marginLeft: "-46%"
                      }}
                      className={classes.sevenHallImageBottom}
                      src={schedule.halls[6].imgUrl}
                    />
                  </Grid>
                </React.Fragment>
              );
            }
          })}
        </Grid>
      )}
      {schedule.halls.length > 2 && (
        <Grid container className={classes.hallContainer} alignItems="center">
          {schedule.halls.map((hall, index) => {
            return (
              <Grid item xs={true} key={index}>
                <Typography className={classes.hall}>
                  {hall.abbreviation}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.sport}>
          {schedule.sport.toUpperCase()} {schedule.stage.toUpperCase()}
        </Typography>
        <Typography className={classes.information}>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h', ")}
          {schedule.venue}
        </Typography>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  big: {
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      height: "310px" // to align buttons
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
      flexShrink: 0
      // height: "35vh",
      // transform: "scale(0.8)",
      // borderRadius: "10px",
      // marginLeft: "10px"
      // backgroundColor: "yellow",
      // border: "1px solid black"
    },
    transform: "scale(0.8)"
    // margin: "1% 0.5%",
    // width: "100%",
    // height: "100%",
    // backgroundColor: "beige",
    // border: "1px solid black"
    // padding: "1vh"
  },
  small: {
    textAlign: "center",
    margin: "1% 0.5%",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    opacity: 0.3,
    transform: "scale(0.8)"
    // backgroundColor: "pink",
    // border: "1px solid gold"
  },
  center: {
    textAlign: "center",
    // height: "18vmax",
    padding: "1%",
    transform: "scale(1.3)",
    // border: "1px solid gold",
    [theme.breakpoints.down("md")]: {
      // transform: "scale(0.9)",
      // height: "35vmax"
    }
  },
  vs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  sport: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "120%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "150%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "250%"
    },
    fontSize: "180%",
    lineHeight: "100%"
    // color: "#C8B06B",
    // fontFamily: "TheNextFont"
    // backgroundColor: "purple"
  },
  hall: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "130%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "170%"
    },
    fontSize: "120%",
    lineHeight: "100%",
    fontFamily: "TheNextFont"
  },
  // hallCenter: {
  //   [theme.breakpoints.only("md")]: {
  //     fontSize: "200%"
  //   },
  //   fontSize: "120%",
  //   lineHeight: "100%",
  //   fontFamily: "TheNextFont"
  // },
  hallContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "40px"
      // backgroundColor: "pink"
    },
    [theme.breakpoints.only("md")]: {
      height: "80px"
      // backgroundColor: "pink"
    },
    height: "60px"
  },
  information: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "90%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "120%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "180%"
    },
    fontSize: "100%",
    color: "grey",
    lineHeight: "100%",
    marginTop: "1%"
  },
  sixHallImage: {
    [theme.breakpoints.down("md")]: {},
    width: "55%"
  },
  sevenHallImageTop: {
    [theme.breakpoints.down("md")]: {},
    width: "70%"
  },
  sevenHallImageBottom: {
    [theme.breakpoints.down("md")]: {
      width: "55%"
    },
    width: "60%"
  }
});

const useStyles = makeStyles(styles);
