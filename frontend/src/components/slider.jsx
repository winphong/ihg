import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../components/card";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import MediaQuery, { useMediaQuery } from "react-responsive";

export default function Slider({ upcomingSchedules }) {
  const classes = useStyles();

  let currentWeekSchedule = upcomingSchedules;

  const [previous, setPrevious] = useState(
    currentWeekSchedule.length > 1 ? currentWeekSchedule.length - 1 : 0
  );
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(currentWeekSchedule.length > 1 ? 1 : 0);

  function handleBack() {
    const prev = previous;
    const curr = current;
    setPrevious(prev !== 0 ? prev - 1 : currentWeekSchedule.length - 1);
    setCurrent(prev);
    setNext(curr);
  }

  function handleNext() {
    const curr = current;
    const nxt = next;
    setPrevious(curr);
    setCurrent(nxt);
    setNext(nxt !== currentWeekSchedule.length - 1 ? nxt + 1 : 0);
  }

  const hasSpace = useMediaQuery({ minDeviceWidth: 1280 });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.sliderContainer}
    >
      <MediaQuery minWidth={1280}>
        <Grid item xs={1} sm={1}>
          <IconButton
            onClick={handleBack}
            disabled={currentWeekSchedule.length === 1}
            style={{ color: "grey", transform: "scale(1.5)" }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Grid>
        <Grid item xs={10} sm={10} className={classes.sliderContainer}>
          <TransitionGroup>
            <CSSTransition key={current} timeout={400} classNames="slide">
              <Grid
                container
                spacing={hasSpace ? 8 : 0}
                style={{
                  position: "absolute",
                  width: "83.333%",
                  margin: "0px",
                }}
              >
                <Grid className={classes.side} item md={4}>
                  {currentWeekSchedule.length >= 3 && (
                    <Card
                      schedule={currentWeekSchedule[previous]}
                      size="small"
                      white={true}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card
                    schedule={currentWeekSchedule[current]}
                    center={true}
                    size="small"
                    white={true}
                  />
                </Grid>
                <Grid item className={classes.side} md={4}>
                  {/* {next < schedules.length && ( */}
                  {currentWeekSchedule.length >= 3 && (
                    <Card
                      schedule={currentWeekSchedule[next]}
                      size="small"
                      white={true}
                    />
                  )}
                  {/* )} */}
                </Grid>
              </Grid>
            </CSSTransition>
          </TransitionGroup>
        </Grid>
        <Grid item xs={1} sm={1} className={classes.iconButton}>
          <IconButton
            onClick={handleNext}
            disabled={currentWeekSchedule.length === 1}
            style={{ color: "grey", transform: "scale(1.5)" }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
      </MediaQuery>
      <MediaQuery maxWidth={1279}>
        {currentWeekSchedule.length > 0 && (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "100%",
            }}
          >
            {currentWeekSchedule.map((e, index) => {
              return (
                <Card
                  schedule={e}
                  size="big"
                  index={index}
                  white={true}
                  key={e._id}
                />
              );
            })}
          </div>
        )}
      </MediaQuery>
    </Grid>
  );
}

const styles = (theme) => ({
  side: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  iconButton: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      // justifyContent: "flex-start",
      // justifyItems: "flex-start"
      // marginLeft: "-24px"
    },
  },
  sliderContainer: {
    [theme.breakpoints.only("xs")]: {
      // height: "30vmax"
    },
    [theme.breakpoints.up("lg")]: {
      height: "20vmax",
    },
    // backgroundColor: "pink"
  },
});

const useStyles = makeStyles(styles);
