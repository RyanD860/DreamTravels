import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {
  renderButtons() {
    if (this.props.user.message) {
      return (
        <ul className="right">
          <a href="http://localhost:3090/login" style={{ marginRight: "20px" }}>
            Log In
          </a>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <a
            style={{ marginRight: "20px" }}
            onClick={() => {
              axios.get("/api/logout").then(window.location.reload());
            }}
          >
            Log Out
          </a>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="row">
        <div className="nav-wrapper">
          <Link
            className="brand-logo left"
            to="/"
            style={{ marginLeft: "20px" }}
          >
            Dream Travels
          </Link>
          {this.renderButtons()}
        </div>
      </nav>
    );
  }
}

export default Header;
