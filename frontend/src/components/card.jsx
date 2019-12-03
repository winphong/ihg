import React from "react";
import dateformat from "dateformat";
import Grid from "@material-ui/core/Grid";
import { useMediaQuery } from "react-responsive";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Card({ schedule, center, size, index, scheduleSize }) {
  const classes = useStyles();
  const shrink = useMediaQuery({ query: "(max-device-width: 959px)" });
  console.log(shrink);
  return (
    <Grid
      container
      className={
        center ? classes.center : size === "big" ? classes.big : classes.small
      }
    >
      <Grid
        container
        style={{
          transform: shrink ? "scale(0.8)" : ""
        }}
      >
        {schedule.halls.length === 2 && (
          <React.Fragment>
            <Grid container>
              <Grid item xs={5}>
                <img style={{ width: "90%" }} src={schedule.halls[0].imgUrl} />
              </Grid>
              <Grid item xs={2} className={classes.vs}></Grid>
              <Grid item xs={5}>
                <img style={{ width: "90%" }} src={schedule.halls[1].imgUrl} />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.hallContainer}
              alignItems="center"
            >
              <Grid item xs={5}>
                <Typography className={classes.hall}>
                  {schedule.halls[0].name.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={5}>
                <Typography className={classes.hall}>
                  {schedule.halls[1].name.toUpperCase()}
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
          <Typography className={classes.sport}>
            {schedule.sport.toUpperCase()} {schedule.stage.toUpperCase()}
          </Typography>
          <Typography className={classes.information}>
            {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h', ")}
            {schedule.venue}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  big: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      transform: "scale(0.8)",
      height: "310px"
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
      height: "40vh",
      flexShrink: 0
      // transform: "scale(0.8)",
      // borderRadius: "10px",
      // marginLeft: "10px"
      // backgroundColor: "yellow",
      // border: "1px solid black"
    }
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
    // backgroundColor: "beige",
    width: "100%",
    height: "100%",
    padding: "0.5%",
    opacity: 0.3,
    transform: "scale(0.85)"
    // border: "1px solid gold"
  },
  center: {
    textAlign: "center",
    height: "310px",
    padding: "1%",
    transform: "scale(1.3)",
    // border: "1px solid gold",
    [theme.breakpoints.down("md")]: {
      transform: "scale(0.9)"
    }
  },
  vs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  sport: {
    fontSize: "25px",
    lineHeight: "100%",
    color: "#C8B06B",
    fontFamily: "TheNextFont"
    // backgroundColor: "purple"
  },
  hall: {
    [theme.breakpoints.down("md")]: {
      fontSize: "5vw"
    },
    fontSize: "1.3vw",
    lineHeight: "100%",
    fontFamily: "TheNextFont"
  },
  hallContainer: {
    [theme.breakpoints.down("md")]: {
      height: "60px"
      // backgroundColor: "pink"
    },
    height: "60px"
  },
  information: {
    fontSize: "16px",
    color: "grey",
    lineHeight: "100%",
    marginTop: "2%"
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
