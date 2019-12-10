import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
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
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "center",
      fontSize: "200%"
    },
    // flexGrow: 1,
    fontSize: "400%",
    display: "flex",
    alignItems: "center"
  },
  logo: {
    [theme.breakpoints.down("md")]: {
      width: "20%"
    },
    [theme.breakpoints.up("md")]: {
      width: "10%",
      marginLeft: "1%"
    }
  }
}));

const selections = [
  "Home",
  "About",
  "Schedule",
  "Results",
  "Gallery",
  "Contact"
];

export default function NavBar({ pathname, handleTabChange }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        {selections.map((selection, index) => (
          <ListItem button key={selection}>
            <Button
              color="inherit"
              to={`/${selection.toLowerCase()}`}
              component={Link}
              disableRipple
              onClick={() => handleTabChange(`/${selection.toLowerCase()}`)}
            >
              <Typography
                style={{
                  color:
                    pathname === `/${selection.toLowerCase()}`
                      ? "#252527"
                      : "#958F87",
                  fontWeight: "bold"
                }}
              >
                {selection}
              </Typography>
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
        <Toolbar disableGutters>
          {/* Mobile */}
          {isMobile && (
            <React.Fragment>
              <Button onClick={toggleDrawer("left", true)}>
                <MenuIcon disableRipple style={{ color: "#C8B06B" }} />
              </Button>
              <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer("left", false)}
              >
                {sideList("left")}
              </Drawer>
            </React.Fragment>
          )}
          <Typography variant="h1" className={classes.title} style={{}}>
            <img src="/Logo.png" className={classes.logo} />
            IHG
          </Typography>
          {isMobile && <Button disabled style={{ padding: 0 }}></Button>}
          {/* Laptop */}
          {!isMobile &&
            selections.map(selection => {
              const newPathname = `/${selection.toLowerCase()}`;
              return (
                <IconButton
                  style={{
                    backgroundColor: "transparent",
                    color: pathname === newPathname ? "#252527" : "#958F87",
                    fontWeight: "bold"
                  }}
                  disableRipple
                  color="inherit"
                  onClick={() => handleTabChange(newPathname)}
                  to={newPathname}
                  component={Link}
                >
                  {selection}
                </IconButton>
              );
            })}
        </Toolbar>
      </AppBar>
    </div>
  );
}
