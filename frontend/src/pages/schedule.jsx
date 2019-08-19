import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import Calendar from "./../components/calendar";
import scheduleService from "../services/scheduleService";
import { BarChart, ResponsiveContainer } from "recharts";
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
    // borderStyle: "solid",
  },
  bopes: {
    textAlign: "center",
    marginBottom: 30
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
    const { schedules, margin, previous, current, next } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12}>
            <p className={classes.paper}>Today's games</p>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.bopes} style={{ height: "40vh" }}>
              {/* {schedules.map((e, index) => {
                  if (index < 3) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={12 / margin}
                        className={classes.container}
                      >
                        <Card sport={e} />
                      </Grid>
                    );
                  }
                })} */}
              {schedules.length > 0 && <Slider schedules={schedules} />}
            </Paper>
          </Grid>
        </Grid>
        {/* Calendar */}
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} sm={4}>
            Blank
          </Grid>
          <Grid item xs={12} sm={7}>
            {schedules.length > 0 && <Calendar schedules={schedules} />}
          </Grid>
          <Grid item xs={12} sm={1}>
            Blank
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Schedule);
