import React, { Component } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavBar from "./components/navBar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Gallery from "./pages/gallery";
import Home from "./pages/home";
import Results from "./pages/results";
import Schedule from "./pages/schedule";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/results" component={Results} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Contact} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
