import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "brown",
    marginTop: theme.spacing(8),
  },
  footer: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
    padding: theme.spacing(5),
    backgroundColor: "black",
  },
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "90%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "110%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "150%",
    },
    color: "#C8B06B",
    fontFamily: "TheNextFont",
  },

  subTitle: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "80%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "100%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "130%",
    },
    color: "white",
  },
  logo: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "-3vh",
    },
    marginTop: "-2vh",
  },
  backToTop: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "2vmax",
    },
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  backToTopText: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "90%",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "110%",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "150%",
    },
    color: "silver",
    fontFamily: "TheNextFont",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Grid container>
          <Grid item xs={2} md={1}>
            <img
              src="./Logo.png"
              width="100%"
              className={classes.logo}
              alt="ihg-logo"
            />
          </Grid>
          <Grid item xs={5} md={4}>
            <Typography className={classes.title}>
              IHG Convening {process.env.REACT_APP_ACADEMIC_YEAR}
            </Typography>
          </Grid>
          {/* </Grid> */}
          {/* Raffles Hall */}
          <Grid
            item
            xs={5}
            md={4}
            style={{
              paddingLeft: "5vw",
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
          <Grid item xs={12} md={3} className={classes.backToTop}>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <KeyboardArrowUpIcon
                style={{
                  fill: "silver",
                  margin: "0 1vmin",
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
