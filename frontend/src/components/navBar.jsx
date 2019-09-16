import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MediaQuery from "react-responsive";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["HOME", "ABOUT", "SCHEDULE", "RESULTS", "GALLERY", "CONTACT"].map(
          (text, index) => (
            <ListItem button key={text}>
              <Button
                color="inherit"
                to={`/${text.toLowerCase()}`}
                component={Link}
              >
                {text}
              </Button>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            IHG 19/20
          </Typography>
          <MediaQuery minWidth={961}>
            <IconButton color="inherit" to="/home" component={Link}>
              HOME
            </IconButton>
            <IconButton color="inherit" to="/about" component={Link}>
              ABOUT
            </IconButton>
            <IconButton color="inherit" to="/schedule" component={Link}>
              SCHEDULE
            </IconButton>
            <IconButton color="inherit" to="/results" component={Link}>
              RESULTS
            </IconButton>
            <IconButton color="inherit" to="/gallery" component={Link}>
              GALLERY
            </IconButton>
            <IconButton color="inherit" to="/contact" component={Link}>
              CONTACT
            </IconButton>
          </MediaQuery>
          <MediaQuery maxWidth={960}>
            <Button onClick={toggleDrawer("right", true)}>Open Right</Button>
            <Drawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer("right", false)}
            >
              {sideList("right")}
            </Drawer>
          </MediaQuery>
        </Toolbar>
      </AppBar>
    </div>
  );
}
