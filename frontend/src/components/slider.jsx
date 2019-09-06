import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../components/card";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";

export default function Slider({ schedules }) {
  const classes = useStyles();
  const [previous, setPrevious] = useState(
    schedules.length > 1 ? schedules.length - 1 : 0
  );
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(schedules.length > 1 ? 1 : 0);
  const [margin, setMargin] = useState(
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
    <Grid container>
      <Grid item xs={true} sm={1}>
        <IconButton onClick={handleBack} disabled={schedules.length == 1}>
          <KeyboardArrowLeft />
        </IconButton>
      </Grid>
      <Grid item xs={true} sm={10}>
        <TransitionGroup>
          <CSSTransition key={current} timeout={400} classNames="slide">
            <Grid
              container
              spacing={8}
              style={{
                position: "absolute",
                width: "90%",
                marginTop: "-9%"
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                style={{ height: "100%", width: "100%" }}
              >
                {/* {previous  && ( */}
                {schedules.length >= 3 && (
                  <Card schedule={schedules[previous]} size="small" />
                )}
                {/* )} */}
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  height: "100%",
                  width: "100%"
                }}
              >
                <Card
                  schedule={schedules[current]}
                  center={true}
                  size="small"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  height: "100%",
                  width: "100%"
                }}
              >
                {/* {next < schedules.length && ( */}
                {schedules.length >= 3 && (
                  <Card schedule={schedules[next]} size="small" />
                )}
                {/* )} */}
              </Grid>
            </Grid>
          </CSSTransition>
        </TransitionGroup>
      </Grid>
      <Grid item xs={true} sm={1}>
        <IconButton onClick={handleNext} disabled={schedules.length == 1}>
          <KeyboardArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({});
