import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import Button from "@material-ui/core/Button";
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
  }
});

class Home extends Component {
  state = {
    schedules: [],
    schedulesToDisplay: [],
    index: 0
  };

  async componentDidMount() {
    const { data: schedules } = await scheduleService.getSchedule();
    // const index = this.state.index;
    // const schedulesToDisplay = await this.state.schedules.splice(
    //   index,
    //   index + 4
    // );
    this.setState({ schedules, schedulesToDisplay: schedules });
  }

  handleNext = () => {
    const index = this.state.index + 4;
    if (index >= this.state.schedules.length) return;

    const arr = [...this.state.schedules];
    const schedulesToDisplay = arr.splice(index, index + 4);

    this.setState({ schedulesToDisplay, index });
  };

  handleBack = () => {
    const index = this.state.index - 4;
    if (index < 0) return console.log("At the frontend");

    const arr = [...this.state.schedules];
    const schedulesToDisplay = arr.splice(index, index + 4);

    this.setState({ schedulesToDisplay, index });
  };

  render() {
    const { classes } = this.props;
    const { schedules, schedulesToDisplay, index } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img src="https://www.canva.com/learn/wp-content/uploads/2018/11/best-free-stock-photos-tb-1320x743.jpg" />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            UPCOMING GAMES
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <Button
              onClick={this.handleBack}
              disabled={index === 0}
              className={classes.buttonColumn}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grid container spacing={2}>
              {schedulesToDisplay.map((e, index) => {
                if (index < 4) {
                  return (
                    <Grid item xs={12} sm={6}>
                      <div className={classes.paper}>
                        <Card sport={e} />
                      </div>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <Button
              onClick={this.handleNext}
              disabled={index >= schedules.length - 4}
              className={classes.buttonColumn}
            >
              Forward
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
