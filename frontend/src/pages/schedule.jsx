import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import Button from "@material-ui/core/Button";
import Calendar from "./../components/calendar";
import { Divider } from "@material-ui/core";

import scheduleService from "../services/scheduleService";

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
  state = {};

  async componentDidMount() {
    const schedules = await scheduleService.getSchedule();
    console.log(schedules);
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12}>
            <p className={classes.paper}>Today's games</p>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            // style={{
            //   borderStyle: "solid"
            // }}
          >
            <p>Back</p>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Paper className={classes.bopes}>
              <Grid container spacing={1} className={classes.container}>
                <Grid item xs={12} sm={4} className={classes.container}>
                  <Card />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.container}>
                  <Card />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.container}>
                  <Card />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            // style={{
            //   borderStyle: "solid"
            // }}
          >
            <p>Back</p>
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} sm={4}>
            Blank
          </Grid>
          <Grid item xs={12} sm={7}>
            <Calendar />
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
