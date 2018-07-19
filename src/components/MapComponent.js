import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }
  componentDidUpdate() {
    this.loadMap(); // call loadMap function to load the google map
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks to make sure that props have been passed
      const { google } = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign(
        {},
        {
          center: { lat: 40.7485722, lng: -74.0068633 },
          zoom: 5,
          mapTypeId: "roadmap"
        }
      );

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
      if (this.props.haves.length > 0) {
        let that = this;
        this.props.haves.forEach(loc => {
          const marker = new google.maps.Marker({
            position: { lat: Number(loc.lat), lng: Number(loc.long) },
            map: this.map,
            title: loc.name,
            animation: google.maps.Animation.DROP
          });
          var content = document.createElement("div");
          content.innerHTML = loc.name;
          var button = content.appendChild(document.createElement("input"));
          button.type = "button";
          button.id = "showMoreButton";
          button.value = "Remove From Have";
          google.maps.event.addDomListener(button, "click", function() {
            that.props.removeFromHave(loc.id);
          });
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          marker.addListener("click", function() {
            infowindow.open(this.map, marker);
          });
        });
      }
      if (this.props.wants.length > 0) {
        let that = this;
        this.props.wants.forEach(loc => {
          const marker = new google.maps.Marker({
            position: {
              lat: Number(loc.lat),
              lng: Number(loc.long)
            },
            icon: {
              url:
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            },
            map: this.map,
            title: loc.name,
            animation: google.maps.Animation.DROP
          });
          var content = document.createElement("div");
          content.innerHTML = loc.name;
          var button = content.appendChild(document.createElement("input"));
          button.type = "button";
          button.id = "showMoreButton";
          button.value = "Remove From Want";
          google.maps.event.addDomListener(button, "click", function() {
            that.props.removeFromHave(loc.id);
            // this.props.removeFromHave(loc.id);
          });
          var infowindow = new google.maps.InfoWindow({
            content: content
          });
          marker.addListener("click", function() {
            infowindow.open(this.map, marker);
          });
        });
      }
    }
  }

  render() {
    const style = {
      width: "50vw",
      height: "85vh"
    };

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}
