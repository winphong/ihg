import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import miscService from "../services/miscService";
import { CSSTransition } from "react-transition-group";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    margin: 5
  },
  banner: {
    height: "41vw",
    textAlign: "center"
  },
  title: {
    color: "#C8B06B",
    marginTop: "1vw",
    lineHeight: "120%"
  },
  caption: {
    color: "white",
    fontSize: "1.5vw"
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
            {/* Top segment */}
            <Grid container>
              <Grid item xs={12}>
                <img
                  src="./home.jpg"
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: -1,
                    opacity: 0.3
                  }}
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item container className={classes.banner} xs={8}>
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
                <Grid item container xs={12} alignItems="center">
                  <Grid
                    item
                    xs={6}
                    style={{
                      padding: "3.5vmax",
                      height: "34vmax"
                    }}
                  >
                    {photos.length > 0 && (
                      <img
                        src={photos[0].images.standard_resolution.url}
                        style={{
                          width: "100%"
                          // height: "100%"
                        }}
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
              <Grid item xs={2} />
            </Grid>
            {/* Bottom segment */}
            <Grid item xs={2} />
            <Grid container xs={8} style={{ minHeight: "30vh" }}>
              {photos.splice(1, 9).map(photo => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      padding: "2vmax 3vmax",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      key={photo.images.standard_resolution.url}
                      src={photo.images.standard_resolution.url}
                      style={{
                        width: "15vmax",
                        height: "15vmax",
                        // height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Gallery);
