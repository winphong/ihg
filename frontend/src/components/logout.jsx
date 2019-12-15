import React, { Component } from "react";
import auth from "../services/miscService";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return <div style={{ height: "90vmax" }} />;
  }
}

export default Logout;
