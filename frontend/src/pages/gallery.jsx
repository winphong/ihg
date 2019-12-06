import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import miscService from "../services/miscService";
import { withStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    margin: 5
  },
  banner: {
    height: "45vmax",
    textAlign: "center"
  },
  title: {
    color: "#C8B06B",
    marginTop: "1%",
    lineHeight: "120%",
    fontSize: "1000%"
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
                <Grid
                  item
                  container
                  xs={12}
                  alignItems="center"
                  style={{ height: "33vmax" }}
                >
                  <Grid
                    item
                    xs={6}
                    style={{
                      padding: "5%"
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
            <Grid container xs={8} style={{ minHeight: "30vh", zIndex: 1 }}>
              {photos.splice(1, 9).map(photo => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    style={{
                      padding: "3% 0 0 5%"
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
