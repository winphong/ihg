import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import Button from "@material-ui/core/Button";
import scheduleService from "../services/scheduleService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  paper: {
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    textAlign: "center"
    // margin: "0.5vh"
  },
  buttonColumn: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "pink",
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
    const { data: schedules } = await scheduleService.getAllSchedules();
    this.setState({ schedules, schedulesToDisplay: schedules });
  }

  handleNext = () => {
    const index = this.state.index + 4;
    if (index >= this.state.schedules.length) return;

    const schedules = [...this.state.schedules];
    const schedulesToDisplay = schedules.splice(index, index + 4);

    this.setState({ schedulesToDisplay, index });
  };

  handleBack = () => {
    const index = this.state.index - 4;
    if (index < 0) return;

    const schedules = [...this.state.schedules];
    const schedulesToDisplay = schedules.splice(index, index + 4);

    this.setState({ schedulesToDisplay, index });
  };

  render() {
    const { classes } = this.props;
    const { schedules, schedulesToDisplay, index } = this.state;
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img
                style={{ width: "50%" }}
                src="https://www.canva.com/learn/wp-content/uploads/2018/11/best-free-stock-photos-tb-1320x743.jpg"
              />
            </Paper>
          </Grid>
          <Grid container style={{ height: "59vh" }}>
            <Grid item sm={3}>
              UPCOMING GAMES
            </Grid>
            <Grid item sm={"auto"}>
              <div className={classes.buttonColumn}>
                <IconButton onClick={this.handleBack} disabled={index === 0}>
                  <KeyboardArrowLeft />
                </IconButton>
              </div>
            </Grid>
            <Grid item sm={7}>
              <TransitionGroup>
                <CSSTransition key={index} timeout={400} classNames="fade">
                  <Grid
                    container
                    spacing={1}
                    style={{ position: "absolute", width: "57.8%" }}
                  >
                    {schedulesToDisplay.map((e, index) => {
                      if (index < 4) {
                        return (
                          <Grid item xs={true} sm={6}>
                            <Card schedule={e} size="big" />
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </CSSTransition>
              </TransitionGroup>
            </Grid>
            <Grid item sm={"auto"}>
              <div className={classes.buttonColumn}>
                <IconButton
                  onClick={this.handleNext}
                  disabled={index >= schedules.length - 4}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
