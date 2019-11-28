import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import miscService from "../services/miscService";
import { CSSTransition } from "react-transition-group";

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    margin: 5
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  container: {
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
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Paper className={classes.paper}></Paper>
            </Grid>
            {photos.map(photo => {
              return (
                <Grid item xs={12} md={4}>
                  <img
                    src={photo.images.standard_resolution.url}
                    style={{ width: "100%" }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </React.Fragment>
      </CSSTransition>
    );
  }
}

export default withStyles(styles)(Gallery);
