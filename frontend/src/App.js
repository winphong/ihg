import React from "react";
import NavBar from "./components/navBar";
import About from "./pages/about";
import Contact from "./pages/contact";
import Gallery from "./pages/gallery";
import Home from "./pages/home";
import Results from "./pages/results";
import Schedule from "./pages/schedule";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Home />
        <About />
        <Schedule />
        <Results />
        <Gallery />
        <Contact />
      </React.Fragment>
    );
  }
}

export default App;
