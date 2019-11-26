import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import Calendar from "./../components/calendar";
import scheduleService from "../services/scheduleService";
import { BarChart, ResponsiveContainer } from "recharts";
import { CSSTransition } from "react-transition-group";
import Slider from "../components/slider";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    },
    fontSize: "1000%",
    fontWeight: "900",
    color: "#C8B06B"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  container: {
    textAlign: "center",
    minHeight: "700px"
  },
  calendar: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "2%"
    },
    [theme.breakpoints.down("md")]: {
      margin: "0 1%"
    }
  },
  slider: {
    [theme.breakpoints.up("md")]: {
      marginBottom: "5%"
    },
    minHeight: "400px"
  }
});

class Schedule extends Component {
  state = {
    schedules: []
  };

  async componentDidMount() {
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({ schedules });
  }

  render() {
    const { classes } = this.props;
    const { schedules } = this.state;

    return (
      <Grid container className={classes.container}>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <React.Fragment>
            <Grid item container xs={12} className={classes.slider}>
              <Grid item xs={12}>
                <Typography className={classes.title}>TODAY'S GAMES</Typography>
              </Grid>
              <Grid item xs={12}>
                <CSSTransition
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames="slide"
                >
                  <div>
                    {schedules.length > 0 && <Slider schedules={schedules} />}
                  </div>
                </CSSTransition>
              </Grid>
            </Grid>
            {/* Calendar */}
            <Grid item container className={classes.container}>
              <Grid item md={3}>
                Schedules
              </Grid>
              <Grid item xs={12} md={9} className={classes.calendar}>
                {schedules.length > 0 && <Calendar schedules={schedules} />}
              </Grid>
            </Grid>
          </React.Fragment>
        </CSSTransition>
      </Grid>
    );
  }
}

export default withStyles(styles)(Schedule);
