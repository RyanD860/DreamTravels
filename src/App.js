import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import routes from "./routes";
import { GoogleApiWrapper } from "google-maps-react";
import Header from "./components/Header";
import config from "./config";
import LoggedIn from "./components/loggedIn";
import Landing from "./components/Landing";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      haves: [],
      wants: []
    };
    this.addToWant = this.addToWant.bind(this);
    this.addToHave = this.addToHave.bind(this);
    this.removeFromHave = this.removeFromHave.bind(this);
    this.removeFromWant = this.removeFromWant.bind(this);
  }

  componentDidMount() {
    axios.get("/api/user").then(resp => {
      this.setState({ user: resp.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user && !this.state.user.message) {
      axios.get(`/api/user/haves`).then(resp => {
        this.setState({ haves: resp.data });
      });
      axios.get("/api/user/wants").then(resp => {
        this.setState({ wants: resp.data });
      });
    }
    if (this.state.wants.length !== prevState.wants.length) {
      axios.get("/api/user/wants").then(resp => {
        this.setState({ wants: resp.data });
      });
    }
    if (this.state.haves.length !== prevState.haves.length) {
      axios.get("/api/user/haves").then(resp => {
        this.setState({ haves: resp.data });
      });
    }
  }
  addToWant(long, lat, name) {
    axios
      .post("/api/add/want", {
        long: long,
        lat: lat,
        name: name
      })
      .then(resp => {
        this.setState({ wants: resp.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  addToHave(long, lat, name) {
    axios
      .post("/api/add/have", { long: long, lat: lat, name: name })
      .then(resp => {
        this.setState({ haves: resp.data });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  removeFromHave(id) {
    axios
      .delete(`/api/remove/have/${id}`)
      .then(resp => {
        this.setState({ haves: resp.data });
      })
      .catch(err => console.log(err));
  }
  removeFromWant(id) {
    axios
      .delete(`/api/remove/want/${id}`)
      .then(resp => {
        this.setState({ wants: resp.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        {routes}
        {this.state.user.message ? (
          <Landing />
        ) : (
          <div style={{ display: "flex" }}>
            <LoggedIn
              google={this.props.google}
              haves={this.state.haves}
              wants={this.state.wants}
              removeFromHave={this.removeFromHave}
              removeFromWant={this.removeFromWant}
              addToWant={this.addToWant}
              addToHave={this.addToHave}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.mapApiKey
})(App);
