// update score form
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import miscService from "../../services/miscService";
import { Redirect } from "react-router-dom";
//
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";

const styles = (theme) => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "20%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "11%",
    },
    color: "#C8B06B",
    fontSize: "1000%",
    marginTop: "6%",
    marginBottom: "3%",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      height: "60vh",
    },
    height: "70vh",
    textAlign: "center",
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "200%",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "250%",
    },
    color: "white",
    padding: "1% 0",
  },
});

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  async componentDidMount() {}

  handleChange = ({ target: input }) => {
    const credentials = { ...this.state.credentials };
    credentials[input.name] = input.value;
    this.setState({ credentials });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await miscService.login(this.state.credentials);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error && error.status === 400) {
        // console.log(error.data);
        this.handleOpen();
      } else {
        // console.log("Unexpected error");
        this.handleOpen();
      }
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state.credentials;
    if (miscService.getCurrentAdmin()) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12} className={{}}>
              <Typography variant="h1" className={classes.title}>
                {" "}
                LOGIN{" "}
              </Typography>
            </Grid>
            <Grid item xs={1} md={4} />
            <Grid item xs={10} md={4}>
              <form>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      name="username"
                      label="Username"
                      fullWidth
                      onChange={this.handleChange}
                      className={classes.formControl}
                      value={username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      type="password"
                      required
                      name="password"
                      label="Password"
                      fullWidth
                      onChange={this.handleChange}
                      className={classes.formControl}
                      value={password}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.formControl}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={this.handleSubmit}
                      style={{
                        backgroundColor: "#C8B06B",
                      }}
                    >
                      <Typography variant="h1" className={classes.buttonText}>
                        Login
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={4} />
          </Grid>
        </CSSTransition>
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: "#d32f2f",
            }}
            message={
              <span id="client-snackbar" className={classes.message}>
                Invalid username or password.
              </span>
            }
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <ErrorIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Login);
