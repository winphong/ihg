import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import hallService from "../services/hallService";
import scheduleService from "../services/scheduleService";
import sportService from "../services/sportService";
import ResultsTable from "../components/resultsTable";
import SportsList from "../components/sportsList";
import ResultBar from "../components/resultBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Typography from "@material-ui/core/Typography";
import "../App.css";
import MediaQuery from "react-responsive";
import miscService from "../services/miscService";
import { Link } from "react-router-dom";

const styles = theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "350%",
      marginTop: "30%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "20%"
    },
    fontSize: "1000%",
    textAlign: "center",
    marginTop: "6%"
  },
  buttonColumn: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "18%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "10%"
    },
    marginTop: "6%"
  },
  currentDate: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "13 0%"
    },
    color: "#958F87",
    fontSize: "200%",
    textAlign: "center"
  },
  resultsTableSuperContainer: {
    [theme.breakpoints.only("xs")]: {
      height: "80vmax"
    },
    [theme.breakpoints.only("sm")]: {
      height: "90vmax"
    }
    // [theme.breakpoints.only("md")]: {
    //   height: "70vmax"
    // }
    // [theme.breakpoints.only("md")]: {
    //   height: "60vmax"
    // },
    // height: "45vmax"
    // backgroundColor: "pink"
  },
  resultsTableContainer: {
    position: "absolute",
    width: "58.33%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  barChartTitle: {
    fontSize: "300%",
    color: "#C8B06B",
    fontFamily: "TheNextFont",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: "200%"
    }
  },

  barChart: {
    textAlign: "center",
    display: "flex",
    alignItems: "baseline",
    marginBottom: "3vh"
    // backgroundColor: "grey"
  },
  subTitle: {
    [theme.breakpoints.only("md")]: {
      fontSize: "400%"
    },
    fontSize: "500%"
  },
  sortButton: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "1vmax",
      fontSize: "200%"
    },
    cursor: "pointer",
    fontSize: "100%"
    // lineHeight: "150%",
  },
  sports: {
    cursor: "pointer",
    // backgroundColor: "pink",
    fontSize: "120%",
    padding: "0 3%",
    flexShrink: 0
  },
  overall: {
    [theme.breakpoints.up("sm")]: {
      order: 2
    }
  },
  male: {
    [theme.breakpoints.up("sm")]: {
      order: 1
    }
  },
  female: {
    [theme.breakpoints.up("sm")]: {
      order: 3
    }
  },
  divider: {
    [theme.breakpoints.only("xs")]: {
      height: "17px"
    },
    [theme.breakpoints.only("sm")]: {
      height: "45px"
    },
    borderRight: "2px solid #C8B06B",
    width: "50%"
  },
  sportListContainer: {
    [theme.breakpoints.down("md")]: {
      height: "450px"
    },
    [theme.breakpoints.only("lg")]: {
      height: "35vmax"
    },
    height: "30vmax"
    //  backgroundColor: "yellow"
  }
});

let arr = []; // keep track of how many resultTable element in a page
let idx = 0; // index pointer for
const CustomButton = ({
  schedules,
  index,
  limit,
  handleBack,
  handleNext,
  stateLimit
}) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "left"
          }}
        >
          <IconButton disabled={index === 0} onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
        </div>
      </Grid>
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
              // byDate
              //   ? index >= schedules.length - stateLimit
              //   : index >= schedules.length - 5
              index >= schedules.length - stateLimit
            }
            onClick={() => {
              handleNext(limit);
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
};

class Results extends Component {
  state = {
    halls: [],
    schedules: [],
    originalSchedules: [],
    originalSchedulesBySport: [],
    index: 0,
    limit: 8,
    byDate: true,
    selectedSport: {},
    sports: [],
    isAdmin: false,
    redirect: false
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
    const { data: halls } = await hallService.getAllHalls();
    const { data: schedules } = await scheduleService.getAllSchedules();
    const { data: sports } = await sportService.getAllSports();
    const admin = miscService.getCurrentAdmin();
    const isAdmin = admin ? true : false;
    // const slider = document.querySelector(".slider");
    // const width = window.screen.width;
    // const padding = width * 0.03;
    // if (slider)
    //   slider.scroll({
    //     left: (((840 + padding) / (280 + padding)) * height) / 10
    //   });
    // if (slider)
    //   slider.scroll({
    //     // left: ((280 + padding) / (280 * 3 + 4 * padding)) * width
    //     left: 280 - padding
    //   });
    this.setState({
      halls,
      schedules,
      originalSchedules: [...schedules],
      sports,
      isAdmin
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
      if (
        schedule.sport ===
        (sport !== undefined ? sport.name : this.state.sports[0].name)
      ) {
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
      originalSchedulesBySport,
      byDate,
      sports,
      selectedSport,
      isAdmin,
      redirect
    } = this.state;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/admin/standing",
            state: { from: this.props.location }
          }}
        />
      );

    let limit = this.state.limit;

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <React.Fragment>
          {/* Standings */}
          <Grid container alignItems="center">
            <Grid item xs={2} md={1} />
            <Grid item xs={8} md={10}>
              <Typography variant="h1" className={classes.title}>
                RANKING
              </Typography>
              {/* <Typography className={classes.currentDate}>
                {dateformat(new Date(), "dd'th' mmm yyyy")}
              </Typography> */}
            </Grid>
            <Grid item xs={2} md={1} className={classes.buttonColumn}>
              {isAdmin && (
                <IconButton to={"/admin/standing"} component={Link}>
                  <EditRoundedIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Grid container xs={12}>
            {/* --------------------------------- */}
            <MediaQuery minWidth={960}>
              <Grid item container className={classes.barChart} md={12}>
                <Grid item sm={1} />
                <Grid item sm={2}>
                  <ResultBar halls={halls} dataKey={"malePoint"} barSize={6} />
                  <Typography className={classes.barChartTitle}>
                    MALE
                  </Typography>
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={4}>
                  <ResultBar
                    halls={halls}
                    dataKey={"totalPoint"}
                    barSize={10}
                  />
                  <Typography className={classes.barChartTitle}>
                    OVERALL
                  </Typography>
                </Grid>
                <Grid item sm={1} />
                <Grid item sm={2}>
                  <ResultBar
                    halls={halls}
                    dataKey={"femalePoint"}
                    barSize={6}
                  />
                  <Typography className={classes.barChartTitle}>
                    FEMALE
                  </Typography>
                </Grid>
                <Grid item sm={1} />
              </Grid>
            </MediaQuery>
            {/* --------------------------------- */}
            {/* ********************************* */}
            <MediaQuery maxWidth={959}>
              <Grid item xs={12}>
                <div
                  // className="slider"
                  style={{
                    display: "flex",
                    overflowX: "scroll",
                    padding: "5% 0"
                    // backgroundColor: "pink",
                  }}
                >
                  <div className={classes.overall} style={{ padding: "0 3%" }}>
                    <ResultBar
                      halls={halls}
                      dataKey={"totalPoint"}
                      barSize={7}
                    />
                    <Typography className={classes.barChartTitle}>
                      OVERALL
                    </Typography>
                  </div>
                  <div
                    className={classes.male}
                    style={{
                      padding: "0 3%"
                      // transform: "scale(0.8)",
                      // backgroundColor: "pink"
                      // order: -1
                    }}
                  >
                    <ResultBar
                      halls={halls}
                      dataKey={"malePoint"}
                      barSize={7}
                    />
                    <Typography className={classes.barChartTitle}>
                      MALE
                    </Typography>
                  </div>
                  <div
                    className={classes.female}
                    style={{
                      padding: "0 3%"
                      // transform: "scale(0.8)",
                      // backgroundColor: "pink",
                    }}
                  >
                    <ResultBar
                      halls={halls}
                      dataKey={"femalePoint"}
                      barSize={7}
                    />
                    <Typography className={classes.barChartTitle}>
                      FEMALE
                    </Typography>
                  </div>
                </div>
              </Grid>
            </MediaQuery>
            {/* ********************************* */}
          </Grid>

          <Grid container xs={12}>
            {/* Sort */}
            <Grid item md={1} />
            <Grid item container xs={12} md={3}>
              {/* -------------------------------- */}
              <MediaQuery minWidth={960}>
                <Grid item xs={12}>
                  <div className={classes.sportListContainer}>
                    {!byDate && sports && (
                      <CSSTransition
                        in={true}
                        appear={true}
                        timeout={200}
                        classNames="fast"
                      >
                        <SportsList
                          sports={sports}
                          selectedSport={selectedSport}
                          handleSortBySport={this.handleSortBySport}
                        />
                      </CSSTransition>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h1" className={classes.subTitle}>
                    RESULTS
                  </Typography>
                  <Typography
                    className={classes.sortButton}
                    variant="h1"
                    style={{
                      color: byDate ? "black" : "#D3DBD9"
                    }}
                    onClick={this.handleSortByDate}
                  >
                    BY DATE
                  </Typography>
                  <Typography
                    className={classes.sortButton}
                    variant="h1"
                    onClick={this.handleSortBySport}
                    style={{
                      color: !byDate ? "black" : "#D3DBD9"
                    }}
                  >
                    BY SPORTS
                  </Typography>
                </Grid>
              </MediaQuery>
              {/* -------------------------------- */}
              {/* ******************************** */}
              <MediaQuery maxWidth={959}>
                <Grid container item xs={12}>
                  <Grid item xs={5}>
                    <Typography
                      className={classes.sortButton}
                      variant="h1"
                      onClick={this.handleSortByDate}
                      style={{
                        color: byDate ? "black" : "#D3DBD9",
                        textAlign: "right"
                      }}
                    >
                      BY DATE
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classes.divider} />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography
                      className={classes.sortButton}
                      variant="h1"
                      style={{
                        color: !byDate ? "black" : "#D3DBD9"
                      }}
                      onClick={this.handleSortBySport}
                    >
                      BY SPORTS
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={{ height: "7vmax" }}>
                    <div
                      style={{
                        display: "flex",
                        overflowX: "scroll",
                        padding: "3% 0"
                      }}
                    >
                      {!byDate &&
                        sports.map(sport => {
                          return (
                            <Typography
                              className={classes.sports}
                              onClick={() => this.handleSortBySport(sport)}
                              variant="h1"
                              style={{
                                color:
                                  selectedSport.name === sport.name
                                    ? "#C8B06B"
                                    : "#D3DBD9"
                              }}
                            >
                              {sport.name}
                            </Typography>
                          );
                        })}
                    </div>
                  </Grid>
                </Grid>
              </MediaQuery>
              {/* ******************************** */}
            </Grid>
            {/* Result Table */}
            <Grid
              item
              container
              xs={12}
              md={7}
              className={classes.resultsTableSuperContainer}
            >
              {schedules && (
                <TransitionGroup>
                  <CSSTransition
                    key={`${index}${byDate}${selectedSport.name}`}
                    timeout={400}
                    classNames="fade"
                  >
                    <Grid
                      item
                      container
                      xs={12}
                      className={classes.resultsTableContainer}
                    >
                      {/* Button */}
                      <Grid xs={1} md={false} />
                      <Grid xs={10} md={12}>
                        <CustomButton
                          schedules={
                            byDate
                              ? originalSchedules
                              : originalSchedulesBySport
                          }
                          index={index}
                          limit={limit}
                          stateLimit={this.state.limit}
                          byDate={this.state.byDate}
                          handleBack={this.handleBack}
                          handleNext={this.handleNext}
                        />
                        <ResultsTable
                          schedules={schedules}
                          selectedSport={selectedSport}
                          byDate={byDate}
                          limit={limit}
                          isAdmin={isAdmin}
                        />
                      </Grid>
                      <Grid xs={1} md={false} />
                    </Grid>
                  </CSSTransition>
                </TransitionGroup>
              )}
            </Grid>
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Results);
