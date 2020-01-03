import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import miscService from "../services/miscService";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { CSSTransition } from "react-transition-group";
import useMediaQuery from "@material-ui/core/useMediaQuery";
//
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles(theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "350%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "420%"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "600%"
    },
    fontSize: "700%"
  },
  titleContainer: {
    [theme.breakpoints.only("xs")]: {
      paddingTop: "25%"
    },
    [theme.breakpoints.only("sm")]: {
      paddingTop: "13%"
    },
    [theme.breakpoints.only("md")]: {
      paddingTop: "8%"
    },
    paddingTop: "6%"
  },
  container: {
    [theme.breakpoints.only("sm")]: {
      height: "150vh"
    },
    [theme.breakpoints.only("md")]: {
      height: "81.4vh"
    },
    // mate 10 portrait
    ["@media(min-width: 315px) and (max-width: 325px)"]: {
      height: "90vh"
    },
    ["@media(min-width: 760px) and (max-width: 770px)"]: {
      height: "75.2vh"
    },
    ["@media(min-width: 1365px) and (max-width: 1366px)"]: {
      height: "76.5vh"
    },
    [theme.breakpoints.only("lg")]: {
      height: "70vh"
    },
    height: "73.35vh",
    textAlign: "center"
  },
  formName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "150%"
    },
    fontSize: "200%"
    // fontFamily: "TheNextFont"
  }
}));

const forms = [
  { fullName: "Indemnity Form.docx" },
  { fullName: "PAR-Q Form.docx" },
  { fullName: "Line-up List.zip" },
  { fullName: "Rules and Regulations.docx" },
  { fullName: "Match Score Form.docx" }
];

export default function Documents({ handleTabChange, props }) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    handleTabChange("/documents");
  }, []);
  const classes = useStyles();

  return (
    <React.Fragment>
      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
        <Grid container className={classes.container} alignItems="baseline">
          <Grid item xs={12} className={classes.titleContainer}>
            <Typography variant="h1" className={classes.title}>
              DOCUMENTS
            </Typography>
          </Grid>
          <Grid item xs={false} md={4} />
          <Grid item container xs={12} md={4} className={classes.formContainer}>
            {forms.map(form => {
              return (
                <Grid item xs={12}>
                  <Button
                    disableRipple
                    style={{ backgroundColor: "transparent" }}
                  >
                    <a
                      href={`/documents/${form.fullName}`}
                      download={`${form.fullName}`}
                      style={{
                        // textDecoration: "none",
                        color: "#252527"
                      }}
                    >
                      <Typography className={classes.formName}>
                        {form.fullName.split(".")[0]}
                      </Typography>
                    </a>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={false} md={4} />
        </Grid>
      </CSSTransition>
    </React.Fragment>
  );
}

// export default withStyles(styles)(Contact);
