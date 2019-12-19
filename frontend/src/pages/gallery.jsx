import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import miscService from "../services/miscService";
import { withStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";

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
    backgroundImage: "url('./headers/gallery.jpg')",
    backgroundSize: "cover"
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%"
      // marginTop: "25%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "420%"
      // marginTop: "10%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "600%"
    },
    ["@media(orientation: portrait)"]: {
      marginTop: "10%"
    },
    marginTop: "4%",
    lineHeight: "120%",
    fontSize: "700%"
  },
  caption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "80%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "110%"
    },
    // iphone x potrait
    ["@media (min-width: 370px) and (max-width: 380px)"]: {
      marginBottom: "-30%"
    },
    color: "white",
    fontSize: "200%"
  },
  subcaption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "80%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "110%"
    },
    fontSize: "200%"
  },
  // mainPhotoSuperContainer: {
  //   [theme.breakpoints.only("xs")]: {
  //     height: "20vmax"
  //   },
  //   [theme.breakpoints.only("sm")]: {
  //     height: "25vmax"
  //   },
  //   [theme.breakpoints.only("md")]: {
  //     height: "300px"
  //   },
  //   [theme.breakpoints.up("lg")]: {
  //     height: "30vmax"
  //   }
  // },
  mainPhotoContainer: {
    // [theme.breakpoints.only("xs")]: {
    //   height: "18vmax"
    // },
    // [theme.breakpoints.only("sm")]: {
    //   height: "25vmax"
    // },
    // [theme.breakpoints.only("md")]: {
    //   height: "300px"
    // },
    // [theme.breakpoints.up("lg")]: {
    //   height: "30vmax"
    // },
    // objectFit: "cover",
    // margin: "5% 0"
  },
  mainPhoto: {
    [theme.breakpoints.only("xs")]: {
      width: "83%"
    },
    [theme.breakpoints.only("sm")]: {
      width: "55%"
    },
    [theme.breakpoints.only("md")]: {
      width: "220px"
    },
    [theme.breakpoints.up("md")]: {
      width: "75%"
    },
    // mate 10 landscape
    ["@media(min-width: 565px) and (max-width: 570px)"]: {
      width: "55%"
    },
    // iphone x potrait
    ["@media (min-width: 370px) and (max-width: 380px)"]: {
      width: "90%"
    },
    objectFit: "cover"
    // width: "100%"
  },
  photosContainer: {
    [theme.breakpoints.up("sm")]: {},
    // border: "1px solid black",
    // backgroundColor: "pink",
    paddingTop: "3%",
    display: "flex",
    justifyContent: "center"
  },
  photos: {
    [theme.breakpoints.only("sm")]: {
      width: "18vmax",
      height: "18vmax"
    },
    [theme.breakpoints.only("md")]: {
      width: "210px",
      height: "210px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "19vmax",
      height: "19vmax"
    },
    width: "12vmax",
    height: "12vmax",
    objectFit: "cover"
  },
  photoCaption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "60%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "70%"
    },
    fontSize: "120%",
    paddingRight: "15px",
    display: "flex"
  },
  photoCaptionContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "100px"
    },
    [theme.breakpoints.only("md")]: {
      height: "250px"
    },
    [theme.breakpoints.up("lg")]: {},
    marginRight: "-15px",
    height: "300px",
    overflowY: "auto"
  }
});

class Gallery extends Component {
  state = {
    photos: []
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
    this.props.handleTabChange(this.props.location.pathname);
    let { data: photos } = await miscService.getInstagramPhotos();
    photos = photos.data;
    this.setState({ photos });
  }

  render() {
    const { classes } = this.props;
    const { photos } = this.state;

    return (
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <React.Fragment>
          <Grid container xs={12}>
            {/* Background image */}
            {/* <Grid
              item
              xs={12}
              style={{
                zIndex: 0
              }}
            >
              <img
                src="./home.jpg"
                style={{
                  position: "absolute",
                  width: "100%",
                  opacity: 0.3
                }}
                alt="home"
              />
            </Grid> */}
            <Grid item container xs={12} className={classes.banner}>
              <Grid item xs={1} md={2} />
              {/* Top segment */}
              <Grid
                item
                container
                style={{
                  textAlign: "center"
                }}
                xs={10}
                md={8}
              >
                <Grid item xs={12}>
                  <Typography variant="h1" className={classes.title}>
                    GALLERY
                  </Typography>
                  <Typography variant="h1" className={classes.caption}>
                    FOLLOW US{" "}
                    <Link
                      href="https://www.instagram.com/ihgofficial"
                      style={{
                        color: "#C8B06B"
                      }}
                    >
                      @IHGOFFICIAL
                    </Link>{" "}
                    FOR MORE UPDATES
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  alignItems="center"
                  // className={classes.mainPhotoSuperContainer}
                >
                  <Grid item xs={6} className={classes.mainPhotoContainer}>
                    {photos.length > 0 && (
                      <img
                        src={photos[0].media_url}
                        className={classes.mainPhoto}
                        style={{
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          window.location = photos[0].permalink;
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: "left" }}>
                    {/* <Typography>
                      <Link
                        href="https://www.instagram.com/ihgofficial"
                        // className={classes.caption}
                        style={{
                          color: "#C8B06B",
                          // fontSize: "2vw",
                          fontWeight: "bold"
                        }}
                      >
                        <Typography
                          className={classes.subcaption}
                          style={{
                            color: "#C8B06B"
                          }}
                        >
                          @ihgofficial
                        </Typography>
                      </Link>
                    </Typography>
                    <Typography
                      className={classes.subcaption}
                      style={{
                        // fontSize: "2vw",
                        fontWeight: "bold",
                        color: "white"
                      }}
                    >
                      Summary for yesterday and schedule for today!
                    </Typography> */}
                    <div style={{ overflow: "hidden" }}>
                      <div className={classes.photoCaptionContainer}>
                        <Typography
                          className={classes.photoCaption}
                          style={{
                            color: "white"
                          }}
                        >
                          {photos.length > 0 && photos[0].caption}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} md={2} />
            </Grid>
            {/* Bottom segment */}
            <Grid item xs={1} md={2} />
            <Grid
              item
              container
              xs={10}
              md={8}
              style={{ minHeight: "50vmax", zIndex: 1 }}
            >
              {photos.splice(1, 9).map(photo => {
                return (
                  <Grid item xs={4} md={4} className={classes.photosContainer}>
                    <img
                      key={photo.media_url}
                      src={photo.media_url}
                      className={classes.photos}
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        window.location = photo.permalink;
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={1} md={2} />
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Gallery);
