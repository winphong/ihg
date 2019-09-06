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

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(3),
    textAlign: "center",
    margin: 5
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
    console.log("clicked");
  }

  render() {
    const { classes } = this.props;
    const { schedules } = this.state;

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <React.Fragment>
          <Grid container spacing={0} className={classes.container}>
            <Grid item xs={12}>
              <p className={classes.paper}>Today's games</p>
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
            <Grid item xs={true} sm={3}>
              Blank
            </Grid>
            <Grid item xs={true} sm={8}>
              {schedules.length > 0 && <Calendar schedules={schedules} />}
            </Grid>
            <Grid item xs={true} sm={1}>
              Blank
            </Grid>
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Schedule);
