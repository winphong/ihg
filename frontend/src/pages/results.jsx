import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import hallService from "../services/hallService";
import Container from "@material-ui/core/Container";
import scheduleService from "../services/scheduleService";
import sportService from "../services/sportService";
import ResultsTable from "../components/resultsTable";
import ResultsCarnival from "../components/resultsCarnival";
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
    marginBottom: "3vh",
    backgroundImage: `url("https://images.wallpaperscraft.com/image/athlete_running_mountains_bw_117730_3840x2400.jpg")`
  },
  headerRow: {
    textAlign: "left",
    margin: "1vh",
    height: "4vh",
    display: "flex",
    alignItems: "center"
  }
});

let arr = []; // keep track of how many resultTable element in a page
let idx = 0; // index pointer for arr

class Results extends Component {
  state = {
    halls: [],
    schedules: [],
    originalSchedules: [],
    originalSchedulesBySport: [],
    index: 0,
    limit: 11,
    byDate: true,
    selectedSport: {},
    sports: []
  };

  async componentDidMount() {
    const { data: halls } = await hallService.getAllHalls();
    this.setState({
      halls
    });
    console.log(halls);
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({
      schedules,
      originalSchedules: [...schedules]
    });
    console.log(schedules);
    const { data: sports } = await sportService.getAllSports();
    this.setState({
      sports
    });
    console.log(sports);
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

  handleSortBySport = sport => {
    arr = [];
    idx = 0;
    // const schedules = [...this.state.originalSchedules].sort((a, b) => {
    //   return a.sport >= b.sport ? 1 : -1;
    // });
    const schedules = [...this.state.originalSchedules].filter(schedule => {
      if (schedule.sport == (sport ? sport.name : this.state.sports[0].name)) {
        return schedule;
      }
    });

    this.setState({
      schedules,
      originalSchedulesBySport: [...schedules],
      byDate: false,
      index: 0,
      selectedSport: sport ? sport : this.state.sports[0]
    });
  };

  render() {
    const { classes } = this.props;
    const {
      halls,
      schedules,
      index,
      originalSchedules,
      byDate,
      sports,
      selectedSport
    } = this.state;

    let limit = this.state.limit;
    let currentDate = "";

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
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
          {/* Calendar */}
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Grid container spacing={0}>
                <Grid container spacing={0} style={{ height: "50vh" }}>
                  {!byDate && (
                    <React.Fragment>
                      <Grid item xs={6}>
                        {sports.length >= 1 &&
                          sports.slice(0, 9).map(sport => {
                            return (
                              <p
                                onClick={() => this.handleSortBySport(sport)}
                                style={{
                                  color:
                                    selectedSport.name == sport.name
                                      ? "black"
                                      : "grey",
                                  cursor: "pointer"
                                }}
                              >
                                {sport.name}
                              </p>
                            );
                          })}
                      </Grid>
                      <Grid item xs={6}>
                        {sports.length >= 1 &&
                          sports.slice(9).map(sport => {
                            return <p> {sport.name}</p>;
                          })}
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>

                <Grid item xs={12}>
                  RESULTS
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{
                      color: byDate ? "black" : "grey"
                    }}
                    onClick={this.handleSortByDate}
                  >
                    Sort by date
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{
                      color: !byDate ? "black" : "grey"
                    }}
                    onClick={() => this.handleSortBySport()}
                  >
                    Sort by sports
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={7}>
              <Grid container style={{ height: "68vh" }}>
                <Grid item xs={12}>
                  <TransitionGroup>
                    <CSSTransition
                      key={`${index}${byDate}${selectedSport.name}`}
                      timeout={400}
                      classNames="fade"
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "58.33%"
                        }}
                      >
                        {!byDate && (
                          <p className={classes.headerRow}>
                            {selectedSport.name}
                          </p>
                        )}
                        {schedules.map((schedule, index) => {
                          if (index < limit) {
                            if (
                              byDate &&
                              schedule.startTime.substring(8, 10) != currentDate
                            ) {
                              limit = limit - 1;
                              if (limit <= this.state.limit / 2) {
                                return;
                              }
                              currentDate = schedule.startTime.substring(8, 10);
                              return (
                                <div>
                                  <p className={classes.headerRow}>
                                    {dateformat(
                                      new Date(
                                        schedule.startTime
                                      ).toLocaleString("default", {
                                        timeZone: "Asia/Singapore"
                                      }),
                                      "dd'th' mmm"
                                    )}
                                  </p>
                                  {schedule.stage == "Carnival" ? (
                                    <ResultsCarnival schedule={schedule} />
                                  ) : (
                                    <ResultsTable schedule={schedule} />
                                  )}
                                  <Divider />
                                </div>
                              );
                            }
                            return (
                              <div>
                                {schedule.stage == "Carnival" ? (
                                  <ResultsCarnival schedule={schedule} />
                                ) : (
                                  <ResultsTable schedule={schedule} />
                                )}
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
                    <IconButton
                      disabled={index === 0}
                      onClick={this.handleBack}
                    >
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
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Results);
