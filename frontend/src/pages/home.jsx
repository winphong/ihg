import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import scheduleService from "../services/scheduleService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import miscService from "../services/miscService";
import path from "path";
import Typography from "@material-ui/core/Typography";
import MediaQuery from "react-responsive";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    },
    fontSize: "100px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%"
  },
  subTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      textAlign: "center"
    },
    fontSize: "80px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%"
  },
  subTitleContainer: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "flex-end",
      paddingTop: "28%"
    }
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "84%"
    },
    position: "absolute",
    width: "58.33%"
  },
  buttonColumn: {
    [theme.breakpoints.down("sm")]: {
      padding: "61% 0"
    },
    display: "flex",
    justifyContent: "space-evenly"
  }
});

class Home extends Component {
  state = {
    schedules: [],
    schedulesToDisplay: [],
    index: 0,
    homeUrl: ""
  };

  async componentDidMount() {
    const { data: schedules } = await scheduleService.getAllSchedules();
    const photo = await miscService.getSportsPhoto(path.normalize("home.jpg"));
    const file = new Blob([photo.data], { type: photo.data.type });
    const fileURL = URL.createObjectURL(file);

    this.setState({
      schedules,
      schedulesToDisplay: schedules,
      homeUrl: fileURL
    });
  }

  handleNext = num => {
    const index = this.state.index + num;
    if (index >= this.state.schedules.length) return;

    const schedules = [...this.state.schedules];
    const schedulesToDisplay = schedules.splice(index, index + num);

    this.setState({ schedulesToDisplay, index });
  };

  handleBack = num => {
    const index = this.state.index - num;
    if (index < 0) return;

    const schedules = [...this.state.schedules];
    const schedulesToDisplay = schedules.splice(index, index + num);

    this.setState({ schedulesToDisplay, index });
  };

  render() {
    const { classes } = this.props;
    const { schedules, schedulesToDisplay, index } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.title}>INTER-HALL</Typography>
              <Typography className={classes.title}>GAMES</Typography>
              <Typography
                className={classes.title}
                style={{
                  color: "black"
                }}
              >
                19/20
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={3} className={classes.subTitleContainer}>
                <Typography className={classes.subTitle}>
                  UPCOMING GAMES
                </Typography>
              </Grid>
              <Grid item xs={1} md={1} className={classes.buttonColumn}>
                <MediaQuery minDeviceWidth={960}>
                  <IconButton
                    onClick={() => this.handleBack(4)}
                    disabled={index === 0}
                    style={{ padding: 0 }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={959}>
                  <IconButton
                    onClick={() => this.handleBack(2)}
                    disabled={index === 0}
                    style={{ padding: 0 }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </MediaQuery>
              </Grid>
              <Grid item xs={10} md={7} className={classes}>
                <TransitionGroup>
                  <CSSTransition key={index} timeout={400} classNames="fade">
                    <Grid
                      container
                      spacing={1}
                      className={classes.cardContainer}
                    >
                      <MediaQuery minDeviceWidth={960}>
                        {schedulesToDisplay.map((e, index) => {
                          if (index < 4) {
                            return (
                              <Grid item xs={12} md={6}>
                                <Card schedule={e} size="big" />
                              </Grid>
                            );
                          }
                        })}
                      </MediaQuery>
                      <MediaQuery maxDeviceWidth={956}>
                        {schedulesToDisplay.map((e, index) => {
                          if (index < 2) {
                            return (
                              <Grid item xs={12} md={6}>
                                <Card schedule={e} size="big" />
                              </Grid>
                            );
                          }
                        })}
                      </MediaQuery>
                    </Grid>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
              <Grid item xs={1} md={1} className={classes.buttonColumn}>
                <MediaQuery minDeviceWidth={960}>
                  <IconButton
                    onClick={() => this.handleNext(4)}
                    disabled={index >= schedules.length - 4}
                    style={{ padding: 0 }}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={959}>
                  <IconButton
                    onClick={() => this.handleNext(2)}
                    disabled={index >= schedules.length - 2}
                    style={{ padding: 0 }}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </MediaQuery>
              </Grid>
            </Grid>
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
