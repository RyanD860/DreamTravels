import React, { Component } from "react";
import MapComponent from "./MapComponent";
import Search from "./Search";

const LoggedIn = props => {
  return (
    <div>
      <MapComponent
        google={props.google}
        haves={props.haves}
        wants={props.wants}
        removeFromHave={props.removeFromHave}
        removeFromWant={props.removeFromWant}
      />
      <Search addToWant={props.addToWant} addToHave={props.addToHave} />
    </div>
  );
};

export default LoggedIn;
