import React from "react";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import About from "./pages/about";
import Schedule from "./pages/schedule";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Home />
        {/* <About /> */}
        {/* <Schedule /> */}
      </React.Fragment>
    );
  }
}

export default App;
