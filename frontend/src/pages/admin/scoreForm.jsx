// update score form
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import scheduleService from "../../services/scheduleService";
//
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "20%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "11%"
    },
    color: "#C8B06B",
    fontSize: "1000%",
    marginTop: "6%",
    marginBottom: "3%"
  },
  container: {
    textAlign: "center"
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "200%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "250%"
    },
    color: "white",
    padding: "1% 0"
  }
});

class ScoreForm extends Component {
  state = {
    schedule: {
      halls: []
    },
    id: this.props.match.params.id,
    sucess: false
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
    await scheduleService
      .updateScore(this.state.id, this.state.schedule)
      .then(() => {
        this.setState({ success: true });
        this.handleOpen();
      })
      .catch(() => this.handleOpen());
  };

  handleClose = () => {
    this.setState({ open: false });
    if (this.state.success) this.props.history.push("/results");
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { schedule, success } = this.state;
    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12} className={{}}>
              <Typography variant="h1" className={classes.title}>
                {" "}
                SCORE{" "}
              </Typography>
            </Grid>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
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
                      variant="contained"
                      onClick={this.handleSubmit}
                      style={{
                        backgroundColor: "#C8B06B"
                      }}
                    >
                      <Typography variant="h1" className={classes.buttonText}>
                        UPDATE SCORE
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
        </CSSTransition>
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: success ? green[600] : "#d32f2f"
            }}
            message={
              <span id="client-snackbar" className={classes.message}>
                {success
                  ? "Succesfully updated!"
                  : "An error has occured. Try again."}
              </span>
            }
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.handleClose}
              >
                {success ? (
                  <CheckCircleIcon className={classes.icon} />
                ) : (
                  <ErrorIcon className={classes.icon} />
                )}
              </IconButton>
            ]}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ScoreForm);
