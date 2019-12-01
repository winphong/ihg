import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ScheduleBox from "./scheduleBox";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import dateformat from "dateformat";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { useMediaQuery } from "react-responsive";

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

  const date = new Date(startDate);
  var current = currentDay;

  function handleBack(isMobile) {
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
  }

  function handleNext(isMobile) {
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
  }

  const notMobile = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container direction="row" justify="center" justifyContent="center">
      <Grid item xs={2}>
        <IconButton
          disabled={date <= new Date("5 Jan 2020")}
          onClick={notMobile ? () => handleBack(false) : () => handleBack(true)}
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        Week {weekNum}
      </Grid>
      <Grid item xs={2}>
        <IconButton
          disabled={date >= new Date("16 Feb 2020")}
          onClick={notMobile ? () => handleNext(false) : () => handleNext(true)}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "1000px",
          border: "1px solid black",
          backgroundColor: "beige"
        }}
      >
        <Grid container>
          {(notMobile ? days : mobileDays).map((day, index) => {
            if (index != 0) date.setDate(date.getDate() + 1);
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
                        <span>{dateformat(date, "dd/mm")}</span>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <br />
                  <div
                    style={{
                      borderBottom: "1px solid black"
                    }}
                  />
                  <div
                    style={{
                      borderBottom: "1px solid black"
                    }}
                  >
                    {notMobile && <span>{day.name}</span>}
                    {!notMobile && (
                      <span>{days[day < 0 ? 7 + day : day].name}</span>
                    )}
                  </div>
                </div>
                <table style={{ textAlign: "center", marginRight: "-100px" }}>
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
                </table>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
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
  table: {
    // width: "100%"
  },
  dateRow: {
    [theme.breakpoints.down("sm")]: {
      width: "32%"
    },
    position: "absolute",
    width: "10.2%"
  },
  column: {
    [theme.breakpoints.down("sm")]: {
      width: "32%"
    },
    position: "absolute",
    width: "13.5%"
  }
});

const useStyles = makeStyles(styles);
