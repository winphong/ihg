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
  banner: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "15%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "8%"
      // height: "45vmax"
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: "3%"
    },
    // mate 10 landscape
    ["@media(min-width: 565px) and (max-width: 570px)"]: {
      marginTop: "10%"
    },
    height: "45vmax",
    marginTop: "4%",
    backgroundImage: "url('./headers/results.jpg')",
    backgroundSize: "cover"
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "3%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "420%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "600%"
    },
    // mate 10 portrait
    ["@media(min-width: 315px) and (max-width: 325px)"]: {
      marginTop: "10%"
    },
    fontSize: "700%",
    textAlign: "center",
    marginTop: "3%"
  },
  buttonColumn: {
    marginTop: "3%"
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
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
      fontSize: "150%"
    },
    [theme.breakpoints.only("sm")]: {
      textAlign: "center",
      fontSize: "160%"
    },
    fontSize: "300%",
    color: "#C8B06B",
    fontFamily: "TheNextFont",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px"
  },
  barChart: {
    textAlign: "center",
    display: "flex",
    alignItems: "baseline",
    marginBottom: "3vh"
    // backgroundColor: "grey"
  },
  subTitle: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "200%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "300%"
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      margin: "5% 0"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "380%"
    },
    fontSize: "450%"
  },
  sortButton: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "1vmax",
      fontSize: "150%"
    },
    cursor: "pointer",
    fontSize: "100%"
    // lineHeight: "150%",
  },
  sports: {
    flexShrink: 0,
    fontSize: "120%",
    cursor: "pointer",
    fontFamily: "TheNextFont",
    margin: "0 3%"
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
  },
  week: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "160%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "210%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "250%"
    },
    fontSize: "300%",
    textAlign: "center"
  }
});

let arr = []; // keep track of how many resultTable element in a page
let idx = 0; // index pointer for
const CustomButton = ({
  schedules,
  stateLimit,
  index,
  limit,
  handleBack,
  handleNext,
  weekNum,
  classes
}) => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Grid item xs={4}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end"
          }}
        >
          <IconButton disabled={weekNum === -1} onClick={handleBack}>
            <KeyboardArrowLeft />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h1" className={classes.week}>
          Week {weekNum}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "left"
          }}
        >
          <IconButton
            disabled={
              // byDate
              //   ? index >= schedules.length - stateLimit
              //   : index >= schedules.length - 5
              // index >= schedules.length - stateLimit
              weekNum === 4
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

let startDate;

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
    redirect: false,
    startDate: new Date("5 Jan 2020"),
    weekNum: -1
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
    this.props.handleTabChange(this.props.location.pathname);
    const admin = miscService.getCurrentAdmin();
    const isAdmin = admin ? true : false;
    const { data: halls } = await hallService.getAllHalls();
    const { data: schedules } = isAdmin
      ? await scheduleService.getDescendingSchedulesForAdmin()
      : await scheduleService.getDescendingSchedules();
    const { data: sports } = await sportService.getAllSports();

    const firstDayOfWeek = new Date("5 Jan 2020");
    const lastDay = new Date(firstDayOfWeek);
    lastDay.setDate(lastDay.getDate() + 7);

    const schedulesByWeek = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate >= firstDayOfWeek && scheduleDate < lastDay;
    });
    this.setState({
      halls,
      schedules: schedulesByWeek,
      originalSchedules: [...schedules],
      sports,
      isAdmin
    });

    // const firstDayOfWeek = new Date(startDate);
    // firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
    // const lastDay = new Date(firstDayOfWeek);
    // lastDay.setDate(lastDay.getDate() + 7);
    // const schedulesByWeek = originalSchedules.filter(schedule => {
    //   const scheduleDate = new Date(schedule.startTime);
    //   return scheduleDate >= firstDayOfWeek && scheduleDate < lastDay;
    // });

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
  }

  // handleNext = limit => {
  //   const index = this.state.index + limit;
  //   if (index >= this.state.originalSchedules.length) return;

  //   const schedules = (this.state.byDate
  //     ? [...this.state.originalSchedules]
  //     : [...this.state.originalSchedulesBySport]
  //   ).splice(index, index + this.state.limit);

  //   if (arr[idx] === undefined) {
  //     arr.push(this.state.limit - limit);
  //   }
  //   idx++;

  //   this.setState({ schedules, index });
  // };

  // handleBack = () => {
  //   idx--;
  //   const index = this.state.index - this.state.limit + arr[idx];
  //   if (index < 0) return;

  //   const schedules = (this.state.byDate
  //     ? [...this.state.originalSchedules]
  //     : [...this.state.originalSchedulesBySport]
  //   ).splice(index, index + this.state.limit);

  //   this.setState({ schedules, index });
  // };

  handleNext = () => {
    const { startDate, weekNum, originalSchedules } = this.state;
    const firstDayOfWeek = new Date(startDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
    const lastDay = new Date(firstDayOfWeek);
    lastDay.setDate(lastDay.getDate() + 7);

    const schedulesByWeek = originalSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate >= firstDayOfWeek && scheduleDate < lastDay;
    });

    this.setState({
      startDate: firstDayOfWeek,
      weekNum: weekNum + 1,
      schedules: schedulesByWeek
    });
  };

  handleBack = () => {
    const { startDate, weekNum, originalSchedules } = this.state;
    const firstDayOfWeek = new Date(startDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 7);

    const schedulesByWeek = originalSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate >= firstDayOfWeek && scheduleDate < startDate;
    });

    this.setState({
      startDate: firstDayOfWeek,
      weekNum: weekNum - 1,
      schedules: schedulesByWeek
    });
  };

  handleSortByDate = () => {
    arr = [];
    idx = 0;
    // const schedules = [...this.state.originalSchedules];

    const firstDayOfWeek = new Date("5 Jan 2020");
    const lastDay = new Date(firstDayOfWeek);
    lastDay.setDate(lastDay.getDate() + 7);

    const schedulesByWeek = this.state.originalSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startTime);
      return scheduleDate >= firstDayOfWeek && scheduleDate < lastDay;
    });

    this.setState({
      schedules: schedulesByWeek,
      byDate: true,
      index: 0,
      startDate: firstDayOfWeek,
      weekNum: -1
    });
  };

  handleSortBySport = sport => {
    arr = [];
    idx = 0;
    // const schedules = [...this.state.originalSchedules].sort((a, b) => {
    //   return a.sport >= b.sport ? 1 : -1;
    // });
    const schedules = [...this.state.originalSchedules].filter(schedule => {
      if (schedule.sport === sport.name) {
        return schedule;
      }
    });

    this.setState({
      schedules,
      originalSchedulesBySport: [...schedules],
      byDate: false,
      index: 0,
      selectedSport: sport
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
      redirect,
      weekNum
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
          <Grid container alignItems="center" className={classes.banner}>
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
                <IconButton
                  to={"/admin/standing"}
                  component={Link}
                  style={{ backgroundColor: "#D3DBD9" }}
                >
                  <EditRoundedIcon />
                </IconButton>
              )}
            </Grid>
            <Grid container xs={12}>
              {/* --------------------------------- */}
              <MediaQuery minWidth={960}>
                <Grid item container className={classes.barChart} md={12}>
                  <Grid item sm={1} />
                  <Grid item sm={2}>
                    <ResultBar
                      halls={halls}
                      dataKey={"malePoint"}
                      barSize={6}
                    />
                    <Typography
                      className={classes.barChartTitle}
                      style={{ fontSize: "200%" }}
                    >
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
                    <Typography
                      className={classes.barChartTitle}
                      style={{ fontSize: "200%" }}
                    >
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
                      overflowX: "scroll"
                      // padding: "5% 0"
                      // backgroundColor: "pink",
                    }}
                  >
                    <div
                      className={classes.overall}
                      style={{ padding: "0 3%" }}
                    >
                      <ResultBar
                        halls={halls}
                        dataKey={"totalPoint"}
                        barSize={7}
                      />
                      <Typography className={classes.barChartTitle}>
                        OVERALL
                      </Typography>
                    </div>
                    <div className={classes.male} style={{ padding: "0 3%" }}>
                      <ResultBar
                        halls={halls}
                        dataKey={"malePoint"}
                        barSize={7}
                      />
                      <Typography className={classes.barChartTitle}>
                        MALE
                      </Typography>
                    </div>
                    <div className={classes.female} style={{ padding: "0 3%" }}>
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
                    BY WEEK
                  </Typography>
                  <Typography
                    className={classes.sortButton}
                    variant="h1"
                    onClick={() => this.handleSortBySport(this.state.sports[0])}
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
                <React.Fragment>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography variant="h1" className={classes.subTitle}>
                      RESULTS
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />

                  <Grid
                    container
                    item
                    xs={12}
                    style={{
                      visibility: sports.length === 0 ? "hidden" : ""
                    }}
                  >
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                      <Typography
                        className={classes.sortButton}
                        variant="h1"
                        onClick={this.handleSortByDate}
                        style={{
                          color: byDate ? "black" : "#D3DBD9",
                          textAlign: "right",
                          paddingRight: "10%",
                          borderRight: "2px solid #C8B06B"
                        }}
                      >
                        BY WEEK
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        className={classes.sortButton}
                        variant="h1"
                        style={{
                          color: !byDate ? "black" : "#D3DBD9",
                          paddingLeft: "10%"
                        }}
                        onClick={() =>
                          this.handleSortBySport(this.state.sports[0])
                        }
                      >
                        BY SPORTS
                      </Typography>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          overflowX: "scroll",
                          padding: "2% 0",
                          margin: "1% 0",
                          visibility: byDate ? "hidden" : ""
                        }}
                      >
                        {sports.map(sport => {
                          return (
                            <Typography
                              className={classes.sports}
                              onClick={() => this.handleSortBySport(sport)}
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
                </React.Fragment>
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
                    key={`${weekNum}${byDate}${selectedSport.name}`}
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
                        <div style={{ display: byDate ? "" : "none" }}>
                          <CustomButton
                            schedules={
                              byDate
                                ? originalSchedules
                                : originalSchedulesBySport
                            }
                            index={index}
                            limit={limit}
                            stateLimit={limit}
                            byDate={byDate}
                            handleBack={this.handleBack}
                            handleNext={this.handleNext}
                            weekNum={weekNum}
                            classes={classes}
                          />
                        </div>
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
