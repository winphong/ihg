import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

export default function Card({ schedule, center, size, index }) {
  const classes = useStyles();
  console.log(index);
  return (
    <Grid
      container
      className={
        center ? classes.center : size === "big" ? classes.big : classes.small
      }
    >
      {schedule.halls.length === 2 && (
        <Grid container>
          <Grid item xs={5}>
            <img style={{ width: "90%" }} src={schedule.halls[0].imgUrl} />
          </Grid>
          <Grid item xs={2} className={classes.vs}></Grid>
          <Grid item xs={5}>
            <img style={{ width: "90%" }} src={schedule.halls[1].imgUrl} />
          </Grid>
        </Grid>
      )}
      {schedule.halls.length === 6 && (
        <Grid container>
          {schedule.halls.map(hall => {
            return (
              <Grid item xs={4}>
                <img style={{ width: "60%" }} src={hall.imgUrl} />
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
                <Grid item xs={3}>
                  <img style={{ width: "80%" }} src={hall.imgUrl} />
                </Grid>
              );
            } else if (index === 4) {
              return (
                <React.Fragment>
                  <Grid item xs={4}>
                    <img
                      style={{
                        width: "55%",
                        marginLeft: "46%"
                      }}
                      src={schedule.halls[4].imgUrl}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "55%" }}
                      src={schedule.halls[5].imgUrl}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{
                        width: "55%",
                        marginLeft: "-46%"
                      }}
                      src={schedule.halls[6].imgUrl}
                    />
                  </Grid>
                </React.Fragment>
              );
            }
          })}
        </Grid>
      )}
      <Grid container className={classes.hallContainer} alignItems="center">
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
      <Grid item xs={12}>
        <Typography className={classes.sport}>
          {schedule.sport.toUpperCase()}
        </Typography>
        <Typography className={classes.sport}>
          {schedule.stage.toUpperCase()}
        </Typography>
        <Typography className={classes.information}>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h', ")}
          {schedule.venue}
        </Typography>
        {index < 2 && <Divider style={{ marginTop: "5%" }} />}
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  big: {
    textAlign: "center",
    margin: "1% 0.5%",
    width: "100%",
    height: "100%",
    // backgroundColor: "beige",
    // border: "3px solid #C8B06B",
    padding: "2%"
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
    width: "100%",
    height: "100%",
    padding: "1%",
    transform: "scale(1.3)",
    // border: "1px solid gold",
    [theme.breakpoints.down("sm")]: {
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
    fontWeight: "800",
    lineHeight: "100%",
    color: "#C8B06B"
  },
  hall: {
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "100%"
  },
  hallContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "80px"
    },
    height: "50px"
  },
  information: {
    fontSize: "16px",
    color: "grey",
    lineHeight: "100%",
    marginTop: "2%"
  }
});

const useStyles = makeStyles(styles);
