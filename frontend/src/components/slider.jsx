import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Card from "../components/card";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Slider({ schedules }) {
  const classes = useStyles();
  const [previous, setPrevious] = React.useState(schedules.length - 1);
  const [current, setCurrent] = React.useState(0);
  const [next, setNext] = React.useState(1);
  const [margin, setMargin] = React.useState(
    schedules.length >= 3 ? 3 : schedules.length
  );

  function handleBack() {
    const prev = previous;
    const curr = current;
    const nxt = next;
    setPrevious(prev !== 0 ? prev - 1 : schedules.length - 1);
    setCurrent(prev);
    setNext(curr);
  }

  function handleNext() {
    const prev = previous;
    const curr = current;
    const nxt = next;
    setPrevious(curr);
    setCurrent(nxt);
    setNext(nxt !== schedules.length - 1 ? nxt + 1 : 0);
  }

  return (
    <Grid container style={{ display: "flex", alignItems: "center" }}>
      <Grid
        item
        xs={true}
        sm={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button onClick={handleBack}>Back</Button>
      </Grid>
      <Grid item xs={true} sm={10}>
        <TransitionGroup>
          <CSSTransition key={current} timeout={400} classNames="slide">
            <Grid
              container
              spacing={0}
              className={classes.container}
              style={{
                position: "absolute",
                width: "83.33%"
              }}
            >
              <Grid item xs={12} sm={12 / margin} className={classes.container}>
                {/* {previous  && ( */}
                <Card schedule={schedules[previous]} size="small" />
                {/* )} */}
              </Grid>
              <Grid item xs={12} sm={12 / margin} className={classes.container}>
                <Card
                  schedule={schedules[current]}
                  center={true}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12 / margin} className={classes.container}>
                {/* {next < schedules.length && ( */}
                <Card schedule={schedules[next]} size="small" />
                {/* )} */}
              </Grid>
            </Grid>
          </CSSTransition>
        </TransitionGroup>
      </Grid>
      <Grid item xs={true} sm={1}>
        <Button onClick={handleNext}>Next</Button>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({});
