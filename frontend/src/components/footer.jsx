import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "brown",
    marginTop: theme.spacing(8)
  },
  footer: {
    padding: theme.spacing(5),
    marginTop: "auto",
    backgroundColor: "black"
  },
  title: {
    color: "#C8B06B",
    fontFamily: "TheNextFont"
  },
  subTitle: {
    color: "white"
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
          <Grid item xs={1} />
          <Grid item container xs={5}>
            <Grid item xs={2}>
              <img
                src="./logo.png"
                width="100%"
                style={{ marginTop: "-3vh" }}
              />
            </Grid>
            <Grid item xs={8}>
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
          </Grid>
          <Grid item xs={5}>
            <Typography className={classes.title}>NUS Raffles Hall</Typography>
            <Typography className={classes.subTitle}>
              19 Kent Ridge Crescent
            </Typography>
            <Typography className={classes.subTitle}>
              Singapore 119278
            </Typography>
            <Typography className={classes.subTitle}>+65 6516 2078</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography className={classes.title}>BACK TO TOP</Typography>
            </Button>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
