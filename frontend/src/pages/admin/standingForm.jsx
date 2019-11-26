// update standing form
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import scheduleService from "../../services/scheduleService";
import hallService from "../../services/hallService";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    },
    fontSize: "1000%",
    fontWeight: "900",
    color: "#C8B06B"
  },
  container: {
    textAlign: "center"
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

class StandingForm extends Component {
  state = {
    halls: []
  };

  async componentDidMount() {
    const { data: halls } = await hallService.getAllHalls();
    console.log(halls);
    this.setState({ halls });
  }

  handleChange = ({ target: input }, index) => {
    const halls = [...this.state.halls];
    const hall = halls[index];
    hall[input.name] = input.value;
    const totalPoint = Number(hall.femalePoint) + Number(hall.malePoint);
    hall.totalPoint = totalPoint;
    this.setState({ halls });
  };

  handleSubmit = async () => {
    console.log(this.state.halls);
  };

  render() {
    const { classes } = this.props;
    const halls = this.state.halls;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12} className={{}}>
              <Typography className={classes.title}> STANDINGS </Typography>
            </Grid>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <form>
                <Grid container item alignItems="center">
                  {halls.length > 0 &&
                    halls.map((hall, index) => {
                      return (
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          key={hall.name}
                        >
                          <Grid item xs={3}>
                            <TextField
                              variant="outlined"
                              required
                              disabled
                              name="hall"
                              label="Hall"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.formControl}
                              value={hall.name}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              variant="outlined"
                              type="number"
                              required
                              name="femalePoint"
                              label="Female"
                              fullWidth
                              onChange={e => this.handleChange(e, index)}
                              className={classes.formControl}
                              value={hall.femalePoint}
                              inputProps={{
                                style: { textAlign: "center" }
                              }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              variant="outlined"
                              type="number"
                              required
                              name="malePoint"
                              label="Male"
                              fullWidth
                              onChange={e => this.handleChange(e, index)}
                              className={classes.formControl}
                              value={hall.malePoint}
                              inputProps={{
                                style: { textAlign: "center" }
                              }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              variant="outlined"
                              type="number"
                              disabled
                              required
                              name="totalScore"
                              label="Total"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.formControl}
                              value={hall.totalPoint}
                              inputProps={{
                                style: { textAlign: "center" }
                              }}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={this.handleSubmit}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StandingForm);
