import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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

const styles = theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "20%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "15%"
    },
    color: "#C8B06B",
    fontSize: "1000%",
    marginTop: "6%"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle"
  },
  container: {
    textAlign: "center",
    minHeight: "50vmax"
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
    [theme.breakpoints.only("xs")]: {
      height: "30vmax"
    },
    // [theme.breakpoints.only("sm")]: {
    //   height: "40vmax"
    // },
    // [theme.breakpoints.only("md")]: {
    //   height: "40vmax"
    // },
    [theme.breakpoints.only("md")]: {
      margin: "3% 0 5% 0"
    },
    [theme.breakpoints.up("lg")]: {
      height: "25vmax",
      margin: "5% 0 3% 0"
    },
    height: "40vmax"
    // [theme.breakpoints.up("sm")]: {
    //   margin: "5% 0",
    //   height: "20vmax"
    // },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-80%"
    }
  }
});

class Schedule extends Component {
  state = {
    schedules: [],
    isAdmin: false,
    redirect: false
  };

  async componentDidMount() {
    const { data: schedules } = await scheduleService.getAllSchedules();
    const admin = await miscService.getCurrentAdmin();
    const isAdmin = admin ? true : false;
    this.setState({ schedules, isAdmin });
  }

  df = time => {
    return dateformat(time, "dd mmm yyyy");
  };

  handleCreateSchedule = e => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    const { classes } = this.props;
    const { schedules, isAdmin, redirect } = this.state;

    if (redirect) return <Redirect to="/admin/schedule" />;

    return (
      <Grid container className={classes.container}>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <React.Fragment>
            <Grid container xs={12} alignItems="center">
              <Grid item xs={1} md={1} />
              <Grid item xs={10} md={10}>
                <Typography variant="h1" className={classes.title}>
                  THIS WEEK'S GAMES
                </Typography>
              </Grid>
              <Grid item xs={1} md={1}>
                {isAdmin && (
                  <IconButton
                    className={classes.icon}
                    onClick={this.handleCreateSchedule}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.slider}>
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames="fade"
              >
                <div>
                  {schedules.length > 0 && (
                    <Slider
                      // schedules={schedules.filter(e => {
                      //   return (
                      //     this.df(e.startTime) ===
                      //     this.df(new Date("6 Jan 2020"))
                      //     // this.df(new Date())
                      //   );
                      // })}
                      schedules={schedules}
                    />
                  )}
                </div>
              </CSSTransition>
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
                    <Calendar schedules={schedules} isAdmin={isAdmin} />
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
