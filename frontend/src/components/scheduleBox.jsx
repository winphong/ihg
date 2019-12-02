import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import dateformat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import { Info } from "@material-ui/icons";

export default function ScheduleBox({ schedule, isAdmin }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {/* Carnival colour */}
      {schedule.stage === "Carnival" && (
        <Grid item container xs={12}>
          <Grid item container xs={12}>
            {schedule.halls.map(({ colourCode }) => {
              return (
                <Grid
                  item
                  xs={true}
                  className={classes.bar}
                  style={{
                    backgroundColor: colourCode,
                    border:
                      colourCode === "#ffffff"
                        ? "0.05px solid #252527"
                        : `0.05px solid ${colourCode}`
                  }}
                />
              );
            })}
          </Grid>
          <Grid item container xs={12}>
            {schedule.halls.map(hall => {
              return (
                <Grid item xs={true}>
                  <Typography>{hall.abbreviation}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
      {schedule.stage !== "Carnival" && (
        <Grid item container xs={12}>
          <Grid
            item
            xs={6}
            className={classes.bar}
            style={{
              backgroundColor: schedule.halls[0].colourCode,
              border:
                schedule.halls[0].colourCode === "#ffffff"
                  ? "0.05px solid #252527"
                  : `0.05px solid ${schedule.halls[0].colourCode}`
              // transform:
              //   schedule.halls[0].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
          <Grid
            item
            xs={6}
            className={classes.bar}
            style={{
              backgroundColor: schedule.halls[1].colourCode,
              border:
                schedule.halls[1].colourCode === "#ffffff"
                  ? "0.05px solid #252527"
                  : `0.05px solid ${schedule.halls[1].colourCode}`
              // transform:
              //   schedule.halls[1].colourCode === "#ffffff" ? "scaleY(1.2)" : ""
            }}
          />
          <Grid item xs={5}>
            <Typography>{schedule.halls[0].abbreviation}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>vs</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{schedule.halls[1].abbreviation}</Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        {isAdmin && (
          <Link
            style={{
              color: "#0074d9",
              cursor: "pointer",
              textDecoration: "none"
            }}
            to={{
              pathname: `/admin/schedule/${schedule._id}`,
              data: schedule // your data array of objects
            }}
          >
            <Typography>{schedule.sport}</Typography>
          </Link>
        )}
        {!isAdmin && <Typography>{schedule.sport}</Typography>}
        <Typography>
          {dateformat(new Date(schedule.startTime), "dd'th' mmm, HHMM'h'")}
        </Typography>
        <Typography>{schedule.venue}</Typography>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  container: {
    textAlign: "center",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    marginBottom: "10%",
    padding: "7%",
    [theme.breakpoints.up("sm")]: {
      // width: "100%"
    }
  },
  bar: {
    height: "10px"
  }
});

const useStyles = makeStyles(styles);
