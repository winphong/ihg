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
import miscService from "../services/miscService";
import path from "path";
import cookie from "react-cookies";
import Typography from "@material-ui/core/Typography";
import MediaQuery from "react-responsive";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "60px"
    },
    // 100% - 16px
    fontSize: "100px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%"
  },
  subTitle: {
    // "@media screen and (max-width: 1080px)": {
    // },
    [theme.breakpoints.down("md")]: {
      fontSize: "40px"
    },
    fontSize: "80px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%"
  },

  buttonColumn: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    padding: "15% 0"
    // backgroundColor: "pink"
    // how to solve this?
  }
});

class Home extends Component {
  state = {
    schedules: [],
    schedulesToDisplay: [],
    index: 0,
    homeUrl: "",
    isMobile: ""
  };

  async componentDidMount() {
    const isMobile = cookie.load("isMobileDevice");
    this.setState({ isMobile });

    console.log(window.screen.width);

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
    const {
      schedules,
      schedulesToDisplay,
      index,
      isMobile,
      isSmall
    } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container>
            <Grid item xs={12} className={classes.paper}>
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
              <Grid
                item
                xs={12}
                md={3}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  paddingLeft: "2%"
                }}
              >
                <Typography className={classes.subTitle}>
                  UPCOMING GAMES
                </Typography>
              </Grid>
              <Grid item xs={2} md={1} className={classes.buttonColumn}>
                <IconButton onClick={this.handleBack} disabled={index === 0}>
                  <KeyboardArrowLeft />
                </IconButton>
              </Grid>
              <Grid item xs={8} md={7}>
                <TransitionGroup>
                  <CSSTransition key={index} timeout={400} classNames="fade">
                    <Grid
                      id="inside"
                      container
                      spacing={1}
                      style={{ position: "absolute", width: "58.6%" }}
                    >
                      {schedulesToDisplay.map((e, index) => {
                        if (index < 4) {
                          return (
                            <Grid item xs={12} md={6}>
                              <Card schedule={e} size="big" />
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
              <Grid item xs={2} md={1} className={classes.buttonColumn}>
                <IconButton
                  onClick={this.handleNext}
                  disabled={index >= schedules.length - 4}
                >
                  <KeyboardArrowRight />
                </IconButton>
              </Grid>
            </Grid>
            {/* <MediaQuery minWidth={320} maxWidth={1080}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    paddingLeft: "2%"
                  }}
                >
                  <Typography className={classes.subTitle}>
                    UPCOMING GAMES
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.buttonColumn}>
                  <IconButton onClick={this.handleBack} disabled={index === 0}>
                    <KeyboardArrowLeft />
                  </IconButton>
                </Grid>
                <Grid item xs={8}>
                  <TransitionGroup>
                    <CSSTransition key={index} timeout={400} classNames="fade">
                      <Grid
                        id="inside"
                        container
                        spacing={1}
                        style={{ position: "absolute", width: "58.6%" }}
                      >
                        {schedulesToDisplay.map((e, index) => {
                          if (index < 4) {
                            return (
                              <Grid item xs={12} md={6}>
                                <Card schedule={e} size="big" />
                              </Grid>
                            );
                          }
                        })}
                      </Grid>
                    </CSSTransition>
                  </TransitionGroup>
                </Grid>
                <Grid item xs={2} className={classes.buttonColumn}>
                  <IconButton
                    onClick={this.handleNext}
                    disabled={index >= schedules.length - 4}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Grid>
              </Grid>
            </MediaQuery> */}
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);

// To force reload
