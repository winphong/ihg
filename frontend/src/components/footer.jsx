import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "brown",
    marginTop: theme.spacing(8)
  },
  footer: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3)
    },
    padding: theme.spacing(5),
    // marginTop: "auto",
    backgroundColor: "black"
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "3vw"
    },
    color: "#C8B06B",
    fontFamily: "TheNextFont"
  },

  subTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "3vw"
    },
    color: "white"
  },
  logo: {
    [theme.breakpoints.up("md")]: {
      marginTop: "-3vh"
    },
    marginTop: "-2vh"
  },
  backToTop: {
    [theme.breakpoints.down("md")]: {
      marginTop: "2vh"
    },
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  backToTopText: {
    [theme.breakpoints.down("md")]: {
      fontSize: "3vw"
    },
    color: "silver",
    fontFamily: "TheNextFont"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        {/* <Container maxWidth="sm" style={{ textAlign: "center" }}>
          <Typography variant="body">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container> */}
        <Grid container>
          <Grid item xs={0} md={1} />
          {/* Conveninv */}
          {/* <Grid item container xs={6} md={5}> */}
          <Grid item xs={2} md={1}>
            <img src="./Logo.png" width="100%" className={classes.logo} />
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography className={classes.title}>
              IHG Convening 19/20
            </Typography>
            <Typography className={classes.subTitle}>
              Firstname Lastname
            </Typography>
            <Typography className={classes.subTitle}>
              Firstname Lastname
            </Typography>
          </Grid>
          {/* </Grid> */}
          {/* Raffles Hall */}
          <Grid
            item
            xs={5}
            md={4}
            style={{
              paddingLeft: "5vw"
            }}
          >
            <Typography className={classes.title}>NUS Raffles Hall</Typography>
            <Typography className={classes.subTitle}>
              19 Kent Ridge Crescent
            </Typography>
            <Typography className={classes.subTitle}>
              Singapore 119278
            </Typography>
            <Typography className={classes.subTitle}>+65 6516 2078</Typography>
          </Grid>
          {/* Back to top */}
          <Grid item xs={12} md={2} className={classes.backToTop}>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <KeyboardArrowUpIcon
                style={{
                  fill: "silver",
                  margin: "0 1vmin"
                }}
              />
              <Typography className={classes.backToTopText}>
                BACK TO TOP
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
