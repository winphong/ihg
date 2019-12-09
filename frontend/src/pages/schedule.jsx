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
    [theme.breakpoints.down("sm")]: {
      fontSize: "300%"
    },
    color: "#C8B06B",
    fontSize: "1000%",
    marginTop: "1%"
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
    [theme.breakpoints.up("md")]: {
      // padding: "0% 2%"
    },
    [theme.breakpoints.down("md")]: {
      margin: "0 1%"
    }
  },
  slider: {
    [theme.breakpoints.up("md")]: {
      margin: "5% 0",
      height: "20vmax"
    },
    [theme.breakpoints.down("md")]: {
      margin: "5% 0",
      height: "40vmax"
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
              <Grid item md={1} />
              <Grid item xs={12} md={10}>
                <Typography variant="h1" className={classes.title}>
                  TODAY'S GAMES
                </Typography>
              </Grid>
              <Grid item md={1}>
                {isAdmin && (
                  <IconButton onClick={this.handleCreateSchedule}>
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
