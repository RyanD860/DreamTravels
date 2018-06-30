import React, { Component } from "react";
import axios from "axios";
import config from "../config";

class FoundPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.place.photos !== prevProps.place.photos) {
      this.setState({ image: this.props.place.photos[0].photo_reference });
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.place.name}</h3>
        {this.state.image === "" ? (
          false
        ) : (
          <div>
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${
                this.state.image
              }&key=${config.placesApiKey}`}
            />
            <button
              onClick={() =>
                this.props.addToWant(
                  this.props.place.geometry.location.lng,
                  this.props.place.geometry.location.lat,
                  this.props.place.name
                )
              }
            >
              Want to go
            </button>
            <button
              onClick={() =>
                this.props.addToHave(
                  this.props.place.geometry.location.lng,
                  this.props.place.geometry.location.lat,
                  this.props.place.name
                )
              }
            >
              Been There
            </button>
            <button>Been there, done that</button>
          </div>
        )}
      </div>
    );
  }
}
export default FoundPlace;
