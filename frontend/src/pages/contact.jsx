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
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px"
    },
    fontSize: "1000%",
    fontWeight: "900",
    color: "#C8B06B"
  },
  // paper: {
  //   display: "flex",
  //   overflow: "auto",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   margin: theme.spacing(1),
  //   padding: theme.spacing(2),
  //   textAlign: "center"
  // },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%",
    backgroundColor: "pink"
  },
  container: {
    textAlign: "center"
  },
  button: {
    textAlign: "left"
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

  async componentDidMount() {
    let { data: enquiries } = await miscService.getAllEnquiries();
    console.log(enquiries);
  }

  handleChange = ({ currentTarget: input }) => {
    const enquiry = { ...this.state.enquiry };
    enquiry[input.name] = input.value;
    console.log(enquiry);
    this.setState({ enquiry });
  };

  handleSubmit = async () => {
    const enquiry = await miscService.createNewEnquiry(this.state.enquiry);
    console.log(enquiry);
  };

  render() {
    const { classes } = this.props;
    const { photos } = this.state;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <Typography className={classes.title}> CONTACT US </Typography>
            </Grid>
            <Grid item xs={true} sm={3} />
            <Grid item xs={true}>
              <form>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  className={classes.container}
                >
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      id="name"
                      name="name"
                      label="Name"
                      margin="normal"
                      fullWidth
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
                      multiline
                      onChange={this.handleChange}
                      rows={5}
                    />
                  </Grid>

                  <Grid item xs={4} className={classes.button}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={8} className={classes.button}>
                    <Typography style={{ marginLeft: "1vw" }}>
                      or email us @ ihgcovening@gmail.com{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={true} sm={3} />
          </Grid>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Contact);
