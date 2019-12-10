import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Gallery from "./pages/gallery";
import Home from "./pages/home";
import Results from "./pages/results";
import Schedule from "./pages/schedule";
import ScheduleForm from "./pages/admin/scheduleForm";
import Footer from "./components/footer";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import ScoreForm from "./pages/admin/scoreForm";
import StandingForm from "./pages/admin/standingForm";
import Login from "./pages/admin/login";
import ProtectedRoute from "./components/protectedRoute";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Lato",
    h1: { fontFamily: "TheNextFont", color: "#C8B06B" }
  }
});

class App extends Component {
  state = {
    pathname: window.location.pathname
  };

  handleTabChange = pathname => {
    this.setState({ pathname });
  };

  render() {
    // if (this.detectmobile() === true)
    //   cookie.save("isMobileDevice", true, { path: "/" });

    return (
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <div style={{ backgroundColor: "#F9FBFA" }}>
          <MuiThemeProvider theme={theme}>
            <NavBar
              pathname={this.state.pathname}
              handleTabChange={this.handleTabChange}
            />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/results" component={Results} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/contact" component={Contact} />
              <Route path="/admin" exact component={Login} />
              <ProtectedRoute
                path="/admin/schedule"
                exact
                component={ScheduleForm}
              />
              <ProtectedRoute
                path="/admin/schedule/:id"
                component={ScheduleForm}
              />
              <ProtectedRoute path="/admin/score/:id" component={ScoreForm} />
              <ProtectedRoute path="/admin/standing" component={StandingForm} />
              +{/* <Route path="/not-found" component={NotFound} /> */}
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
            <Footer />
          </MuiThemeProvider>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
