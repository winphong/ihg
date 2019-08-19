import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import miscService from "../services/miscService";

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
    height: "100%",
    backgroundColor: "pink"
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
    console.log(photos);
    this.setState({ photos });
  }

  render() {
    const { classes } = this.props;
    const { photos } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <p> Ranking as of {new Date().toLocaleDateString()}</p>
            </Paper>
          </Grid>
          {photos.map(photo => {
            return (
              <Grid item xs={true} sm={4}>
                <img src={photo.images.standard_resolution.url} />
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Gallery);
