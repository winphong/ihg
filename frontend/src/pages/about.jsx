import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import Calendar from "./../components/calendar";

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(3),
    textAlign: "center",
    margin: 5
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  hall: {
    margin: 20,
    border: 1,
    borderColor: "black",
    backgroundColor: "transparent"
  }
});

class About extends Component {
  state = {
    sports: [
      {
        name: "Volleyball",
        imgUrl: "https://cdn.britannica.com/81/198481-050-10CED2D9.jpg",
        description: "3-touch ball sports"
      },
      {
        name: "Basketball",
        imgUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/LeBron_James_Layup_%28Cleveland_vs_Brooklyn_2018%29.jpg",
        description: "Hard brown ball"
      },
      {
        name: "Touch Rugby",
        imgUrl: "https://ichef.bbci.co.uk/images/ic/640x360/p06jmlf8.jpg",
        description: "Contact sports"
      }
    ],
    selectedSport: {}
  };

  async componentDidMount() {
    this.setState({ selectedSport: this.state.sports[0] });
  }

  handleClick = sport => {
    this.setState({ selectedSport: sport });
  };

  render() {
    const { classes } = this.props;
    const { sports, selectedSport } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {/* About IHG */}
            <Paper className={classes.paper}>
              About IHG <br />
              Description...........
            </Paper>
          </Grid>
          {/* Hall of NUS */}
          <Grid item xs={12} className={classes.hall}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={3}>
                Hall of NUS
              </Grid>
              <Grid item xs={12} sm={9}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3} />
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Grid>

          {/* Sports Director */}
          <Grid item xs={12} className={classes.hall}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={9}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={3} />
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <img src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_81,h_111,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp" />
                    <p>Prince George's Park Residence</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                Hall of NUS
              </Grid>
            </Grid>
            <Divider />
          </Grid>
          {/* Sports */}
          <Grid item xs={12} sm={3}>
            SPORTS
          </Grid>
          <Grid item xs={12} sm={4}>
            <img style={{ width: "100%" }} src={selectedSport.imgUrl} />
            <Typography> {selectedSport.name} </Typography>
            <Typography> {selectedSport.description} </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container>
              {sports.map(sport => {
                return (
                  <Grid item xs={12} sm={6}>
                    <Button
                      style={{
                        backgroundColor: "transparent"
                      }}
                      disableTouchRipple="true"
                      disableRipple="true"
                      onClick={() => this.handleClick(sport)}
                    >
                      {sport.name}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
