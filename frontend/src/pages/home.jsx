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
import Button from "@material-ui/core/Button";

const styles = theme => ({
  banner: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "15%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "8%"
      // height: "45vmax"
    },
    height: "45vmax",
    marginTop: "4%",
    backgroundImage: "url('./headers/home.jpg')",
    backgroundSize: "cover"
  },
  // bannerImageContainer: {
  //   [theme.breakpoints.only("xs")]: {
  //     marginLeft: "-38%",
  //     overflow: "hidden"
  //   },
  //   [theme.breakpoints.up("md")]: {
  //     marginLeft: "-33.5%",
  //     zIndex: 0
  //   },
  //   display: "block"
  // },
  bannerImage: {
    [theme.breakpoints.only("xs")]: {
      height: "95vmax",
      marginLeft: "-250%"
    },
    [theme.breakpoints.only("sm")]: {
      height: "30vmax",
      marginLeft: "-150%"
    },
    [theme.breakpoints.up("md")]: {
      width: "200%"
    }
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "450%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "650%"
    },
    [theme.breakpoints.only("lg")]: {
      fontSize: "800%"
    },
    fontSize: "1000%",
    lineHeight: "120%",
    color: "#C8B06B"
  },
  subTitle: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "140%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "250%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "400%"
    },
    fontSize: "450%",
    color: "#C8B06B",
    lineHeight: "120%",
    fontFamily: "TheNextFont"
  },
  subTitleTransparent: {
    fontSize: "450%",
    color: "transparent",
    "-webkit-text-stroke-width": "1px",
    "-webkit-text-stroke-color": "#C8B06B",
    lineHeight: "120%"
  },
  subTitleContainer: {
    // [theme.breakpoints.up("sm")]: {
    //   display: "flex",
    //   alignItems: "flex-end"
    // paddingTop: "28%"
    // }
  },
  cardRowContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "0 6vw"
    },
    [theme.breakpoints.up("sm")]: {
      height: "650px",
      paddingRight: "10vw",
      // backgroundColor: "pink",
      marginTop: "10%"
    }
  },
  cardContainer: {
    [theme.breakpoints.only("sm")]: {
      // height: "38vmax"
      // zIndex: 1
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      overflowX: "scroll",
      width: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      width: "63.6vw"
    }
    // height: "inherit"
  },
  buttonColumn: {
    [theme.breakpoints.down("sm")]: {
      // padding: "61% 0"
      // backgroundColor: "pink",
      height: "500px"
    },
    [theme.breakpoints.up("sm")]: {
      // padding: "61% 0"
      // backgroundColor: "ivory",
      height: "inherit"
    },
    zIndex: 2,
    display: "flex",
    alignItems: "center"
  },
  buttonText: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "59%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "150%"
    },
    fontFamily: "TheNextFont",
    color: "white"
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
    window.scrollTo({ top: 0 });
    this.props.handleTabChange(this.props.location.pathname);
    const { data: schedules } = await scheduleService.getUpcomingSchedules(
      new Date()
    );
    const { data: halls } = await hallService.getAllHalls();

    this.setState({
      schedules,
      schedulesToDisplay: schedules,
      halls
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
            <Grid item xs={1} sm={2} />
            <Grid item xs={8} sm={7} style={{ zIndex: 1 }}>
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
                  color: "white"
                }}
              >
                19/20
              </Typography>
            </Grid>
          </Grid>
          {/* Card container */}
          <MediaQuery minDeviceWidth={1280}>
            <Grid container className={classes.cardRowContainer} xs={12}>
              <Grid
                item
                md={true}
                className={classes.buttonColumn}
                justify="flex-end"
              >
                <IconButton
                  onClick={() => this.handleBack(4)}
                  disabled={index === 0}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </Grid>
              {/* Cards */}
              <Grid item md={7}>
                <TransitionGroup>
                  <CSSTransition key={index} timeout={400} classNames="fade">
                    <Grid container className={classes.cardContainer}>
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
                                  <Card schedule={e} size="big" index={index} />
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
                    </Grid>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
              <Grid item md={true} className={classes.buttonColumn}>
                <IconButton
                  onClick={() => this.handleNext(4)}
                  disabled={index >= schedules.length - 4}
                  // style={{ padding: 0 }}
                >
                  <KeyboardArrowRight />
                </IconButton>
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
                      width: "50%",
                      padding: "3% 0",
                      margin: "15px 0 40px 0"
                    }}
                    to={"/schedule"}
                    component={Link}
                  >
                    <Typography
                      style={{ fontFamily: "TheNextFont", fontSize: "100%" }}
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
                // height: "70vh",
                padding: "0 7vw",
                marginTop: "10%"
                // backgroundColor: "pink"
              }}
              alignItems="flex-end"
            >
              <Grid item xs={4}>
                <Typography
                  variant="h1"
                  className={classes.subTitleTransparent}
                >
                  CURRENT STANDINGS
                </Typography>
                <Typography
                  variant="h1"
                  className={classes.subTitleTransparent}
                >
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
                    width: "40%",
                    padding: "3% 0",
                    margin: "5% 0 6% 0"
                  }}
                  to={"/results"}
                  component={Link}
                >
                  <Typography
                    style={{ fontFamily: "TheNextFont", fontSize: "100%" }}
                  >
                    VIEW RESULT
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={8}>
                <ResultBarHorizontal halls={halls} />
              </Grid>
            </Grid>
          </MediaQuery>
          {/*  */}
          <MediaQuery maxDeviceWidth={1279}>
            <Grid container xs={12} style={{ padding: "3vh 5vw" }}>
              <Grid item xs={9}>
                <Typography className={classes.subTitle}>
                  {" "}
                  UPCOMING GAMES
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Button
                  style={{ backgroundColor: "#C8B06B", padding: "6%" }}
                  fullWidth
                  to={"/schedule"}
                  component={Link}
                >
                  <Typography className={classes.buttonText}>
                    VIEW SCHEDULE
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {schedulesToDisplay.length > 0 && (
                <div className={classes.cardContainer}>
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
            </Grid>
            <Grid container xs={12} style={{ padding: "3vh 5vw" }}>
              <Grid item xs={9}>
                <Typography className={classes.subTitle}>
                  {" "}
                  CURRENT STANDINGS
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Button
                  style={{ backgroundColor: "#C8B06B", padding: "6%" }}
                  fullWidth
                  to={"/results"}
                  component={Link}
                >
                  <Typography className={classes.buttonText}>
                    VIEW RESULT
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <ResultBarHorizontal halls={halls} />
          </MediaQuery>
        </Grid>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Home);
