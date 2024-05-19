import _ from "lodash";

import React from "react";
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

const days = [
  { num: 7, name: "Sunday" },
  { num: 1, name: "Monday" },
  { num: 2, name: "Tuesday" },
  { num: 3, name: "Wednesday" },
  { num: 4, name: "Thursday" },
  { num: 5, name: "Friday" },
  { num: 6, name: "Saturday" },
];

export default function Calendar({
  schedules,
  isAdmin,
  weekNum,
  handleUpdateWeeknum,
}) {
  const classes = useStyles();
  const today = new Date(process.env.REACT_APP_WEEK_0);

  const [startDate, setStartDate] = React.useState(today);
  const [currentDay] = React.useState(3);
  const mobileDays = [currentDay - 3, currentDay - 2, currentDay - 1];

  let currentCount = 0;
  let previousCount = -1;

  const dateFormatter = (time) => {
    return dateformat(time, "dd mmm yyyy");
  };

  const schedulesGroupedByStartDate = _.groupBy(schedules, (schedule) => {
    return dateFormatter(schedule.startTime);
  });

  const date = new Date(startDate);

  const notMobile = useMediaQuery({ minDeviceWidth: 960 });
  const isIpad = useMediaQuery({
    minWidth: 750,
    maxWidth: 800,
    orientation: "portrait",
  });

  function handleBack() {
    handleUpdateWeeknum(weekNum - 1);
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
  }

  function handleNext() {
    handleUpdateWeeknum(weekNum + 1);
    setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
  }

  return (
    <Grid container>
      <Grid
        container
        md={12}
        alignItems="center"
        style={{ marginBottom: "2%" }}
      >
        <Grid
          item
          xs={2}
          md={5}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton disabled={weekNum === 0} onClick={handleBack}>
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
            justifyContent: "flex-start",
          }}
        >
          <IconButton disabled={weekNum === 5} onClick={handleNext}>
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
      </Grid>

      <MediaQuery minWidth={960}>
        <Grid item xs={12} className={classes.schedulesTableContainer}>
          <Grid container>
            {(notMobile ? days : mobileDays).map((day, index) => {
              if (index !== 0) {
                if (notMobile) date.setDate(date.getDate() + 1);
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
                            {(date.getDate() === 1 ||
                              date.getDate() === 21 ||
                              date.getDate() === 31) &&
                              dateformat(date, "dd'st' mmm")}
                            {(date.getDate() === 2 || date.getDate() === 22) &&
                              dateformat(date, "dd'nd' mmm")}
                            {(date.getDate() === 3 || date.getDate() === 23) &&
                              dateformat(date, "dd'rd' mmm")}
                            {![1, 2, 3, 21, 22, 23, 31].includes(
                              date.getDate()
                            ) && dateformat(date, "dd'th' mmm")}
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
                      <Grid container className={classes.column}>
                        {schedulesGroupedByStartDate[dateFormatter(date)] &&
                          schedulesGroupedByStartDate[dateFormatter(date)]
                            .length > 0 &&
                          schedulesGroupedByStartDate[dateFormatter(date)].map(
                            (schedule) => {
                              const columnTime = new Date(schedule.startTime);
                              if (
                                columnTime.getDate() === date.getDate() &&
                                columnTime.getMonth() === date.getMonth()
                              ) {
                                currentCount += 1;
                                return (
                                  <Grid item>
                                    <ScheduleBox
                                      schedule={schedule}
                                      isAdmin={isAdmin}
                                      printLeftBorder={
                                        currentCount <= previousCount
                                      }
                                      index={index}
                                    />
                                  </Grid>
                                );
                              }
                            }
                          )}
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
            display: "flex",
            overflowX: "scroll",
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
              <div key={day}>
                <div style={{ height: "3%", marginLeft: "8%" }}>
                  <TransitionGroup style={{ width: isIpad ? "20vmax" : "" }}>
                    <CSSTransition
                      key={`${weekNum}${date}`}
                      timeout={400}
                      classNames="fade"
                    >
                      <div className={classes.dateRow}>
                        <Typography
                          className={classes.date}
                          style={{
                            position: "static",
                            display: "block",
                            width: isIpad ? "20vmax" : "",
                          }}
                        >
                          {(date.getDate() === 1 ||
                            date.getDate() === 21 ||
                            date.getDate() === 31) &&
                            dateformat(date, "dd'st' mmm")}
                          {(date.getDate() === 2 || date.getDate() === 22) &&
                            dateformat(date, "dd'nd' mmm")}
                          {(date.getDate() === 3 || date.getDate() === 23) &&
                            dateformat(date, "dd'rd' mmm")}
                          {![1, 2, 3, 21, 22, 23, 31].includes(
                            date.getDate()
                          ) && dateformat(date, "dd'th' mmm")}
                        </Typography>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
                <Typography
                  className={classes.day}
                  style={{
                    marginLeft: "8%",
                    width: isIpad ? "20vmax" : "",
                  }}
                >
                  {day.name}
                </Typography>
                <TransitionGroup>
                  <CSSTransition
                    key={`${weekNum}${date}`}
                    timeout={400}
                    classNames="fade"
                  >
                    <div>
                      {schedulesGroupedByStartDate[dateFormatter(date)] &&
                        schedulesGroupedByStartDate[dateFormatter(date)]
                          .length > 0 &&
                        schedulesGroupedByStartDate[dateFormatter(date)].map(
                          (schedule) => {
                            const columnTime = new Date(schedule.startTime);
                            if (
                              columnTime.getDate() === date.getDate() &&
                              columnTime.getMonth() === date.getMonth()
                            ) {
                              currentCount += 1;
                              return (
                                <Grid container key={schedule._id}>
                                  <Grid item xs={10}>
                                    <div>
                                      <ScheduleBox
                                        schedule={schedule}
                                        isAdmin={isAdmin}
                                        printLeftBorder={
                                          currentCount <= previousCount
                                        }
                                        index={index}
                                      />
                                    </div>
                                  </Grid>
                                </Grid>
                              );
                            }
                          }
                        )}
                    </div>
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

const styles = (theme) => ({
  container: {
    textAlign: "center",
    padding: 0,
  },
  border: {
    [theme.breakpoints.only("xs")]: {
      height: "9vmax",
      marginTop: "350%",
    },
    width: 0,
  },
  date: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%",
      width: "50vmin",
    },
    fontWeight: "bold",
    fontSize: "150%",
    color: "#958F87",
  },
  dateRow: {
    [theme.breakpoints.down("sm")]: {
      width: "inherit",
    },
    [theme.breakpoints.up("md")]: {
      position: "absolute",
    },
    width: `${(10 / 12 / 7) * 100}%`,
  },
  day: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%",
      width: "50vmin",
    },
    fontSize: "110%",
    color: "#958F87",
    fontStyle: "italic",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    // position: "absolute",
    width: `100%`,
  },
  week: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "250%",
    },
    fontSize: "150%",
  },
  schedulesTableContainer: {
    // backgroundColor: "beige",
  },
});

const useStyles = makeStyles(styles);
