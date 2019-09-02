import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import sportService from "../services/sportService";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import miscService from "../services/miscService";
import path from "path";
import "../App.css";

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
    sports: [],
    selectedSport: {},
    imgUrl: ""
  };

  async componentDidMount() {
    const { data: sports } = await sportService.getAllSports();
    this.setState({
      sports,
      selectedSport: sports[0]
    });
    this.handleClick(sports[0]);
  }

  handleClick = async sport => {
    const photo = await miscService.getSportsPhoto(
      path.normalize(sport.imgUrl)
    );
    const file = new Blob([photo.data], { type: photo.data.type });
    const fileURL = URL.createObjectURL(file);
    this.setState({ imgUrl: fileURL, selectedSport: sport });
  };

  render() {
    const { classes } = this.props;
    const { sports, selectedSport } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
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
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/RH.png"
                      />
                      <p>Raffles Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/EH.png"
                      />
                      <p>Eusoff Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/TH.png"
                      />
                      <p> Temasek Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/SH.png"
                      />
                      <p> Sheares Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/KE.png"
                      />
                      <p> King Edward VII Hall</p>
                      <p />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/KR.png"
                      />
                      <p> Kent Ridge Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{
                          width: "8.5vw",
                          height: "17vh",
                          backgroundColor: "pink"
                        }}
                        src="/PGP.png"
                      />
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
                      <img src="https://static.wixstatic.com/media/75612e_8c531011a2024f2f899dfbd889ad82db~mv2.png/v1/fill/w_105,h_113,al_c,q_80,usm_0.66_1.00_0.01/RH%20logo.webp" />
                      <p>Raffles Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img src="https://static.wixstatic.com/media/75612e_a66243c354444b14af625f83064b7041~mv2.png/v1/fill/w_90,h_115,al_c,q_80,usm_0.66_1.00_0.01/EH%20logo.webp" />
                      <p>Eusoff Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img
                        style={{ width: "25%" }}
                        src="https://static.wixstatic.com/media/75612e_7a5b17ce7add491cb81c2e43d8762f58~mv2.jpg/v1/fill/w_202,h_278,al_c,q_80,usm_0.66_1.00_0.01/TH%20logo.webp"
                      />
                      <p> Temasek Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img src="https://static.wixstatic.com/media/75612e_bb53dd7f9e0b4ca39bc6fd9ff47de689~mv2.jpg/v1/fill/w_127,h_124,al_c,q_80,usm_0.66_1.00_0.01/SH%20logo.webp" />
                      <p> Sheares Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img src="https://static.wixstatic.com/media/75612e_ae210bf29d314e55a4b45690125682f3~mv2.png/v1/fill/w_99,h_109,al_c,q_80,usm_0.66_1.00_0.01/hall-crest-vector.webp" />
                      <p> King Edward VII Hall</p>
                      <p />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img src="https://static.wixstatic.com/media/75612e_008e77074a08483e87c5bdc12a28d648~mv2.jpg/v1/fill/w_121,h_113,al_c,q_80,usm_0.66_1.00_0.01/KR%20logo.webp" />
                      <p> Kent Ridge Hall</p>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <img src="https://static.wixstatic.com/media/75612e_0e7db723601d4b8ea7de9b44a12af805~mv2.png/v1/fill/w_122,h_122,al_c,q_80,usm_0.66_1.00_0.01/pgp.webp" />
                      <p>Prince George's Park Residence</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  Sports Directors
                </Grid>
              </Grid>
              <Divider />
            </Grid>
            {/* Sports */}
            <Grid item xs={true} sm={3}>
              SPORTS
            </Grid>
            <Grid item xs={true} sm={5}>
              <TransitionGroup>
                <CSSTransition
                  key={selectedSport._id}
                  timeout={400}
                  classNames="fade"
                >
                  <div style={{ position: "absolute" }}>
                    <img style={{ height: "30vh" }} src={this.state.imgUrl} />
                    <Typography> {selectedSport.name} </Typography>
                    <Typography> {selectedSport.description} </Typography>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </Grid>
            <Grid item xs={true} sm={3}>
              <Grid container>
                {sports.map(sport => {
                  return (
                    <Grid item xs={6}>
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
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
