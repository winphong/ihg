import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ScheduleBox from "./scheduleBox";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";

export default function Calendar() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container>
        <Grid item xs={12} sm={1}>
          Back
        </Grid>
        <Grid item xs={12} sm={10}>
          Week X
        </Grid>
        <Grid item xs={12} sm={1}>
          Next
        </Grid>
        {/* Days row */}
        <Grid container>
          <Grid item xs={true} sm={12 / 7}>
            Sunday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>{" "}
          <Grid item xs={true} sm={12 / 7} className={classes}>
            Monday
            <table style={{ width: "100%" }}>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={true} sm={12 / 7} className={classes}>
            Tuesday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={true} sm={12 / 7}>
            Wednesday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={true} sm={12 / 7}>
            Thursday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={true} sm={12 / 7}>
            Friday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
          <Grid item xs={true} sm={12 / 7}>
            Saturday
            <table style={{ width: "100%" }}>
              <tr style={{}}>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
              <tr>
                <td className={classes.table}>
                  <ScheduleBox sport={"this"} />
                </td>
              </tr>
            </table>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    // border: "inset beige",
    backgroundColor: "grey",
    padding: 0
  },
  table: {
    border: "1px solid ivory",
    margin: -2,
    width: "100%"
  }
});
