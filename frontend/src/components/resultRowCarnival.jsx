import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";

export default function ResultRowCarnival({ schedule }) {
  const classes = useStyles();

  const sortedHall = schedule.hall[0].score
    ? schedule.hall.sort((a, b) => {
        return a.score >= b.score ? 1 : -1;
      })
    : schedule.hall.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      });

  return (
    <Grid container className={classes.container}>
      <Grid item xs={true} sm={3} style={{ textAlign: "left" }}>
        <Grid container style={{ marginBottom: "1%" }}>
          {sortedHall.map(hall => {
            return (
              <Grid
                item
                xs={true}
                sm={true}
                className={classes.bar}
                style={{
                  backgroundColor: hall.colourCode,
                  border:
                    hall.colourCode === "#ffffff" ? "0.005vh solid black" : ``
                }}
              />
            );
          })}
          <Grid item sm={8} />
        </Grid>
        <strong>
          {schedule.sport} {schedule.stage}
        </strong>
      </Grid>
      <Grid
        item
        xs={true}
        sm={4}
        style={{ marginTop: "1vh", textAlign: "left" }}
      >
        {dateformat(new Date(schedule.startTime), "HHMM'h'")}, {schedule.venue}
      </Grid>
      <Grid item sm={5}>
        <Grid container>
          {sortedHall.map((hall, index) => {
            return (
              <Grid item xs={true} sm={12 / sortedHall.length}>
                <div
                  style={{
                    fontWeight: hall.score
                      ? index === 0
                        ? "bold"
                        : "normal"
                      : "normal"
                  }}
                >
                  {hall.abbreviation}
                  <br />
                  {hall.score && (
                    <div>
                      {hall.score}
                      {index === 0 ? "st" : ""}
                      {index === 1 ? "nd" : ""}
                      {index === 2 ? "rd" : ""}
                      {index > 2 ? "th" : ""}
                    </div>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    margin: "1vh",
    height: "3.5vh"
    // backgroundColor: "gold"
  },
  bar: {
    height: "0.6vh"
  },
  winner: {
    marginTop: "1vh",
    fontWeight: "bold"
    // backgroundColor: "pink"
  },
  neutral: {
    marginTop: "1vh"
    // backgroundColor: "beige"
  }
});
