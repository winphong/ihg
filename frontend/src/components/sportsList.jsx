import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";

export default function Card({ sports, selectedSport }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        {sports.length >= 1 &&
          sports.slice(0, 9).map(sport => {
            return (
              <p
                onClick={() => this.handleSortBySport(sport)}
                style={{
                  color: selectedSport.name == sport.name ? "black" : "grey",
                  cursor: "pointer"
                }}
              >
                {sport.name}
              </p>
            );
          })}
      </Grid>
      <Grid item xs={6}>
        {sports.length >= 1 &&
          sports.slice(9).map(sport => {
            return <p> {sport.name}</p>;
          })}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({});