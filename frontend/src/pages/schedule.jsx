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
    textAlign: "center"
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
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <React.Fragment>
          <Grid container spacing={0} className={classes.container}>
            <Grid item xs={12}>
              <Typography className={classes.title}>TODAY'S GAMES</Typography>
            </Grid>
            <Grid item xs={12}>
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames="fade"
              >
                <div
                  style={{
                    height: "45vh",
                    backgroundImage: `url("https://images.wallpaperscraft.com/image/athlete_running_mountains_bw_117730_3840x2400.jpg")`,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "pink"
                  }}
                >
                  {schedules.length > 0 && <Slider schedules={schedules} />}
                </div>
              </CSSTransition>
            </Grid>
          </Grid>
          {/* Calendar */}
          <Grid
            container
            spacing={0}
            className={classes.container}
            style={{
              height: "100vh"
            }}
          >
            <Grid item xs={3} sm={3}>
              Blank
            </Grid>
            <Grid item xs={8} sm={8}>
              {schedules.length > 0 && <Calendar schedules={schedules} />}
            </Grid>
            <Grid item xs={1} sm={1}>
              Blank
            </Grid>
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Schedule);
