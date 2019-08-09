import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

export default function ScheduleBox() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container>
        {/* Carnival colour */}
        {/* <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "green" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "white" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "yellow" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "maroon" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "orange" }}
        />
        <Grid
          item
          xs={12}
          sm={2}
          className={classes.bar}
          style={{ backgroundColor: "blue" }}
        /> */}
        <Grid
          item
          xs={12}
          sm={6}
          className={classes.bar}
          style={{ backgroundColor: "green" }}
        />
        <Grid
          item
          xs={12}
          sm={6}
          className={classes.bar}
          style={{ backgroundColor: "white" }}
        />
        <Grid item xs={12} sm={5} className={classes.center}>
          RH
        </Grid>
        <Grid item xs={12} sm={2} className={classes.center}>
          vs
        </Grid>
        <Grid item xs={12} sm={5} className={classes.center}>
          TH
        </Grid>
        <Grid item xs={12}>
          <Typography>Swimming F</Typography>
          <Typography>Time</Typography>
          <Typography>Venue</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    // backgroundColor: "beige",
    // border: "2px solid",
    padding: 10,
    zIndex: 1
  },
  bar: {
    backgroundColor: "red",
    height: 15,
    textAlign: "left"
  },
  center: {
    textAlign: "center"
  }
});
