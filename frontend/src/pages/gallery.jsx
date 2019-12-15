import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import miscService from "../services/miscService";
import { withStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";

const styles = theme => ({
  // paper: {
  //   paddingTop: theme.spacing(1),
  //   paddingBottom: theme.spacing(1),
  //   textAlign: "center",
  //   margin: 5
  // },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "25%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "15%"
    },
    lineHeight: "120%",
    fontSize: "1000%",
    marginTop: "6%"
  },
  caption: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "80%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "110%"
    },
    color: "white",
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
    [theme.breakpoints.only("xs")]: {
      height: "18vmax"
    },
    [theme.breakpoints.only("sm")]: {
      height: "25vmax"
    },
    [theme.breakpoints.only("md")]: {
      height: "300px"
    },
    [theme.breakpoints.up("lg")]: {
      height: "30vmax"
    },
    objectFit: "cover",
    margin: "5% 0"
  },
  mainPhoto: {
    [theme.breakpoints.only("xs")]: {
      width: "18vmax",
      height: "18vmax"
    },
    [theme.breakpoints.only("sm")]: {
      width: "25vmax",
      height: "25vmax"
    },
    [theme.breakpoints.only("md")]: {
      width: "300px",
      height: "300px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "30vmax",
      height: "30vmax"
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
  banner: {
    textAlign: "center"
  }
});

class Gallery extends Component {
  state = {
    photos: []
  };

  async componentDidMount() {
    window.scrollTo({ top: 0 });
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
            <Grid
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
            </Grid>
            <Grid item xs={1} md={2} />
            {/* Top segment */}
            <Grid
              item
              container
              className={classes.banner}
              style={{
                zIndex: 1
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
                      src={photos[0].images.standard_resolution.url}
                      className={classes.mainPhoto}
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        window.location = photos[0].link;
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} style={{ textAlign: "left" }}>
                  <Typography>
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
                        className={classes.caption}
                        style={{
                          color: "#C8B06B"
                        }}
                      >
                        @ihgofficial
                      </Typography>
                    </Link>
                  </Typography>
                  <Typography
                    className={classes.caption}
                    style={{
                      // fontSize: "2vw",
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    Summary for yesterday and schedule for today!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2} />
            <Grid item xs={1} md={2} />
            {/* Bottom segment */}
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
                      key={photo.images.standard_resolution.url}
                      src={photo.images.standard_resolution.url}
                      className={classes.photos}
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        window.location = photo.link;
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
