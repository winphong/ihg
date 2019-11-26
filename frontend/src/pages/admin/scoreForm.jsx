// update score form
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import scheduleService from "../../services/scheduleService";

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

class ScoreForm extends Component {
  state = {
    schedule: {
      halls: []
    },
    id: this.props.match.params.id
  };

  async componentDidMount() {
    const response = await scheduleService.getSchedule(this.state.id);
    this.setState({ schedule: response.data });
  }

  handleChange = ({ target: input }, index) => {
    const schedule = { ...this.state.schedule };
    schedule.halls[index][input.name] = input.value;
    this.setState({ schedule });
  };

  handleSubmit = async () => {
    await scheduleService.updateScore(this.state.id, this.state.schedule);
  };

  render() {
    const { classes } = this.props;
    const schedule = this.state.schedule;
    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12} className={{}}>
              <Typography className={classes.title}> SCORE </Typography>
            </Grid>
            <Grid item xs={1} md={4} />
            <Grid item xs={10} md={4}>
              <form>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name="sport"
                      label="Sport"
                      fullWidth
                      disabled
                      onChange={this.handleChange}
                      className={classes.formControl}
                      value={schedule ? schedule.sport : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name="gender"
                      label="Gender"
                      fullWidth
                      disabled
                      onChange={this.handleChange}
                      className={classes.formControl}
                      value={schedule ? schedule.gender : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name="stage"
                      label="Stage"
                      fullWidth
                      disabled
                      onChange={this.handleChange}
                      className={classes.formControl}
                      value={schedule ? schedule.stage : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {schedule.halls &&
                      schedule.halls.map((hall, index) => {
                        return (
                          <Grid container spacing={1} fullWidth key={hall.name}>
                            <Grid item xs={6}>
                              <TextField
                                variant="outlined"
                                required
                                name="hall"
                                label="Hall"
                                fullWidth
                                disabled
                                className={classes.formControl}
                                value={hall.name}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                variant="outlined"
                                type="number"
                                fullWidth
                                required
                                name="score"
                                label="Score"
                                onChange={event =>
                                  this.handleChange(event, index)
                                }
                                className={classes.formControl}
                                value={hall.score}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                  </Grid>
                  <Grid item xs={12} className={classes.formControl}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={this.handleSubmit}
                    >
                      UPDATE SCORE
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={4} />
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ScoreForm);
