import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import sportService from "../services/sportService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.css";
import SportsList from "../components/sportsList";
import MediaQuery from "react-responsive";

const halls = [
  { name: "Raffles Hall", abbreviation: "RH", director: "" },
  { name: "Eusoff Hall", abbreviation: "EH", director: "" },
  { name: "Temasek Hall", abbreviation: "TH", director: "" },
  { name: "Sheares Hall", abbreviation: "SH", director: "" },
  { name: "Kent Ridge Hall", abbreviation: "KR", director: "" },
  { name: "King Edward VII Hall", abbreviation: "KE7", director: "" },
  { name: "Prince George's Park Hall", abbreviation: "PH", director: "" }
];

const styles = theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "350%",
      marginTop: "25%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "15%"
    },
    textAlign: "center",
    fontSize: "1000%",
    color: "#C8B06B",
    marginTop: "6%"
  },
  titleCaption: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "80%"
    },
    fontSize: "150%",
    color: "white",
    lineHeight: "120%"
  },
  subtitleContainer: {
    // [theme.breakpoints.only("md")]: {
    //   paddingLeft: "4%"
    // },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "3%"
    }
  },
  subtitle: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: "10%",
      fontSize: "200%"
    },
    [theme.breakpoints.only("sm")]: {
      marginBottom: "5%",
      fontSize: "400%"
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "5%", // align subtitle up with hall logo
      fontSize: "300%",
      textAlign: "left"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "380%"
    },
    textAlign: "center"
    // lineHeight: "100%",
  },
  border: {
    [theme.breakpoints.down("sm")]: {},
    // paddingLeft: "4%",
    marginTop: "10%"
  },
  staticImage: {
    width: "70%"
  },
  staticImageCaption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "90%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "130%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "120%"
    },
    fontSize: "150%",
    color: "#252527"
  },
  transitionContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "50vmax"
      // display: "flex",
      // justifyContent: "center"
    },
    textAlign: "left"
  },
  sportsContainer: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "10%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "5%"
    },
    marginTop: "10%"
  },
  sports: {
    flexShrink: 0,
    // backgroundColor: "pink",
    cursor: "pointer",
    fontSize: "120%",
    // padding: "1% 0",
    fontFamily: "TheNextFont"
    // minHeight: "auto"
  },
  sportPhoto: {
    // [theme.breakpoints.only("xs")]: {
    //   width: "100%"
    // },
    // [theme.breakpoints.only("sm")]: {
    //   width: "100%"
    // },
    // [theme.breakpoints.only("md")]: {
    //   width: "100%"
    // },
    [theme.breakpoints.up("lg")]: {
      width: "80%"
    },
    width: "100%"
  },
  sportsInformationContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "5%",
      display: "flex",
      flexDirection: "column",
      width: "50%"
    },
    [theme.breakpoints.only("sm")]: {
      padding: "3% 10%"
    },
    width: "83.33%",
    position: "absolute"
    // backgroundColor: "beige"
  },
  information: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "80%"
    },
    fontSize: "120%",
    color: "#958F87",
    fontWeight: "bold"
  }
});

class About extends Component {
  state = {
    sports: [],
    selectedSport: {},
    imgUrl: ""
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
    const { data: sports } = await sportService.getAllSports();
    const imgUrl = `/sports/${sports[0].imgUrl}`;

    this.setState({
      sports,
      selectedSport: sports[0],
      imgUrl
    });
  }

  handleClick = async sport => {
    const imgUrl = `/sports/${sport.imgUrl}`;
    this.setState({ imgUrl, selectedSport: sport });
  };

  render() {
    const { classes } = this.props;
    const { sports, selectedSport } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container xs={12}>
            <Grid item xs={1} />
            <Grid item xs={10} container style={{ textAlign: "center" }}>
              {/* About IHG */}
              <Grid item xs={12}>
                <Typography variant="h1" className={classes.title}>
                  ABOUT IHG
                </Typography>
                <Typography variant="h1" className={classes.titleCaption}>
                  <div style={{ display: "inline", color: "#C8B06B" }}>
                    Inter-Hall Games{" "}
                  </div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Eget egestas purus viverra accumsan. Feugiat in fermentum
                  posuere urna nec tincidunt praesent semper feugiat. Ut tortor
                  pretium viverra suspendisse potenti nullam. Lacus suspendisse
                  faucibus interdum posuere lorem ipsum dolor sit amet. Vitae
                  ultricies leo integer malesuada nunc vel. Molestie ac feugiat
                  sed lectus vestibulum. Metus aliquam eleifend mi in nulla
                  posuere sollicitudin aliquam ultrices. Tincidunt praesent
                  semper feugiat nibh sed pulvinar. Fringilla urna porttitor
                  rhoncus dolor purus.
                </Typography>
              </Grid>
              {/* Hall of NUS */}
              <Grid
                item
                xs={12}
                container
                className={classes.border}
                alignItems="flex-end"
              >
                <Grid item xs={12} md={3} className={classes.subtitleContainer}>
                  <Typography variant="h1" className={classes.subtitle}>
                    HALLS OF NUS
                  </Typography>
                </Grid>
                <Grid container item xs={12} md={9}>
                  {halls.map((hall, index) => {
                    return (
                      <React.Fragment>
                        <Grid item xs={false} md={index === 3 ? 3 : false} />
                        <Grid item xs={6} md={3}>
                          <img
                            className={classes.staticImage}
                            src={`/${hall.abbreviation}.png`}
                          />
                          <Typography
                            variant="h1"
                            className={classes.staticImageCaption}
                          >
                            {hall.name}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
                <Divider />
              </Grid>

              {/* Sports Director */}
              <Grid
                item
                container
                className={classes.border}
                xs={12}
                alignItems="flex-end"
              >
                <MediaQuery maxWidth={959}>
                  <Grid item xs={12} className={classes.subtitleContainer}>
                    <Typography variant="h1" className={classes.subtitle}>
                      SPORTS DIRECTOR
                    </Typography>
                  </Grid>
                </MediaQuery>
                <Grid container item xs={12} md={9}>
                  {halls.map((hall, index) => {
                    return (
                      <React.Fragment>
                        <Grid item xs={false} md={index === 3 ? 3 : false} />

                        <Grid item xs={6} md={3}>
                          <img
                            className={classes.staticImage}
                            src={`/${hall.abbreviation}.png`}
                          />
                          <Typography
                            variant="h1"
                            className={classes.staticImageCaption}
                          >
                            {hall.name}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
                </Grid>
                <MediaQuery minWidth={960}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.subtitleContainer}
                  >
                    <Typography
                      variant="h1"
                      className={classes.subtitle}
                      style={{ textAlign: "right" }}
                    >
                      SPORTS DIRECTOR
                    </Typography>
                  </Grid>
                </MediaQuery>
                <Divider />
              </Grid>

              {/* Sports */}
              <Grid
                container
                // style={{ height: "500px" }}
                className={classes.sportsContainer}
                // style={{ paddingLeft: "4%" }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  className={classes.subtitleContainer}
                  style={{
                    textAlign: "left"
                  }}
                >
                  <MediaQuery minWidth={960}>
                    <SportsList
                      sports={sports}
                      selectedSport={selectedSport}
                      handleSortBySport={this.handleClick}
                    />
                  </MediaQuery>
                  <Typography variant="h1" className={classes.subtitle}>
                    SPORTS
                  </Typography>
                </Grid>
                <MediaQuery maxWidth={959}>
                  <div
                    style={{
                      display: "flex",
                      overflowX: "scroll",
                      paddingBottom: "3%"
                      // backgroundColor: "pink"
                      // height: "4vmax"
                    }}
                  >
                    {sports.map(sport => {
                      return (
                        <Typography
                          className={classes.sports}
                          onClick={() => this.handleClick(sport)}
                          style={{
                            width: "150px",
                            color:
                              selectedSport.name === sport.name
                                ? "#C8B06B"
                                : "#D3DBD9"
                          }}
                        >
                          {sport.name}
                        </Typography>
                      );
                    })}
                  </div>
                </MediaQuery>
                <Grid
                  container
                  item
                  xs={12}
                  md={8}
                  className={classes.transitionContainer}
                >
                  <TransitionGroup>
                    <CSSTransition
                      key={selectedSport._id}
                      timeout={400}
                      classNames="fade"
                    >
                      <div className={classes.sportsInformationContainer}>
                        <img
                          className={classes.sportPhoto}
                          src={this.state.imgUrl}
                        />
                        <Typography className={classes.information}>
                          {selectedSport.name}
                        </Typography>
                        <Typography className={classes.information}>
                          {selectedSport.description}
                        </Typography>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </Grid>
                {/* <Grid
                item
                container
                xs={12}
                md={5}
                style={{ backgroundColor: "grey" }}
              ></Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
