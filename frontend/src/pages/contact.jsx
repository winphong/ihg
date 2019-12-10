import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import miscService from "../services/miscService";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CSSTransition } from "react-transition-group";

const styles = theme => ({
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "350%"
    },
    fontSize: "1000%",
    marginTop: "1%"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  container: {
    [theme.breakpoints.down("md")]: {
      height: "70vh"
    },
    height: "90vh",
    textAlign: "center"
  },
  button: {
    textAlign: "left"
  },
  buttonText: {
    [theme.breakpoints.down("md")]: {
      fontSize: "200%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "300%"
    },
    color: "white"
  },
  contactInformation: {
    [theme.breakpoints.down("md")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "200%"
    },
    fontStyle: "italic",
    color: "#958F87"
  }
});

class Contact extends Component {
  state = {
    enquiry: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  };

  // async componentDidMount() {
  //   let { data: enquiries } = await miscService.getAllEnquiries();
  // }

  handleChange = ({ currentTarget: input }) => {
    const enquiry = { ...this.state.enquiry };
    enquiry[input.name] = input.value;
    this.setState({ enquiry });
  };

  handleSubmit = async () => {
    const enquiry = await miscService.createNewEnquiry(this.state.enquiry);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.title}>
                {" "}
                CONTACT US{" "}
              </Typography>
            </Grid>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <form>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      id="name"
                      name="name"
                      label="Name"
                      margin={"normal"}
                      fullWidth
                      size="small"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      id="email"
                      name="email"
                      label="Email"
                      margin="normal"
                      fullWidth
                      size="small"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      id="subject"
                      name="subject"
                      label="Subject"
                      margin="normal"
                      fullWidth
                      // size="small"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      id="message"
                      name="message"
                      label="Message"
                      margin="normal"
                      fullWidth
                      size="small"
                      multiline
                      onChange={this.handleChange}
                      rows={5}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={this.handleSubmit}
                      margin="normal"
                    >
                      <Typography variant="h1" className={classes.buttonText}>
                        Submit
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.contactInformation}>
                      or email us @ ihgcovening@gmail.com{" "}
                    </Typography>
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

export default withStyles(styles)(Contact);
