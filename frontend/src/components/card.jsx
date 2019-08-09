import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export default function Card({ sport }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid container spacing={0} className={classes.card}>
        <Grid item xs={6}>
          <img src={sport.hall[0].imgUrl} />
          <p> {sport.hall[0].name} </p>
        </Grid>

        <Grid item xs={6}>
          <img src={sport.hall[1].imgUrl} />
          <p> {sport.hall[1].name} </p>
        </Grid>
        <Grid item xs={12}>
          {sport.sport} <br /> {sport.startTime}, {sport.venue},
          {sport.startTime}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  card: {
    height: 400,
    textAlign: "center",
    margin: 5
  }
});
