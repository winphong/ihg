import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Card from "../components/card";
import scheduleService from "../services/scheduleService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import MediaQuery from "react-responsive";
import hallService from "../services/hallService";
import ResultBarHorizontal from "./../components/resultBarHorizontal";
import { Button } from "@material-ui/core";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%"
    },
    fontSize: "8.5vw",
    color: "#C8B06B",
    lineHeight: "120%"
  },
  subTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%",
      textAlign: "center"
    },
    fontSize: "4.4vw",
    color: "#C8B06B",
    lineHeight: "100%"
  },
  subTitleContainer: {
    // [theme.breakpoints.up("md")]: {
    //   display: "flex",
    //   alignItems: "flex-end"
    // paddingTop: "28%"
    // }
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "84%"
    },
    position: "absolute",
    width: "63.6vw"
    // backgroundColor: "yellow"
  },
  buttonColumn: {
    [theme.breakpoints.down("sm")]: {
      // padding: "61% 0"
    },
    height: "inherit",
    display: "flex",
    alignItems: "center"
    // backgroundColor: "ivory"
  }
});

class Home extends Component {
  state = {
    schedules: [],
    schedulesToDisplay: [],
    halls: [],
    index: 0
  };

  async componentDidMount() {
    const { data: schedules } = await scheduleService.getAllSchedules();
    const { data: halls } = await hallService.getAllHalls();
    // const photo = await miscService.getSportsPhoto(path.normalize("home.jpg"));
    // const file = new Blob([photo.data], { type: photo.data.type });
    // const fileURL = URL.createObjectURL(file);

    this.setState({
      schedules,
      schedulesToDisplay: schedules,
      halls
      // homeUrl: fileURL
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
    const { schedules, schedulesToDisplay, index, halls } = this.state;

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Grid container>
          <Grid
            container
            alignContent="center"
            // justify="center"
            xs={12}
            style={{ height: "93vh" }}
          >
            <Grid item xs={2} />
            <Grid item xs={7} style={{ zIndex: 1 }}>
              <Typography variant="h1" className={classes.title}>
                INTER-HALL
              </Typography>
              <Typography variant="h1" className={classes.title}>
                GAMES
              </Typography>
              <Typography
                variant="h1"
                className={classes.title}
                style={{
                  color: "black"
                }}
              >
                19/20
              </Typography>
            </Grid>
            <Grid item xs={3} style={{ marginLeft: "-33vw", zIndex: 0 }}>
              <img src="./home.jpg" width="750vw" style={{ opacity: "0.3" }} />
            </Grid>
          </Grid>
          <Grid
            container
            // alignItems="center"
            style={{
              // backgroundColor: "pink",
              height: "74vh",
              padding: "0 3vh",
              marginTop: "1vh"
            }}
            xs={12}
          >
            <Grid
              item
              xs={true}
              className={classes.buttonColumn}
              justify="flex-end"
            >
              <MediaQuery minDeviceWidth={960}>
                <IconButton
                  onClick={() => this.handleBack(4)}
                  disabled={index === 0}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={959}>
                <IconButton
                  onClick={() => this.handleBack(2)}
                  disabled={index === 0}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </MediaQuery>
            </Grid>
            {/* Cards */}
            <Grid item xs={8}>
              <TransitionGroup>
                <CSSTransition key={index} timeout={400} classNames="fade">
                  <Grid container className={classes.cardContainer}>
                    <MediaQuery minDeviceWidth={960}>
                      <Grid item container xs={12}>
                        {schedulesToDisplay.map((e, index) => {
                          if (index < 4) {
                            return (
                              <React.Fragment key={index}>
                                <Grid item xs={5}>
                                  <Card schedule={e} size="big" index={index} />
                                  {index < 2 && (
                                    <Divider style={{ margin: "2vh 4vw" }} />
                                  )}
                                </Grid>
                                {index % 2 == 0 && (
                                  <Grid
                                    item
                                    xs={2}
                                    // style={{ backgroundColor: "pink" }}
                                  />
                                )}
                              </React.Fragment>
                            );
                          }
                        })}
                      </Grid>
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
            <Grid item xs={true} className={classes.buttonColumn}>
              <MediaQuery minDeviceWidth={960}>
                <IconButton
                  onClick={() => this.handleNext(4)}
                  disabled={index >= schedules.length - 4}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={959}>
                <IconButton
                  onClick={() => this.handleNext(2)}
                  disabled={index >= schedules.length - 2}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </MediaQuery>
            </Grid>
            <Grid
              item
              xs={3}
              className={classes.subTitleContainer}
              style={{
                height: "inherit",
                display: "flex",
                alignItems: "flex-end",
                textAlign: "right"
              }}
            >
              <Grid item>
                <Typography variant="h1" className={classes.subTitle}>
                  UPCOMING GAMES
                </Typography>
                <Typography variant="h1" className={classes.subTitle}>
                  UPCOMING GAMES
                </Typography>
                <Typography variant="h1" className={classes.subTitle}>
                  UPCOMING GAMES
                </Typography>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: "#C8B06B",
                    color: "white",
                    width: "80%",
                    height: "8vh",
                    margin: "3vh 0"
                  }}
                  to={"/schedule"}
                  component={Link}
                >
                  <Typography
                    style={{ fontFamily: "TheNextFont", fontSize: "2vw" }}
                  >
                    VIEW SCHEDULE
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              height: "80vh",
              padding: "0 3vh",
              marginTop: "18vh"
            }}
            alignItems="flex-end"
          >
            <Grid item xs={4}>
              <Typography variant="h1" className={classes.subTitle}>
                CURRENT STANDINGS
              </Typography>
              <Typography variant="h1" className={classes.subTitle}>
                CURRENT STANDINGS
              </Typography>
              <Typography variant="h1" className={classes.subTitle}>
                CURRENT STANDINGS
              </Typography>
              <Button
                fullWidth
                style={{
                  backgroundColor: "#C8B06B",
                  color: "white",
                  width: "55%",
                  height: "8vh",
                  margin: "3vh 0"
                }}
                to={"/results"}
                component={Link}
              >
                <Typography
                  style={{ fontFamily: "TheNextFont", fontSize: "2vw" }}
                >
                  VIEW RESULTS
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={8}>
              <ResultBarHorizontal halls={halls} />
            </Grid>
          </Grid>
        </Grid>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Home);
