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
    [theme.breakpoints.down("md")]: {
      fontSize: "400%"
    },
    color: "#C8B06B",
    marginTop: "1%",
    lineHeight: "120%",
    fontSize: "1000%"
  },
  caption: {
    [theme.breakpoints.down("md")]: {
      fontSize: "90%"
    },
    color: "white",
    fontSize: "200%"
  },
  mainPhotoSuperContainer: {
    [theme.breakpoints.up("md")]: {
      height: "33vmax"
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "5%"
    }
  },
  mainPhotoContainer: {
    [theme.breakpoints.up("md")]: {
      padding: "5%"
    }
    // backgroundColor: "beige"
  },
  mainPhoto: {
    [theme.breakpoints.down("md")]: {
      width: "16vmax",
      height: "16vmax",
      objectFit: "cover"
    },
    width: "100%"
  },
  photosContainer: {
    [theme.breakpoints.up("md")]: {},
    paddingTop: "3%",
    // border: "1px solid black",
    // backgroundColor: "pink",
    display: "flex",
    justifyContent: "center"
  },
  photos: {
    [theme.breakpoints.up("md")]: {
      width: "15vmax",
      height: "15vmax"
    },
    width: "10vmax",
    height: "10vmax",
    objectFit: "cover"
  },
  banner: {
    [theme.breakpoints.up("md")]: {
      height: "45vmax"
    },

    textAlign: "center"
  }
});

class Gallery extends Component {
  state = {
    photos: []
  };

  async componentDidMount() {
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
          <Grid container>
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
              />
            </Grid>
            <Grid
              container
              style={{
                zIndex: 1
              }}
            >
              {/* Top segment */}
              <Grid item xs={1} md={2} />
              <Grid item container className={classes.banner} xs={10} md={8}>
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
                  className={classes.mainPhotoSuperContainer}
                >
                  <Grid item xs={6} className={classes.mainPhotoContainer}>
                    {photos.length > 0 && (
                      <img
                        src={photos[0].images.standard_resolution.url}
                        className={classes.mainPhoto}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: "left" }}>
                    <Typography>
                      <Link
                        href="https://www.instagram.com/ihgofficial"
                        style={{
                          color: "#C8B06B",
                          fontSize: "2vw",
                          fontWeight: "bold"
                        }}
                      >
                        @ihgofficial
                      </Link>
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "2vw",
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
            </Grid>
            {/* Bottom segment */}
            <Grid item xs={1} md={2} />
            <Grid
              container
              xs={10}
              md={8}
              style={{ minHeight: "30vmax", zIndex: 1 }}
            >
              {photos.splice(1, 9).map(photo => {
                return (
                  <Grid item xs={4} md={4} className={classes.photosContainer}>
                    <img
                      key={photo.images.standard_resolution.url}
                      src={photo.images.standard_resolution.url}
                      className={classes.photos}
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
