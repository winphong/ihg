import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Calendar from "./../components/calendar";
import scheduleService from "../services/scheduleService";
import { CSSTransition } from "react-transition-group";
import { Typography } from "@material-ui/core";
import Slider from "../components/slider";
import miscService from "../services/miscService";
import dateformat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { Link } from "react-router-dom";

const styles = theme => ({
  banner: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "15%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "8%"
    },
    // mate 10 landscape
    ["@media(min-width: 565px) and (max-width: 570px)"]: {
      marginTop: "10%"
    },
    height: "45vmax",
    marginTop: "4%",
    backgroundImage: "url('./headers/schedule.jpg')",
    backgroundSize: "cover",
    marginBottom: "2%"
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "280%",
      marginTop: "6%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "420%",
      marginTop: "4%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "600%"
    },
    ["@media(min-width: 315px) and (max-width: 325px)"]: {
      fontSize: "245%"
    },
    color: "#C8B06B",
    fontSize: "700%",
    marginTop: "4%"
  },
  buttonColumn: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "15%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "10%"
    },
    marginTop: "6%"
  },
  container: {
    textAlign: "center"
  },
  calendar: {
    [theme.breakpoints.up("sm")]: {
      // padding: "0% 2%"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 1%"
    }
  },
  slider: {
    [theme.breakpoints.only("xs")]: {},
    // [theme.breakpoints.only("sm")]: {
    //   height: "40vmax"
    // },
    // [theme.breakpoints.only("md")]: {
    //   height: "40vmax"
    // },
    [theme.breakpoints.only("md")]: {
      // margin: "3% 0 5% 0"
    },
    [theme.breakpoints.up("lg")]: {
      margin: "5% 0 3% 0",
      height: "40vmax"
    }
    // [theme.breakpoints.up("sm")]: {
    //   margin: "5% 0",
    //   height: "20vmax"
    // },
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    color: "white",
    transform: "scale(1.5)"
  }
});

class Schedule extends Component {
  state = {
    schedules: [],
    isAdmin: false,
    redirect: false,
    globalEndDate: "",
    weekNum: 0,
    upcomingSchedules: []
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
    this.props.handleTabChange(this.props.location.pathname);
    const { data: schedules } = await scheduleService.getAscendingSchedules();
    const {
      data: upcomingSchedules
    } = await scheduleService.getUpcomingSchedules(new Date());
    const admin = await miscService.getCurrentAdmin();
    const isAdmin = admin ? true : false;
    this.setState({ schedules, isAdmin, upcomingSchedules });
  }

  handleUpdateGlobalEndDate = globalEndDate => {
    this.setState({ globalEndDate });
  };

  handleUpdateWeeknum = weekNum => {
    this.setState({ weekNum: weekNum });
  };

  df = time => {
    return dateformat(time, "dd mmm yyyy");
  };

  render() {
    const { classes } = this.props;
    const {
      schedules,
      isAdmin,
      globalEndDate,
      weekNum,
      upcomingSchedules
    } = this.state;

    return (
      <Grid container className={classes.container}>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <React.Fragment>
            <Grid container xs={12} className={classes.banner}>
              <Grid item container xs={12} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h1" className={classes.title}>
                    {isAdmin && (
                      <IconButton
                        className={classes.icon}
                        style={{ visibility: "hidden" }}
                      >
                        <AddCircleRoundedIcon />
                      </IconButton>
                    )}
                    UPCOMING GAMES
                    {isAdmin && (
                      <IconButton
                        className={classes.icon}
                        to={"/admin/schedule"}
                        component={Link}
                      >
                        <AddCircleRoundedIcon />
                      </IconButton>
                    )}
                  </Typography>
                </Grid>
                {/* <Grid item xs={1} md={1} className={classes.buttonColumn}>
                  
                </Grid> */}
              </Grid>
              <Grid item xs={12} className={classes.slider}>
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames="fade"
                >
                  <div>
                    {upcomingSchedules.length > 0 && (
                      <Slider
                        // schedules={schedules.filter(e => {
                        //   return (
                        //     this.df(e.startTime) ===
                        //     this.df(new Date("6 Jan 2020"))
                        //     // this.df(new Date())
                        //   );
                        // })}
                        upcomingSchedules={upcomingSchedules}
                      />
                    )}
                  </div>
                </CSSTransition>
              </Grid>
            </Grid>
            {/* Calendar */}
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
            >
              <Grid item container className={classes.container}>
                <Grid item xs={1} />
                <Grid item xs={10} className={classes.calendar}>
                  {schedules.length > 0 && (
                    <Calendar
                      schedules={schedules}
                      isAdmin={isAdmin}
                      globalEndDate={globalEndDate}
                      handleUpdateGlobalEndDate={this.handleUpdateGlobalEndDate}
                      weekNum={weekNum}
                      handleUpdateWeeknum={this.handleUpdateWeeknum}
                    />
                  )}
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </CSSTransition>
          </React.Fragment>
        </CSSTransition>
      </Grid>
    );
  }
}

export default withStyles(styles)(Schedule);
