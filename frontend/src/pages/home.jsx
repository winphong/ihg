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
    fontSize: "1000%",
    fontWeight: "100",
    color: "#C8B06B",
    lineHeight: "120%",
    backgroundImage: "./home.jpg"
  },
  subTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      textAlign: "center"
    },
    fontSize: "500%",
    fontWeight: "900",
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
    width: "58.33%",
    backgroundColor: "yellow"
  },
  buttonColumn: {
    [theme.breakpoints.down("sm")]: {
      // padding: "61% 0"
    },
    // display: "flex",
    // justifyContent: "space-evenly",
    backgroundColor: "ivory"
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
    // const photo = await miscService.getSportsPhoto(path.normalize("home.jpg"));
    // const file = new Blob([photo.data], { type: photo.data.type });
    // const fileURL = URL.createObjectURL(file);

    this.setState({
      schedules,
      schedulesToDisplay: schedules
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
    const { schedules, schedulesToDisplay, index } = this.state;

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Grid container>
          <Grid
            container
            alignContent="center"
            // justify="center"
            xs={12}
            style={{ height: "95vh" }}
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
            <Grid item xs={3} style={{ marginLeft: "-34%", zIndex: 0 }}>
              <img src="./home.jpg" width="190%" />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            style={{ backgroundColor: "pink" }}
            xs={12}
          >
            <Grid
              item
              xs={true}
              className={classes.buttonColumn}
              style={{ flexGrow: 0 }}
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
            <Grid item xs={7} style={{ height: "565px" }}>
              <TransitionGroup>
                <CSSTransition key={index} timeout={400} classNames="fade">
                  <Grid container className={classes.cardContainer}>
                    <MediaQuery minDeviceWidth={960}>
                      <Grid item container xs={12}>
                        {schedulesToDisplay.map((e, index) => {
                          if (index < 4) {
                            return (
                              <React.Fragment>
                                <Grid item xs={5}>
                                  <Card schedule={e} size="big" index={index} />
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
            <Grid item xs={3} className={classes.subTitleContainer}>
              <Typography className={classes.subTitle}>
                UPCOMING GAMES
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Home);
