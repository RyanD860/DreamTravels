import React, { Component } from "react";
import config from "../config";

class FoundPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      name: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.place.photos !== prevProps.place.photos) {
      if (this.props.place.photos) {
        this.setState({
          image: this.props.place.photos[0].photo_reference
        });
      } else {
        this.setState({
          image: "No Image"
        });
      }
    }
    if (this.props.place.name !== prevProps.place.name) {
      this.setState({
        name: this.props.place.name
      });
    }
  }
  displayImg() {
    if (this.state.image !== "No Image") {
      return (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${
            this.state.image
          }&key=${config.placesApiKey}`}
          alt={"Place found"}
        />
      );
    } else {
      return (
        <img
          src="https://i5.walmartimages.com/asr/f752abb3-1b49-4f99-b68a-7c4d77b45b40_1.39d6c524f6033c7c58bd073db1b99786.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
          alt={"No place found"}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.place.name}</h3>
        {this.state.name === "" ? (
          false
        ) : (
          <div>
            {this.displayImg()}
            <button
              className="waves-effect waves-light btn"
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
              className="waves-effect waves-light btn"
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
          </div>
        )}
      </div>
    );
  }
}
export default FoundPlace;
