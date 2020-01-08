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
  { name: "Raffles Hall", abbreviation: "RH", director: "Kavin" },
  { name: "Eusoff Hall", abbreviation: "EH", director: "Amos" },
  { name: "Temasek Hall", abbreviation: "TH", director: "Aqil" },
  { name: "Sheares Hall", abbreviation: "SH", director: "Dom" },
  { name: "Kent Ridge Hall", abbreviation: "KR", director: "Ying Hao" },
  { name: "King Edward VII Hall", abbreviation: "KE7", director: "Celine" },
  {
    name: "Prince George's Park Hall",
    abbreviation: "PH",
    director: "Anabelle"
  }
];

const styles = theme => ({
  banner: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "15%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "8%"
    },
    // mate 10 landscape
    ["@media(min-width: 565px) and (max-width: 570px)"]: {
      marginTop: "10%"
    },

    height: "45vmax",
    marginTop: "4%",
    backgroundImage: "url('./headers/about.jpg')",
    backgroundSize: "cover"
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "10%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "420%",
      marginTop: "6%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "600%",
      marginTop: "7%"
    },
    // iphone 6/7/8 potrait
    ["@media (min-width: 370px) and (max-width: 380px)"]: {
      marginTop: "15%"
    },
    // iphone X potrait
    ["@media (min-width: 370px) and (max-width: 380px) and (min-height: 810px)"]: {
      marginTop: "25%"
    },
    // huawei mate 10 landscape
    ["@media(min-width: 565px) and (max-width: 570px)"]: {
      marginTop: "3%"
    },
    // iphone x landscape
    ["@media(min-width: 810px) and (max-width: 815px)"]: {
      marginTop: "6%"
    },
    // ipad portrait
    ["@media(min-width: 760px) and (max-width: 770px)"]: {
      marginTop: "15%"
    },
    // ipad pro portrait
    ["@media(min-width: 1020px) and (max-width: 1030px) and (orientation: portrait)"]: {
      marginTop: "15%"
    },
    textAlign: "center",
    fontSize: "700%",
    color: "#C8B06B",
    marginTop: "10%"
  },
  titleCaption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "80%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "100%"
    },
    fontSize: "150%",
    color: "white",
    lineHeight: "120%",
    padding: "8% 23%",
    textAlign: "center"
  },
  subtitleContainer: {
    // [theme.breakpoints.only("md")]: {
    //   paddingLeft: "4%"
    // },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "2%"
    }
  },
  director: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: "10%",
      fontSize: "200%"
    },
    [theme.breakpoints.only("sm")]: {
      marginBottom: "5%",
      fontSize: "400%"
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "10%", // align subtitle up with hall logo
      fontSize: "350%",
      textAlign: "right"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "450%"
    },
    textAlign: "center"
  },
  hallOfNus: {
    [theme.breakpoints.only("xs")]: {
      marginBottom: "10%",
      fontSize: "200%"
    },
    [theme.breakpoints.only("sm")]: {
      marginBottom: "5%",
      fontSize: "400%"
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: "15%", // align subtitle up with hall logo
      fontSize: "350%",
      textAlign: "left"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "450%"
    },
    textAlign: "center"
  },
  sportList: {
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
      fontSize: "350%",
      textAlign: "left"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "450%"
    },
    textAlign: "center"
  },
  border: {
    [theme.breakpoints.down("sm")]: {},
    // paddingLeft: "4%",
    marginTop: "15%"
  },
  directorImage: {
    width: "80%"
  },
  crestImage: {
    width: "60%"
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
    fontSize: "120%",
    color: "#252527"
  },
  transitionContainer: {
    [theme.breakpoints.only("xs")]: {
      height: "35vmax"
      // display: "flex",
      // justifyContent: "center"
    },
    [theme.breakpoints.only("sm")]: {
      height: "50vmax"
    },
    ["@media(max-width: 320px)"]: {
      height: "45vmax"
    },
    // display: "flex",
    // justifyContent: "center"
    textAlign: "left"
  },
  sportsContainer: {
    [theme.breakpoints.only("xs")]: {
      marginTop: "10%"
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: "5%"
    },
    marginTop: "15%"
  },
  sports: {
    flexShrink: 0,
    cursor: "pointer",
    fontSize: "120%",
    fontFamily: "TheNextFont",
    margin: "0 3%"
    // backgroundColor: "pink",
    // padding: "1% 0",
    // minHeight: "auto"
  },
  sportPhoto: {
    width: "100%"
  },
  sportsInformationContainer: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "5%",
      display: "flex",
      flexDirection: "column",
      width: "55%"
    },
    width: "83.33%",
    position: "absolute"
  },
  information: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "80%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "120%"
    },
    // ipad portrait
    ["@media(min-width: 760px) and (max-width: 770px)"]: {
      fontSize: "120%"
    },
    ["@media(min-width: 800px) and (max-width: 960px)"]: {
      fontSize: "100%"
    },
    color: "#252527"
    // fontWeight: "bold"
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
    this.props.handleTabChange(this.props.location.pathname);
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
          <React.Fragment>
            <Grid container xs={12}>
              {/* About IHG */}
              <Grid item xs={12} className={classes.banner}>
                <Typography variant="h1" className={classes.title}>
                  ABOUT
                </Typography>
                <Typography variant="h1" className={classes.titleCaption}>
                  <div style={{ display: "inline", color: "#C8B06B" }}>
                    Inter-Hall Games{" "}
                  </div>
                  IS AN ANNUAL COMPETITION BETWEEN THE 7 RESIDENTIAL HALLS
                  WITHIN NUS: SHEARES, KENT RIDGE, TEMASEK, EUSOFF, RAFFLES,
                  KING EDWARD VII, PGP HOUSE. THE COMPETITION CONSISTS OF 17
                  SPORTS WHERE ATHLETES OF THE HALLS COMPETE FOR THE TITLE OF
                  IHG CHAMPIONS.
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={10} container style={{ textAlign: "center" }}>
                {/* Hall of NUS */}
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="flex-end"
                  className={classes.border}
                >
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.subtitleContainer}
                  >
                    <Typography variant="h1" className={classes.hallOfNus}>
                      HALLS OF NUS
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} md={9}>
                    {halls.map((hall, index) => {
                      return (
                        <React.Fragment>
                          <Grid item xs={false} md={index === 3 ? 3 : false} />
                          <Grid
                            item
                            xs={6}
                            md={3}
                            style={{ marginBottom: "5%" }}
                          >
                            <img
                              className={classes.crestImage}
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
                      <Typography variant="h1" className={classes.director}>
                        SPORTS DIRECTOR
                      </Typography>
                    </Grid>
                  </MediaQuery>
                  <Grid container item xs={12} md={8}>
                    {halls.map((hall, index) => {
                      return (
                        <React.Fragment>
                          <Grid item xs={false} md={index === 3 ? 3 : false} />

                          <Grid
                            item
                            xs={6}
                            md={3}
                            style={{ marginBottom: "5%" }}
                          >
                            <img
                              style={{ width: "80%" }}
                              src={`/directors/${hall.director}.png`}
                            />
                            <Typography
                              variant="h1"
                              className={classes.staticImageCaption}
                            >
                              {hall.abbreviation} - {hall.director}
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
                      md={4}
                      className={classes.subtitleContainer}
                    >
                      <Typography variant="h1" className={classes.director}>
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
                    <Typography variant="h1" className={classes.sportList}>
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
                              // width: "150px",
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
                          {/* <Typography className={classes.information}>
                          {selectedSport.name}
                        </Typography> */}
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
          </React.Fragment>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
