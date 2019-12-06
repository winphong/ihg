import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ScheduleBox from "./scheduleBox";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import dateformat from "dateformat";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";
import Typography from "@material-ui/core/Typography";

export default function Calendar({ schedules, isAdmin }) {
  const classes = useStyles();
  const [days, setDay] = React.useState([
    { num: 7, name: "Sunday" },
    { num: 1, name: "Monday" },
    { num: 2, name: "Tuesday" },
    { num: 3, name: "Wednesday" },
    { num: 4, name: "Thursday" },
    { num: 5, name: "Friday" },
    { num: 6, name: "Saturday" }
  ]);
  const [startDate, setStartDate] = React.useState(new Date("5 Jan 2020"));
  const [weekNum, setWeekNum] = React.useState(-1);
  const [currentDay, setCurrentDay] = React.useState(3);
  const mobileDays = [currentDay - 3, currentDay - 2, currentDay - 1];
  const [stay, setStay] = React.useState(false);

  let currentCount = 0;
  let previousCount = -1;

  const date = new Date(startDate);
  let current = currentDay;

  function handleBack(isMobile) {
    setStay(true);
    if (isMobile) {
      setStartDate(new Date(startDate.setDate(startDate.getDate() - 3)));
      current = current - 3;
      if (current <= 0) {
        current = 7 - Math.abs(current);
        setWeekNum(weekNum - 1);
      }
      setCurrentDay(current);
    } else {
      setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
      setWeekNum(weekNum - 1);
    }
    setTimeout(() => setStay(false), 200);
  }

  function handleNext(isMobile) {
    setStay(true);
    if (isMobile) {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 3)));
      current = current + 3;
      if (current > 7) {
        current = current % 7;
        setWeekNum(weekNum + 1);
      }
      setCurrentDay(current);
    } else {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
      setWeekNum(weekNum + 1);
    }
    setTimeout(() => setStay(false), 200);
  }

  const notMobile = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container>
      <Grid container md={12} alignItems="center">
        <Grid
          item
          xs={2}
          md={5}
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <IconButton
            disabled={date <= new Date("5 Jan 2020")}
            onClick={() => handleBack(false)}
            // onClick={
            //   notMobile ? () => handleBack(false) : () => handleBack(true)
            // }
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Grid>
        <Grid item xs={8} md={2}>
          <Typography variant="h1" className={classes.week}>
            Week {weekNum}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          md={5}
          style={{
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          <IconButton
            disabled={date >= new Date("16 Feb 2020")}
            onClick={() => handleNext(false)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
      </Grid>

      <MediaQuery minWidth={960}>
        <Grid
          item
          xs={12}
          style={{
            minHeight: "100vmax"
            // backgroundColor: "beige"
          }}
        >
          <Grid container>
            {(notMobile ? days : mobileDays).map((day, index) => {
              if (index !== 0) {
                date.setDate(date.getDate() + 1);
                previousCount = currentCount;
              }
              currentCount = 0;

              return (
                <Grid item xs={true}>
                  <div>
                    <TransitionGroup>
                      <CSSTransition
                        key={`${weekNum}${date}`}
                        timeout={400}
                        classNames="fade"
                      >
                        <div className={classes.dateRow}>
                          <Typography className={classes.date}>
                            {dateformat(date, "dd'th' mmm")}
                          </Typography>
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                    <br />
                    <div style={{ marginTop: "3%" }}>
                      {notMobile && (
                        <Typography className={classes.day}>
                          {day.name}
                        </Typography>
                      )}
                      {!notMobile && (
                        <Typography className={classes.day}>
                          {days[day < 0 ? 7 + day : day].name}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <TransitionGroup>
                    <CSSTransition
                      key={`${weekNum}${date}`}
                      timeout={400}
                      classNames="fade"
                    >
                      <Grid container xs={12} className={classes.column}>
                        {schedules.length > 0 &&
                          schedules.map(schedule => {
                            const columnTime = new Date(schedule.startTime);
                            if (
                              columnTime.getDate() === date.getDate() &&
                              columnTime.getMonth() === date.getMonth()
                            ) {
                              currentCount += 1;
                              return (
                                <Grid item xs={12}>
                                  <ScheduleBox
                                    schedule={schedule}
                                    isAdmin={isAdmin}
                                    printLeftBorder={
                                      currentCount <= previousCount
                                    }
                                  />
                                </Grid>
                              );
                            }
                          })}
                      </Grid>
                    </CSSTransition>
                  </TransitionGroup>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </MediaQuery>
      {/* ------------------------------------------------- */}
      <MediaQuery maxWidth={959}>
        <div
          style={{
            minHeight: "100vmax",
            backgroundColor: "beige",
            display: "flex",
            overflowX: "scroll"
          }}
        >
          {/* <Grid container> */}
          {days.map((day, index) => {
            if (index !== 0) {
              date.setDate(date.getDate() + 1);
              previousCount = currentCount;
            }
            currentCount = 0;

            return (
              <div>
                <div style={{ height: "3%" }}>
                  {stay && (
                    <div
                      style={{
                        height: "7%",
                        position: "absolute",
                        backgroundColor: "pink",
                        zIndex: 100
                      }}
                    ></div>
                  )}
                  <TransitionGroup>
                    <CSSTransition
                      key={`${weekNum}${date}`}
                      timeout={400}
                      classNames="fade"
                    >
                      <div className={classes.dateRow}>
                        <Typography
                          className={classes.date}
                          style={{
                            position: stay ? "absolute" : null
                            // marginLeft: stay ? "17.6%" : "initial"
                          }}
                          // className={classes.absoluteDate}
                        >
                          {dateformat(date, "dd'th' mmm")}
                        </Typography>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
                <Typography className={classes.day}>{day.name}</Typography>
                <TransitionGroup>
                  <CSSTransition
                    key={`${weekNum}${date}`}
                    timeout={400}
                    classNames="fade"
                  >
                    <React.Fragment>
                      {schedules.length > 0 &&
                        schedules.map(schedule => {
                          const columnTime = new Date(schedule.startTime);
                          if (
                            columnTime.getDate() === date.getDate() &&
                            columnTime.getMonth() === date.getMonth()
                          ) {
                            currentCount += 1;
                            return (
                              <ScheduleBox
                                schedule={schedule}
                                isAdmin={isAdmin}
                                printLeftBorder={currentCount <= previousCount}
                              />
                            );
                          }
                        })}
                    </React.Fragment>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            );
          })}
        </div>
      </MediaQuery>
    </Grid>
  );
}

const styles = theme => ({
  container: {
    textAlign: "center",
    // border: "inset beige",
    // backgroundColor: "grey",
    padding: 0
  },
  absoluteDate: {
    position: "absolute",
    marginLeft: "17.6%",
    fontSize: "100%",
    fontWeight: "bold",
    color: "#958F87"
    // backgroundColor: "pink"
  },
  // absoluteDay: {
  //   marginTop: "2px",
  //   [theme.breakpoints.down("md")]: {
  //     fontSize: "100%",
  //     width: "50vmin"
  //   },
  //   fontSize: "110%",
  //   color: "#958F87",
  //   fontStyle: "italic",
  //   fontWeight: "bold"
  // },
  // absoluteDate: {
  //   [theme.breakpoints.down("md")]: {
  //     fontSize: "100%",
  //     width: "50vmin"
  //   },
  //   fontWeight: "bold",
  //   color: "#958F87",
  //   position: "absolute"
  // },
  date: {
    [theme.breakpoints.down("md")]: {
      fontSize: "100%",
      width: "50vmin"
    },
    fontWeight: "bold",
    fontSize: "150%",
    color: "#958F87"
  },
  dateRow: {
    [theme.breakpoints.down("md")]: {
      width: "50vmin"
    },
    [theme.breakpoints.up("md")]: {
      position: "absolute"
    },
    width: `${(10 / 12 / 7) * 100}%`
  },
  day: {
    [theme.breakpoints.down("md")]: {
      fontSize: "100%",
      width: "50vmin"
    },
    fontSize: "110%",
    color: "#958F87",
    fontStyle: "italic",
    fontWeight: "bold"
  },
  column: {
    [theme.breakpoints.down("sm")]: {
      // width: "32%"
    },
    position: "absolute",
    width: `${(10 / 12 / 7) * 100}%`
    // backgroundColor: "pink"
  },
  week: {
    [theme.breakpoints.up("md")]: {
      fontSize: "250%"
    },
    fontSize: "150%"
  }
});

const useStyles = makeStyles(styles);

{
  /* <table style={{ textAlign: "center", marginRight: "-100px" }}>
                  <TransitionGroup>
                    <CSSTransition
                      key={`${weekNum}${date}`}
                      timeout={400}
                      classNames="fade"
                    >
                      <tbody className={classes.column}>
                        {schedules.length > 0 &&
                          schedules.map((schedule, index) => {
                            const columnTime = new Date(schedule.startTime);
                            if (
                              columnTime.getDate() === date.getDate() &&
                              columnTime.getMonth() === date.getMonth()
                            ) {
                              return (
                                <tr key={schedule._id}>
                                  <td className={classes.table}>
                                    <ScheduleBox
                                      schedule={schedule}
                                      isAdmin={isAdmin}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          })}
                      </tbody>
                      
                    </CSSTransition>
                  </TransitionGroup>
                </table> */
}
