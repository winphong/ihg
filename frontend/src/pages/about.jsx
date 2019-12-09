import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import sportService from "../services/sportService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import miscService from "../services/miscService";
import path from "path";
import "../App.css";
import MediaQuery from "react-responsive";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "80px",
      textAlign: "center"
    },
    fontSize: "150px",
    fontWeight: "900",
    color: "#C8B06B"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  border: {
    padding: "2%"
  },
  staticImage: {
    width: "70%"
  },
  p: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "100%"
  },
  subtitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
      textAlign: "center"
    },
    textAlign: "left",
    fontSize: "60px",
    fontWeight: "900",
    color: "#C8B06B",
    lineHeight: "100%",
    paddingBottom: "2%"
  },
  sport: {
    fontSize: "150%"
  }
});

class About extends Component {
  state = {
    sports: [],
    selectedSport: {},
    imgUrl: ""
  };

  async componentDidMount() {
    const { data: sports } = await sportService.getAllSports();
    this.setState({
      sports,
      selectedSport: sports[0]
    });
    this.handleClick(sports[0]);
  }

  handleClick = async sport => {
    const photo = await miscService.getSportsPhoto(
      path.normalize(sport.imgUrl)
    );
    const file = new Blob([photo.data], { type: photo.data.type });
    const fileURL = URL.createObjectURL(file);
    this.setState({ imgUrl: fileURL, selectedSport: sport });
  };

  render() {
    const { classes } = this.props;
    const { sports, selectedSport } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container style={{ textAlign: "center" }}>
            <Grid item xs={12}>
              {/* About IHG */}
              <Typography className={classes.title}>ABOUT IHG</Typography>
              Description...........
            </Grid>
            {/* Hall of NUS */}
            <Grid
              item
              xs={12}
              container
              className={classes.border}
              alignItems="flex-end"
            >
              <Grid item xs={12} md={3}>
                <Typography className={classes.subtitle}>HALLS</Typography>
                <Typography className={classes.subtitle}>OF NUS</Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Grid container>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/RH.png" />
                    <p className={classes.p}>Raffles Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/EH.png" />
                    <p className={classes.p}>Eusoff Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/TH.png" />
                    <p className={classes.p}> Temasek Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/SH.png" />
                    <p className={classes.p}> Sheares Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/KE7.png" />
                    <p className={classes.p}> King Edward VII Hall</p>
                    <p />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/KR.png" />
                    <p className={classes.p}> Kent Ridge Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/PGP.png" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </Grid>

            {/* Sports Director */}
            <Grid item container xs={12} alignItems="flex-end">
              <MediaQuery maxWidth={960}>
                <Grid item xs={12} md={3}>
                  Sports Directors
                </Grid>
              </MediaQuery>
              <Grid item xs={12} md={9}>
                <Grid container>
                  <Grid item xs={12} md={3} />
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/RH.png" />
                    <p>Raffles Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/EH.png" />
                    <p>Eusoff Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/TH.png" />
                    <p> Temasek Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/SH.png" />
                    <p> Sheares Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/KE7.png" />
                    <p> King Edward VII Hall</p>
                    <p />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/KR.png" />
                    <p> Kent Ridge Hall</p>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <img className={classes.staticImage} src="/PGP.png" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                </Grid>
              </Grid>
              <MediaQuery minWidth={961}>
                <Grid item xs={12} md={3}>
                  <Typography className={classes.subtitle}>
                    SPORTS DIRECTORS
                  </Typography>
                </Grid>
              </MediaQuery>
              <Divider />
            </Grid>

            {/* Sports */}
            <Grid
              container
              style={{ height: "500px" }}
              className={classes.border}
            >
              <Grid
                item
                xs={12}
                md={3}
                style={{
                  backgroundColor: "gold",
                  display: "flex",
                  alignItems: "flex-end"
                }}
              >
                <Typography className={classes.subtitle}>SPORTS</Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={4}
                style={{
                  textAlign: "left",
                  backgroundColor: "pink"
                }}
              >
                <TransitionGroup>
                  <CSSTransition
                    key={selectedSport._id}
                    timeout={400}
                    classNames="fade"
                  >
                    <div
                      style={{
                        position: "absolute",
                        margin: "2%",
                        width: "28%",
                        backgroundColor: "beige"
                      }}
                    >
                      <img
                        style={{ height: "250px" }}
                        src={this.state.imgUrl}
                      />
                      <Typography style={{ margin: "3% 0" }}>
                        {selectedSport.name}
                      </Typography>
                      <Typography
                        style={{
                          display: "flex",
                          // width: "28%",
                          backgroundColor: "ivory"
                        }}
                      >
                        {" "}
                        {selectedSport.description}{" "}
                      </Typography>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </Grid>
              <Grid
                item
                container
                xs={12}
                md={5}
                style={{ backgroundColor: "grey" }}
              >
                {sports.map(sport => {
                  return (
                    <Grid item xs={6}>
                      <Button
                        style={{
                          backgroundColor: "transparent"
                        }}
                        disableTouchRipple="true"
                        disableRipple="true"
                        onClick={() => this.handleClick(sport)}
                      >
                        <Typography
                          variant="h1"
                          className={classes.sport}
                          style={{
                            color:
                              sport.name === selectedSport.name
                                ? "#252527"
                                : "#958F87"
                          }}
                        >
                          {sport.name}
                        </Typography>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
