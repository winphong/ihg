import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MediaQuery from "react-responsive";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

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

const selections = [
  "HOME",
  "ABOUT",
  "SCHEDULE",
  "RESULTS",
  "GALLERY",
  "CONTACT"
];

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
        {selections.map((text, index) => (
          <ListItem button key={text}>
            <Button
              color="inherit"
              to={`/${text.toLowerCase()}`}
              component={Link}
            >
              {text}
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <MediaQuery maxWidth={959}>
            <Button onClick={toggleDrawer("left", true)}>
              <MenuIcon />
            </Button>
            <Drawer
              anchor="left"
              open={state.left}
              onClose={toggleDrawer("left", false)}
            >
              {sideList("left")}
            </Drawer>
          </MediaQuery>
          <Typography variant="h5" className={classes.title}>
            <img
              src="/Logo.png"
              style={{ width: "60px", backgroundColor: "black" }}
            ></img>
            {"   "} IHG 19/20
          </Typography>
          <MediaQuery minWidth={960}>
            {selections.map(selection => {
              return (
                <IconButton
                  style={{
                    backgroundColor: "transparent"
                  }}
                  disableRipple={true}
                  color="inherit"
                  to={`/${selection.toLowerCase()}`}
                  component={Link}
                >
                  {selection}
                </IconButton>
              );
            })}
          </MediaQuery>
        </Toolbar>
      </AppBar>
    </div>
  );
}
