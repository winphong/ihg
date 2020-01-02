// update standing form
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import hallService from "../../services/hallService";
//
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
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
    // height: "730px"
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

class StandingForm extends Component {
  state = {
    halls: [],
    success: false
  };

  async componentDidMount() {
    const { data: halls } = await hallService.getAllHalls();
    this.setState({ halls });
    // console.log(this.props.location.state);
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
    await hallService
      .updateStandings(this.state.halls)
      .then(() => {
        this.setState({ success: true });
        this.handleOpen();
      })
      .catch(() => this.handleOpen());
  };

  handleClose = () => {
    this.setState({ open: false });
    if (this.state.success) window.location = "/results";
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { halls, success } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12} className={{}}>
              <Typography variant="h1" className={classes.title}>
                {" "}
                STANDINGS{" "}
              </Typography>
            </Grid>
            <Grid item xs={1} md={2} />
            <Grid item xs={10} md={8}>
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
                      variant="contained"
                      onClick={this.handleSubmit}
                      style={{
                        backgroundColor: "#C8B06B"
                      }}
                    >
                      <Typography variant="h1" className={classes.buttonText}>
                        Update
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={2} />
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

export default withStyles(styles)(StandingForm);
