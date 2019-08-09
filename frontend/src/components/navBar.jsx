import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
    // position: "fixed",
    // top: 0,
    // right: 0,
    // width: "100%",
    // border: "3px solid #73AD21",
    // marginBottom: 100
  },
  title: {
    flexGrow: 1
  }
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IHG 19/20
          </Typography>
          <Button color="inherit">ABOUT</Button>
          <Button color="inherit">SCHEDULE</Button>
          <Button color="inherit">RESULTS</Button>
          <Button color="inherit">GALLERY</Button>
          <Button color="inherit">CONTACT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
