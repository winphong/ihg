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

export default function Calendar({ schedules }) {
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

  const date = new Date(startDate);

  function handleBack(e) {
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
    setWeekNum(weekNum - 1);
  }

  function handleNext(e) {
    setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
    setWeekNum(weekNum + 1);
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container>
        <Grid item xs={true} sm={1}>
          <IconButton
            disabled={date <= new Date("5 Jan 2020")}
            onClick={handleBack}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Grid>

        <Grid item xs={true} sm={10}>
          Week {weekNum}
        </Grid>
        <Grid item xs={true} sm={1}>
          <IconButton
            disabled={date >= new Date("16 Feb 2020")}
            onClick={handleNext}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ height: "100vh", border: "1px solid black" }}
        >
          {/* <TransitionGroup>
            <CSSTransition key={weekNum} timeout={400} classNames="fade"> */}
          {/* Days row */}
          <Grid
            container
            style={{
              width: "57.7vw",
              position: "absolute"
            }}
          >
            {days.map((day, index) => {
              if (index != 0) date.setDate(date.getDate() + 1);
              return (
                <Grid key={day.num} item xs={true} sm={true}>
                  <div style={{ height: "5vh" }}>
                    <TransitionGroup>
                      <CSSTransition
                        key={weekNum}
                        timeout={400}
                        classNames="fade"
                      >
                        <div
                          style={{
                            width: `${100 / 7}%`,
                            position: "absolute"
                          }}
                        >
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
                      <span>{day.name}</span>
                    </div>
                  </div>
                  <TransitionGroup>
                    <CSSTransition
                      key={weekNum}
                      timeout={400}
                      classNames="fade"
                    >
                      <table style={{ width: "100%" }}>
                        <tbody>
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
                                      <ScheduleBox schedule={schedule} />
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                        </tbody>
                      </table>
                    </CSSTransition>
                  </TransitionGroup>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    // border: "inset beige",
    // backgroundColor: "grey",
    padding: 0
  },
  table: {
    border: "1px solid ivory",
    margin: -2,
    width: "100%"
  }
});
