import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import hallService from "../services/hallService";
import Container from "@material-ui/core/Container";
import scheduleService from "../services/scheduleService";
import sportService from "../services/sportService";
import ResultsTable from "../components/resultsTable";
import SportsList from "../components/sportsList";
import ResultBar from "../components/resultBar";
import { Divider, Button } from "@material-ui/core";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import dateformat from "dateformat";
import "../App.css";
import MediaQuery from "react-responsive";

const styles = theme => ({
  title: {
    fontSize: "50px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%",
    textAlign: "center"
  },
  caption: {
    fontSize: "25px",
    fontWeight: "900",
    color: "#C8B06B"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  barChart: {
    textAlign: "center",
    display: "flex",
    alignItems: "baseline",
    marginBottom: "3vh",
    backgroundColor: "grey"
    // backgroundImage: `url("https://images.wallpaperscraft.com/image/athlete_running_mountains_bw_117730_3840x2400.jpg")`
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
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({
      halls,
      schedules,
      originalSchedules: [...schedules]
    });
    // const { data: sports } = await sportService.getAllSports();
    // this.setState({
    //   sports
    // });
    // console.log(sports);
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
      if (schedule.sport === (sport ? sport.name : this.state.sports[0].name)) {
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

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <React.Fragment>
          {/* Standings */}
          <Typography className={classes.title}>RANKING</Typography>
          <Typography
            className={classes.title}
            style={{
              color: "black",
              fontSize: "100%",
              fontStyle: "italic",
              textAlign: "center"
            }}
          >
            {dateformat(new Date(), "dd'th' mmm yyyy")}
          </Typography>
          <Grid container className={classes.barChart}>
            <Grid item xs={0} sm={1} />
            <Grid item xs={12} sm={2}>
              <ResultBar halls={halls} dataKey={"malePoint"} barSize={6} />
              <Typography className={classes.caption}>MALE</Typography>
            </Grid>
            <Grid item xs={0} sm={1} />

            <Grid item xs={12} sm={4}>
              <ResultBar halls={halls} dataKey={"totalPoint"} barSize={10} />
              <Typography className={classes.caption}>OVERALL</Typography>
            </Grid>
            <Grid item xs={0} sm={1} />

            <Grid item xs={12} sm={2}>
              <ResultBar halls={halls} dataKey={"femalePoint"} barSize={6} />
              <Typography className={classes.caption}>FEMALE</Typography>
            </Grid>
            <Grid item xs={0} sm={1} />
          </Grid>
          {/* Calendar */}
          <Grid container xs={12}>
            <Grid item xs={12} md={4}>
              <Grid container>
                <div style={{ height: "50vh" }}>
                  {!byDate && sports && (
                    <SportsList
                      sports={sports}
                      selectedSport={selectedSport}
                      handleSortBySport={this.handleSortBySport}
                    />
                  )}
                </div>
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
            {/* Result Table */}
            <Grid item container xs={12} md={7} style={{ height: "900px" }}>
              {schedules && (
                <TransitionGroup>
                  <CSSTransition
                    key={`${index}${byDate}${selectedSport.name}`}
                    timeout={400}
                    classNames="fade"
                  >
                    <div>
                      <MediaQuery maxWidth={959}>
                        <div
                          style={{
                            position: "absolute",
                            width: "100%"
                          }}
                        >
                          <ResultsTable
                            schedules={schedules}
                            selectedSport={selectedSport}
                            byDate={byDate}
                            limit={limit}
                          />
                        </div>
                      </MediaQuery>
                      <MediaQuery minWidth={960}>
                        <div
                          style={{
                            position: "absolute",
                            width: "58.33%"
                          }}
                        >
                          <ResultsTable
                            schedules={schedules}
                            selectedSport={selectedSport}
                            byDate={byDate}
                            limit={limit}
                          />
                        </div>
                      </MediaQuery>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              )}
            </Grid>
            {/* Back button */}
            <Grid item xs={6}>
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
            {/* Next button */}
            <Grid item xs={6}>
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
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Results);
