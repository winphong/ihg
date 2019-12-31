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
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MediaQuery from "react-responsive";
// import { useMediaQuery } from "react-responsive";
import auth from "../services/miscService";

const useStyles = makeStyles(theme => ({
  root: {
    // position: "fixed",
    // top: 0,
    // width: "100%",
    // zIndex: 1000
    // right: 0,
    // top: 0,
    // border: "3px solid #73AD21",
    // marginBottom: 100
  },
  title: {
    fontSize: "300%"
  },
  logo: {
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      justifyContent: "center",
      width: "65%"
    },
    [theme.breakpoints.only("sm")]: {
      display: "flex",
      justifyContent: "center",
      width: "83.33333%"
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "1.5%"
    }
  },
  logoSize: {
    [theme.breakpoints.up("md")]: {
      height: "45px"
    },
    height: "45px"
  }
}));

const selections = [
  "Home",
  "About",
  "Schedule",
  "Results",
  "Gallery",
  "Documents"
];

export default function NavBar({ pathname, handleTabChange }) {
  const classes = useStyles();
  const isAdmin = auth.getCurrentAdmin();

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
        {isAdmin && (
          <ListItem button key={"logout"}>
            <Button
              color="inherit"
              to={"/logout"}
              component={Link}
              disableRipple
            >
              <Typography
                style={{
                  color: "#958F87",
                  fontWeight: "bold"
                }}
              >
                Logout
              </Typography>
            </Button>
          </ListItem>
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar color="inherit" style={{ boxShadow: "1px 1px 5px #aaaaaa" }}>
        <Toolbar disableGutters>
          {/* Mobile */}
          <MediaQuery maxWidth={959}>
            <Button onClick={toggleDrawer("left", true)} disableRipple>
              <MenuIcon disableRipple style={{ color: "#C8B06B" }} />
            </Button>
            <Drawer
              anchor="left"
              open={state.left}
              onClose={toggleDrawer("left", false)}
            >
              {sideList("left")}
            </Drawer>
          </MediaQuery>
          <IconButton
            className={classes.logo}
            disableRipple
            color="inherit"
            onClick={() => handleTabChange("/home")}
            to={"/home"}
            component={Link}
            style={{ backgroundColor: "transparent" }}
          >
            <img src="/Logo.png" className={classes.logoSize} />
          </IconButton>
          {/* 
          <MediaQuery maxWidth={959}>
            <Button disabled style={{ padding: 0 }}></Button>
          </MediaQuery> */}

          {/* Laptop */}
          <MediaQuery minWidth={960}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "3%"
              }}
            >
              {selections.map(selection => {
                const newPathname = `/${selection.toLowerCase()}`;
                return (
                  <IconButton
                    style={{
                      backgroundColor: "transparent",
                      color: pathname === newPathname ? "#252527" : "#958F87"
                    }}
                    disableRipple
                    color="inherit"
                    onClick={() => handleTabChange(newPathname)}
                    to={newPathname}
                    component={Link}
                  >
                    <Typography
                      style={{
                        fontWeight: pathname === newPathname ? 900 : ""
                      }}
                    >
                      {selection}
                    </Typography>
                  </IconButton>
                );
              })}
              {isAdmin && (
                <IconButton
                  style={{
                    backgroundColor: "transparent",
                    color: "#958F87",
                    fontWeight: "bold"
                  }}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  color="inherit"
                  to={"/logout"}
                  component={Link}
                >
                  <Typography>Logout</Typography>
                </IconButton>
              )}
            </div>
          </MediaQuery>
        </Toolbar>
      </AppBar>
    </div>
  );
}
