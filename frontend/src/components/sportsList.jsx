import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function Card({ sports, selectedSport, handleSortBySport }) {
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <Grid item xs={6}>
        {sports.length >= 1 &&
          sports.slice(0, 9).map(sport => {
            return (
              <Typography
                className={classes.sports}
                onClick={() => handleSortBySport(sport)}
                variant="h1"
                style={{
                  color:
                    selectedSport.name === sport.name ? "#958F87" : "#D3DBD9"
                }}
              >
                {sport.name}
              </Typography>
            );
          })}
      </Grid>
      <Grid item xs={6}>
        {sports.length >= 1 &&
          sports.slice(9).map(sport => {
            return (
              <Typography
                className={classes.sports}
                onClick={() => handleSortBySport(sport)}
                variant="h1"
                style={{
                  color:
                    selectedSport.name === sport.name ? "#958F87" : "#D3DBD9"
                }}
              >
                {sport.name}
              </Typography>
            );
          })}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  sports: {
    cursor: "pointer",
    fontSize: "140%",
    marginBottom: "2vmax"
  }
});
