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
  banner: {
    [theme.breakpoints.up("md")]: {
      height: "90vh"
      // fontSize: "100%"
    },
    [theme.breakpoints.down("md")]: {
      // fontSize: "100%"
      marginTop: "5vh",
      backgroundColor: "grey"
    }
  },
  bannerImageContainer: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "-33.5%",
      zIndex: 0
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "-38%",
      overflow: "hidden"
    }
  },
  bannerImage: {
    [theme.breakpoints.up("md")]: {
      width: "200%"
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
      height: "80vh",
      marginLeft: "-250%"
    }
  },
  title: {
    [theme.breakpoints.up("md")]: {
      fontSize: "8.5vw"
    },
    lineHeight: "120%",
    color: "#C8B06B",
    fontSize: "10vw"
  },
  subTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%",
      textAlign: "center"
    },
    fontSize: "3.5vw",
    color: "#C8B06B",
    lineHeight: "120%"
  },
  subTitleTransparent: {
    fontSize: "3.5vw",
    color: "transparent",
    "-webkit-text-stroke-width": "1px",
    "-webkit-text-stroke-color": "#C8B06B",
    lineHeight: "120%"
  },
  subTitleContainer: {
    // [theme.breakpoints.up("md")]: {
    //   display: "flex",
    //   alignItems: "flex-end"
    // paddingTop: "28%"
    // }
  },
  cardRowContainer: {
    [theme.breakpoints.down("md")]: {
      padding: "0 6vw"
    },
    [theme.breakpoints.up("md")]: {
      height: "650px",
      padding: "0 7vw",
      marginTop: "10%"
    }
  },
  cardContainer: {
    [theme.breakpoints.down("md")]: {
      width: "73.33vw",
      border: "1px solid black",
      backgroundColor: "red",
      zIndex: 100
    },
    position: "absolute",
    width: "63.6vw",
    height: "inherit"
  },
  buttonColumn: {
    [theme.breakpoints.down("md")]: {
      // padding: "61% 0"
      backgroundColor: "pink",
      height: "500px"
    },
    [theme.breakpoints.up("md")]: {
      // padding: "61% 0"
      // backgroundColor: "ivory",
      height: "inherit"
    },
    zIndex: 1,
    display: "flex",
    alignItems: "center"
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
          {/* Banner container */}
          <Grid
            container
            alignItems="center"
            xs={12}
            className={classes.banner}
          >
            <Grid item xs={1} md={2} />
            <Grid item xs={8} md={7} style={{ zIndex: 1 }}>
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
            <Grid item xs={4} md={3} className={classes.bannerImageContainer}>
              <img src="./home.jpg" className={classes.bannerImage} />
            </Grid>
          </Grid>
          {/* Card container */}
          <MediaQuery minDeviceWidth={960}>
            <Grid container className={classes.cardRowContainer} xs={12}>
              <Grid
                item
                md={true}
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
              <Grid item md={7}>
                <TransitionGroup>
                  <CSSTransition key={index} timeout={400} classNames="fade">
                    <Grid container className={classes.cardContainer}>
                      <MediaQuery minDeviceWidth={960}>
                        <Grid
                          item
                          container
                          xs={12}
                          style={{ marginLeft: "-1.9vw" }}
                        >
                          {schedulesToDisplay.map((e, index) => {
                            if (index < 4) {
                              return (
                                <React.Fragment key={index}>
                                  <Grid item xs={5}>
                                    <Card
                                      schedule={e}
                                      size="big"
                                      index={index}
                                    />
                                    {index < 2 && (
                                      <Divider
                                        style={{
                                          margin: "15px 8vw 15px 8vw",
                                          backgroundColor: "#C8B06B"
                                        }}
                                      />
                                    )}
                                  </Grid>
                                  {/* {index % 2 == 0 && (
                                  <Grid
                                    item
                                    xs={1}
                                    style={{ backgroundColor: "pink" }}
                                  />
                                )} */}
                                </React.Fragment>
                              );
                            }
                          })}
                        </Grid>
                      </MediaQuery>
                    </Grid>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
              <Grid item md={true} className={classes.buttonColumn}>
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
                md={3}
                className={classes.subTitleContainer}
                style={{
                  height: "inherit",
                  display: "flex",
                  alignItems: "flex-end",
                  textAlign: "right"
                }}
              >
                <Grid item>
                  <Typography
                    variant="h1"
                    className={classes.subTitleTransparent}
                  >
                    UPCOMING GAMES
                  </Typography>
                  <Typography
                    variant="h1"
                    className={classes.subTitleTransparent}
                  >
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
                      width: "65%",
                      padding: "3% 0",
                      margin: "15px 0 40px 0"
                    }}
                    to={"/schedule"}
                    component={Link}
                  >
                    <Typography
                      style={{ fontFamily: "TheNextFont", fontSize: "1.5vw" }}
                    >
                      VIEW SCHEDULE
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={956}>
            {/* {schedulesToDisplay.map((e, index) => {
                        if (index < 2) {
                          return (
                            <Grid item xs={12} md={6}>
                              <Card schedule={e} size="big" />
                            </Grid>
                          );
                        }
                      })} */}
            {schedulesToDisplay.length > 0 && (
              <div
                style={{
                  display: "flex",
                  overflowX: "scroll",
                  width: "100%"
                }}
              >
                {schedulesToDisplay.map((e, index) => {
                  return (
                    <Card
                      schedule={e}
                      size="big"
                      index={index}
                      scheduleSize={schedules.length}
                    />
                  );
                })}
              </div>
            )}
          </MediaQuery>
          <Grid
            container
            xs={12}
            style={{
              // height: "70vh",
              padding: "0 7vw",
              marginTop: "10%"
              // backgroundColor: "pink"
            }}
            alignItems="flex-end"
          >
            <Grid item xs={3}>
              <Typography variant="h1" className={classes.subTitleTransparent}>
                CURRENT STANDINGS
              </Typography>
              <Typography variant="h1" className={classes.subTitleTransparent}>
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
                  width: "60%",
                  padding: "3% 0",
                  margin: "5% 0 6% 0"
                }}
                to={"/results"}
                component={Link}
              >
                <Typography
                  style={{ fontFamily: "TheNextFont", fontSize: "1.5vw" }}
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
