import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dateformat from "dateformat";
import { useMediaQuery } from "react-responsive";

export default function ResultRowCarnival({ schedule }) {
  const classes = useStyles();

  const sortedHall = schedule.hall[0].score
    ? schedule.hall.sort((a, b) => {
        return a.score >= b.score ? 1 : -1;
      })
    : schedule.hall.sort((a, b) => {
        return a.name >= b.name ? 1 : -1;
      });
  const isLaptop = useMediaQuery({ minDeviceWidth: 960 });

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        xs={7}
        md={3}
        style={{ textAlign: "left", marginLeft: "2%" }}
      >
        {sortedHall.map(hall => {
          return (
            <Grid
              item
              xs={1}
              className={classes.bar}
              style={{
                backgroundColor: hall.colourCode,
                border:
                  hall.colourCode === "#ffffff" ? "0.005vh solid black" : ``
              }}
            />
          );
        })}
      </Grid>

      <Grid item container xs={12} style={{ textAlign: "center" }}>
        <Grid
          item
          xs={5}
          md={3}
          style={{ textAlign: "left", paddingLeft: "2%" }}
        >
          <strong>
            {schedule.sport} {schedule.stage}
          </strong>
        </Grid>
        {isLaptop && (
          <Grid
            item
            xs={4}
            md={4}
            style={{ textAlign: "left", paddingLeft: "2%" }}
          >
            {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
            {schedule.venue}
          </Grid>
        )}
        <Grid item container xs={7} md={5} style={{ textAlign: "center" }}>
          {sortedHall.map((hall, index) => {
            return (
              <Grid
                item
                xs={true}
                // sm={12 / sortedHall.length}
              >
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
        {!isLaptop && (
          <Grid item xs={12} style={{ textAlign: "left", paddingLeft: "2%" }}>
            {dateformat(new Date(schedule.startTime), "HHMM'h'")},{" "}
            {schedule.venue}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center"
    // backgroundColor: "gold"
  },
  bar: {
    height: "0.6vh",
    margin: "1.5% 0"
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
