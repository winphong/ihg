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

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    },
    color: "#C8B06B",
    fontSize: "1000%"
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
      margin: "5% 0"
    }
  }
});

class Schedule extends Component {
  state = {
    schedules: [],
    isAdmin: false
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

  render() {
    const { classes } = this.props;
    const { schedules, isAdmin } = this.state;

    return (
      <Grid container className={classes.container}>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.title}>
                TODAY'S GAMES
              </Typography>
            </Grid>
            <Grid item container xs={12} className={classes.slider}>
              <Grid item xs={12}>
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames="slide"
                >
                  <div>
                    {schedules.length > 0 && (
                      <Slider
                        schedules={schedules.filter(e => {
                          return (
                            this.df(e.startTime) ===
                            this.df(new Date("6 Jan 2020"))
                            // this.df(new Date())
                          );
                        })}
                      />
                    )}
                  </div>
                </CSSTransition>
              </Grid>
            </Grid>
            {/* Calendar */}
            <Grid item container className={classes.container}>
              <Grid item xs={1} />
              <Grid item xs={10} className={classes.calendar}>
                {schedules.length > 0 && (
                  <Calendar schedules={schedules} isAdmin={isAdmin} />
                )}
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </React.Fragment>
        </CSSTransition>
      </Grid>
    );
  }
}

export default withStyles(styles)(Schedule);
