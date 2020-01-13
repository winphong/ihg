// add or edit sports form
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { DateTimePicker } from "@material-ui/pickers";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import hallService from "../../services/hallService";
import scheduleService from "../../services/scheduleService";
import DeleteIcon from "@material-ui/icons/Delete";
import Hidden from "@material-ui/core/Hidden";
//
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import green from "@material-ui/core/colors/green";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  title: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "300%",
      marginTop: "20%"
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "500%",
      marginTop: "11%"
    },
    color: "#C8B06B",
    fontSize: "1000%",
    marginTop: "6%",
    marginBottom: "3%"
  },
  container: {
    textAlign: "center"
  },
  label: {
    backgroundColor: "#fafafa",
    padding: "0 5px"
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "200%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "250%"
    },
    color: "white",
    padding: "1% 0"
  },
  icon: {
    fontSize: 20
  },
  deleteIcon: {
    [theme.breakpoints.only("sm")]: {
      marginTop: "45%"
    },
    color: "#C8B06B",
    backgroundColor: "#f0f0f0",
    marginTop: "45%",
    transform: "scale(1.5)"
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const sports = [
  "Badminton",
  "Basketball",
  "Floorball",
  "Ultimate Frisbee",
  "Handball",
  "Netball",
  "Road Relay",
  "Sepak Takraw",
  "Soccer",
  "Softball",
  "Squash",
  "Swimming",
  "Table Tennis",
  "Tennis",
  "Touch Rugby",
  "Track & Field",
  "Volleyball"
];

class ScheduleForm extends Component {
  state = {
    schedule: {
      sport: "",
      halls: [],
      startTime: new Date("Feb 2020"),
      endTime: "",
      venue: "",
      gender: "",
      stage: ""
    },
    checkbox: {
      EH: false,
      TH: false,
      RH: false,
      KR: false,
      SH: false,
      KE7: false,
      PGP: false
    },
    halls: [],
    open: false,
    success: false,
    message: "An error has occured. Please try again!"
  };

  async componentDidMount() {
    const { data: halls } = await hallService.getAllHalls();
    const id = this.props.match.params.id;
    var schedule = { ...this.state.schedule };
    const checkbox = { ...this.state.checkbox };
    if (id) {
      schedule = (await scheduleService.getSchedule(id)).data;
      schedule.halls.map(hall => {
        checkbox[hall.abbreviation] = true;
      });
    }
    this.setState({ halls, schedule, checkbox });
  }

  handleChange = ({ target: input }) => {
    const schedule = { ...this.state.schedule };
    schedule[input.name] = input.value;
    this.setState({ schedule });
  };

  handleCheckboxChange = ({ target: input }) => {
    const checkbox = { ...this.state.checkbox };
    checkbox[input.value] = input.checked;
    this.setState({ checkbox });
  };

  handleDateChange = e => {
    const schedule = { ...this.state.schedule };
    schedule.startTime = e.$d;
    this.setState({ schedule });
  };

  handleRadioChange = ({ target: input }) => {
    const schedule = { ...this.state.schedule };
    schedule.gender = input.value;
    this.setState({ schedule });
  };

  handleSubmit = async () => {
    const schedule = { ...this.state.schedule };
    const checkbox = { ...this.state.checkbox };
    const id = this.props.match.params.id;
    const arr = [];
    for (const key in checkbox) {
      if (checkbox.hasOwnProperty(key)) {
        if (checkbox[key] == true) arr.push(key);
      }
    }
    schedule.halls = arr;
    schedule.endTime = schedule.startTime;
    if (id)
      await scheduleService
        .updateSchedule(id, schedule)
        .then(() => {
          this.setState({ success: true, message: "Successfully updated!" });
          this.handleOpen();
        })
        .catch(() => this.handleOpen());
    else
      await scheduleService
        .createSchedule(schedule)
        .then(() => {
          this.setState({ success: true, message: "Successfully created!" });
          this.handleOpen();
        })
        .catch(() => this.handleOpen());
  };

  handleDelete = async () => {
    await scheduleService
      .deleteSchedule(this.props.match.params.id)
      .then(() => {
        this.setState({ success: true, message: "Successfully deleted!" });
        this.handleOpen();
      })
      .catch(() => this.handleOpen());
  };

  handleClose = () => {
    this.setState({ open: false });
    if (this.state.success) window.location = "/schedule";
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { schedule, checkbox, halls, message, success } = this.state;
    const showDeleteButton = this.props.match.params.id;

    return (
      <React.Fragment>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Grid container className={classes.container}>
            <Hidden smDown>
              <Grid item md={2} />
            </Hidden>
            <Grid item xs={12} md={8}>
              <Typography variant="h1" className={classes.title}>
                SCHEDULE
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item md={2}>
                {showDeleteButton && (
                  <IconButton
                    className={classes.deleteIcon}
                    onClick={this.handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </Hidden>
            <Grid item xs={1} md={3} />
            <Grid item xs={10} md={6}>
              <form>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  className={classes.container}
                >
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel className={classes.label} required>
                        Sport
                      </InputLabel>
                      <Select
                        onChange={this.handleChange}
                        name="sport"
                        value={schedule.sport}
                        input={<OutlinedInput />}
                      >
                        <MenuItem value=""></MenuItem>
                        {sports.map(sport => {
                          return <MenuItem value={sport}>{sport}</MenuItem>;
                        })}
                      </Select>
                      {/* <FormHelperText>Auto width</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel
                        style={{
                          textAlign: "left"
                        }}
                        required
                      >
                        Halls
                      </FormLabel>
                      <FormGroup>
                        {halls.map(hall => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkbox[hall.abbreviation]}
                                  onChange={this.handleCheckboxChange}
                                  value={hall.abbreviation}
                                />
                              }
                              label={hall.name}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12} md={6}>
                    <Grid item xs={12}>
                      <DateTimePicker
                        label="Start Time"
                        inputVariant="outlined"
                        fullWidth
                        value={this.state.schedule.startTime}
                        onChange={this.handleDateChange}
                        className={classes.formControl}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.formControl}
                      >
                        <InputLabel className={classes.label} required>
                          Venue
                        </InputLabel>
                        <Select
                          onChange={this.handleChange}
                          name="venue"
                          value={schedule.venue}
                          input={<OutlinedInput />}
                        >
                          <MenuItem value=""></MenuItem>
                          {[
                            "CLB Slope",
                            "Handball Court 1",
                            "Handball Court 2",
                            "KE VII Hall",
                            "MPSH 5",
                            "MPSH 6",
                            "Netball Court 1 & 2",
                            "Netball Court 3 & 4",
                            "PGP",
                            "SRC Field 1",
                            "SRC Field 2",
                            "SRC Field 2 & 3",
                            "SRC Field 3",
                            "USC Indoor Court",
                            "USC Sports Hall",
                            "USC Squash Court",
                            "USC Swimming Pool",
                            "USC Tennis Court",
                            "USC Track & Grandstand",
                            "UTSH 1",
                            "UTSH 2"
                          ].map(venue => {
                            return <MenuItem value={venue}>{venue}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                      {/* <TextField
                        variant="outlined"
                        required
                        name="venue"
                        label="Venue"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                        className={classes.formControl}
                        value={schedule.venue}
                      /> */}
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                          value={schedule.gender}
                          onChange={this.handleRadioChange}
                        >
                          {["Male", "Female", "Mixed"].map(gender => {
                            return (
                              <FormControlLabel
                                value={gender}
                                control={<Radio />}
                                label={gender}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel className={classes.label} required>
                        Stage
                      </InputLabel>
                      <Select
                        onChange={this.handleChange}
                        name="stage"
                        value={schedule.stage}
                        input={<OutlinedInput />}
                      >
                        <MenuItem value=""></MenuItem>
                        {[
                          "Group A",
                          "Group B",
                          "Prelims",
                          "Semi 1",
                          "Semi 2",
                          "Finals",
                          "Carnival",
                          "Playoffs"
                        ].map(stage => {
                          return <MenuItem value={stage}>{stage}</MenuItem>;
                        })}
                      </Select>
                      {/* <FormHelperText>Auto width</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className={classes.button}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={this.handleSubmit}
                      style={{
                        backgroundColor: "#C8B06B"
                      }}
                    >
                      <Typography variant="h1" className={classes.buttonText}>
                        Create / Update
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={1} md={3} />
          </Grid>
        </CSSTransition>
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: success ? green[600] : "#d32f2f"
            }}
            message={
              <span id="client-snackbar" className={classes.message}>
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.handleClose}
              >
                {success ? (
                  <CheckCircleIcon className={classes.icon} />
                ) : (
                  <ErrorIcon className={classes.icon} />
                )}
              </IconButton>
            ]}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ScheduleForm);
