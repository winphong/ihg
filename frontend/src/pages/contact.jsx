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
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({
      schedules,
      originalSchedules: [...schedules]
    });
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
          {/* Calendar */}
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Grid container spacing={0}>
                <div style={{ height: "50vh" }}>
                  {/* {!byDate && sports && (
                    <SportsList
                      sports={sports}
                      selectedSport={selectedSport}
                      handleSortBySport={this.handleSortBySport}
                    />
                  )} */}
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
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>

            <Grid item xs={7}>
              <Grid container style={{ height: "68vh" }}>
                <Grid item xs={12}>
                  {schedules && (
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
                          <ResultsTable
                            schedules={schedules}
                            selectedSport={selectedSport}
                            byDate={byDate}
                            limit={limit}
                          />
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
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
