import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../components/card";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import MediaQuery, { useMediaQuery } from "react-responsive";

export default function Slider({ schedules }) {
  const classes = useStyles();

  // const [margin, setMargin] = useState(
  //   schedules.length >= 3 ? 3 : schedules.length
  // );

  const weeks = [
    new Date("5 Jan 2020"),
    new Date("12 Jan 2020"),
    new Date("19 Jan 2020"),
    new Date("26 Jan 2020"),
    new Date("2 Feb 2020"),
    new Date("9 Feb 2020"),
    new Date("16 Feb 2020")
  ];

  const currentDate = new Date();
  let idx = 0;

  weeks.map((week, index) => {
    if (currentDate > week) idx = index;
  });

  const firstDay = weeks[idx];
  const lastDay = new Date(weeks[idx]);
  lastDay.setDate(lastDay.getDate() + 7);

  const currentWeekSchedule = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.startTime);
    return scheduleDate >= firstDay && scheduleDate < lastDay;
  });

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

  const hasSpace = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.sliderContainer}
    >
      <MediaQuery minWidth={960}>
        <Grid item xs={1} sm={1}>
          <IconButton
            onClick={handleBack}
            disabled={currentWeekSchedule.length === 1}
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
                  margin: "0px"
                }}
              >
                <Grid className={classes.side} item md={4}>
                  {/* {previous  && ( */}
                  {currentWeekSchedule.length >= 3 && (
                    <Card
                      schedule={currentWeekSchedule[previous]}
                      size="small"
                    />
                  )}
                  {/* )} */}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card
                    schedule={currentWeekSchedule[current]}
                    center={true}
                    size="small"
                  />
                </Grid>
                <Grid item className={classes.side} md={4}>
                  {/* {next < schedules.length && ( */}
                  {currentWeekSchedule.length >= 3 && (
                    <Card schedule={currentWeekSchedule[next]} size="small" />
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
          >
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
      </MediaQuery>
      <MediaQuery maxWidth={959}>
        {currentWeekSchedule.length > 0 && (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "100%",
              margin: "5% 0"

              // height: "50vmax"
              // backgroundColor: "pink"
            }}
          >
            {currentWeekSchedule.map((e, index) => {
              return (
                <Card
                  schedule={e}
                  size="big"
                  index={index}
                  // scheduleSize={schedules.length}
                />
              );
            })}
          </div>
        )}
      </MediaQuery>
    </Grid>
  );
}

const styles = theme => ({
  side: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  iconButton: {
    [theme.breakpoints.down("sm")]: {
      display: "flex"
      // justifyContent: "flex-start",
      // justifyItems: "flex-start"
      // marginLeft: "-24px"
    }
  },
  sliderContainer: {
    [theme.breakpoints.up("sm")]: {
      height: "22.5vmax"
    },
    [theme.breakpoints.down("sm")]: {
      height: "40vmax"
    }
    // [theme.breakpoints.between("sm", "sm")]: {
    //   height: "80vmax"
    // }
    // backgroundColor: "pink"
  }
});

const useStyles = makeStyles(styles);
