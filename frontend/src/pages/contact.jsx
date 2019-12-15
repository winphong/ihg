import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import miscService from "../services/miscService";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CSSTransition } from "react-transition-group";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "350%",
      marginTop: "25%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "15%"
    },
    fontSize: "1000%",
    marginTop: "5%",
    marginBottom: "5%"
  },
  buttonColumn: {
    textAlign: "center",
    verticalAlign: "middle",
    height: "100%"
  },
  container: {
    [theme.breakpoints.down("sm")]: {},
    // height: "90vh",
    textAlign: "center"
  },
  button: {
    textAlign: "left"
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "200%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "250%"
    },
    color: "white"
  },
  contactInformation: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "150%"
    },
    fontStyle: "italic",
    color: "#958F87"
  },
  // CSS for TextField - start
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      color: "#C8B06B",
      borderColor: `#C8B06B !important`
    }
  },
  cssFocused: {},
  notchedOutline: {},
  label: {
    "&$focusedLabel": {
      color: "#C8B06B"
    }
  },
  focusedLabel: {}
  // CSS for TextField - end
}));

export default function ResultsTable() {
  window.scrollTo({ top: 0 });
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [enquiry, setEnquiry] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  function handleChange({ currentTarget: input }) {
    const newEnquiry = { ...enquiry };
    newEnquiry[input.name] = input.value;
    setEnquiry(newEnquiry);
  }

  async function handleSubmit() {
    await miscService.createNewEnquiry(enquiry);
  }

  return (
    <React.Fragment>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Typography variant="h1" className={classes.title}>
              CONTACT US
            </Typography>
          </Grid>
          <Grid item xs={1} md={3} />
          <Grid item xs={10} md={6}>
            <form>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    id="name"
                    name="name"
                    label="Name"
                    margin={isMobile ? "none" : "normal"}
                    size="small"
                    onChange={handleChange}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focusedLabel
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    id="email"
                    name="email"
                    label="Email"
                    margin={isMobile ? "none" : "normal"}
                    size="small"
                    onChange={handleChange}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focusedLabel
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    id="subject"
                    name="subject"
                    label="Subject"
                    margin={isMobile ? "none" : "normal"}
                    fullWidth
                    size="small"
                    // inputProps={{
                    //   style: {
                    //     height: "10px"
                    //   }
                    // }}
                    onChange={handleChange}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focusedLabel
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    id="message"
                    name="message"
                    label="Message"
                    margin={isMobile ? "none" : "normal"}
                    size="small"
                    onChange={handleChange}
                    multiline
                    rows={5}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focusedLabel
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#C8B06B"
                    }}
                  >
                    <Typography variant="h1" className={classes.buttonText}>
                      Submit
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.contactInformation}>
                    or email us at ihgcovening@gmail.com
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

// export default withStyles(styles)(Contact);
