import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import hallService from "../services/hallService";
import Container from "@material-ui/core/Container";
import scheduleService from "../services/scheduleService";
import ResultsTable from "../components/resultsTable";
import ResultBar from "../components/resultBar";
import { Divider, Button } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import dateformat from "dateformat";
import "../App.css";

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    margin: 5
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%",
    backgroundColor: "pink"
  },
  barChart: {
    textAlign: "center",
    display: "flex",
    alignItems: "baseline",
    marginBottom: "3vh"
  }
});

let arr = [];
let idx = 0;

class Results extends Component {
  state = {
    halls: [],
    schedules: [],
    originalSchedules: [],
    originalSchedulesBySport: [],
    index: 0,
    limit: 11,
    byDate: true
  };

  async componentDidMount() {
    const { data: halls } = await hallService.getAllHalls();
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({ halls, schedules, originalSchedules: [...schedules] });
  }

  handleNext = limit => {
    const index = this.state.index + limit;
    if (index >= this.state.originalSchedules.length) return;

    const schedules = (this.state.byDate
      ? [...this.state.originalSchedules]
      : [...this.state.originalSchedulesBySport]
    ).splice(index, index + this.state.limit);

    if (arr[idx] === undefined) {
      arr.push(this.state.limit - limit);
    }
    idx++;

    this.setState({ schedules, index });
  };

  handleBack = () => {
    idx--;
    const index = this.state.index - this.state.limit + arr[idx];
    if (index < 0) return;

    const schedules = (this.state.byDate
      ? [...this.state.originalSchedules]
      : [...this.state.originalSchedulesBySport]
    ).splice(index, index + this.state.limit);

    this.setState({ schedules, index });
  };

  handleSortByDate = () => {
    arr = [];
    idx = 0;
    const schedules = [...this.state.originalSchedules];
    this.setState({ schedules, byDate: true, index: 0 });
  };

  handleSortBySport = () => {
    arr = [];
    idx = 0;
    const schedules = [...this.state.originalSchedules].sort((a, b) => {
      return a.sport >= b.sport ? 1 : -1;
    });

    this.setState({
      schedules,
      originalSchedulesBySport: [...schedules],
      byDate: false,
      index: 0
    });
  };

  render() {
    const { classes } = this.props;
    const { halls, schedules, index, originalSchedules, byDate } = this.state;

    let limit = this.state.limit;
    let currentDate = "";

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.barChart}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <p> Ranking as of {new Date().toLocaleDateString()}</p>
            </Paper>
          </Grid>
          <Grid item xs={true} sm={1} />
          <Grid item xs={true} sm={2}>
            <ResultBar halls={halls} dataKey={"malePoint"} barSize={6} />
            MALE
          </Grid>
          <Grid item xs={true} sm={1} />

          <Grid item xs={true} sm={4}>
            <ResultBar halls={halls} dataKey={"totalPoint"} barSize={10} />
            OVERALL
          </Grid>
          <Grid item xs={true} sm={1} />

          <Grid item xs={true} sm={2}>
            <ResultBar halls={halls} dataKey={"femalePoint"} barSize={6} />
            FEMALE
          </Grid>
          <Grid item xs={true} sm={1} />
        </Grid>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={3}>
            {/* About IHG */}
            <Button onClick={this.handleSortByDate}>Sort by date</Button>
          </Grid>
          <Grid item xs={1}>
            {/* About IHG */}
            <Button onClick={this.handleSortBySport}>Sort by sports</Button>
          </Grid>
          <Grid item xs={7}>
            <Grid container style={{ height: "68vh" }}>
              <Grid item xs={12}>
                <TransitionGroup>
                  <CSSTransition
                    key={`${index}${byDate}`}
                    timeout={400}
                    classNames="fade"
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "58.33%"
                      }}
                    >
                      {schedules.map((schedule, index) => {
                        if (index < limit) {
                          if (
                            schedule.startTime.substring(8, 10) != currentDate
                          ) {
                            limit = limit - 1;
                            if (limit <= this.state.limit / 2) {
                              return;
                            }
                            currentDate = schedule.startTime.substring(8, 10);
                            return (
                              <div>
                                <p
                                  style={{
                                    textAlign: "left",
                                    margin: "1vh",
                                    height: "5.1vh",
                                    // backgroundColor: "pink",
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  {dateformat(
                                    new Date(schedule.startTime).toLocaleString(
                                      "default",
                                      {
                                        timeZone: "Asia/Singapore"
                                      }
                                    ),
                                    "dd mmm"
                                  )}
                                </p>
                                <ResultsTable schedule={schedule} />
                                <Divider />
                              </div>
                            );
                          }
                          return (
                            <div>
                              <ResultsTable schedule={schedule} />
                              <Divider />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={true} sm={6}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "left"
                  }}
                >
                  <IconButton disabled={index === 0} onClick={this.handleBack}>
                    <KeyboardArrowLeft />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={true} sm={6}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end"
                  }}
                >
                  <IconButton
                    disabled={
                      this.state.byDate
                        ? index >= originalSchedules.length - this.state.limit
                        : index >= originalSchedules.length - 5
                    }
                    onClick={() => {
                      this.handleNext(limit);
                    }}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Results);
