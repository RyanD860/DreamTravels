import React, { Component } from "react";
import FoundPlace from "./FoundPlace";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      searchTerm: "",
      selectedPlace: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(search) {
    axios
      .get(`/api/place/auto/${search}`)
      .then(resp => this.setState({ locations: resp }))
      .catch(err => console.log(err));
  }

  findPlace(place) {
    axios
      .get(`/api/place/find/${place.place_id}`)
      .then(resp => {
        this.setState({ selectedPlace: resp.data });
      })
      .catch(err => console.log(err));
  }

  displayLocations() {
    if (this.state.locations.data) {
      return this.state.locations.data.map(item => {
        return (
          <li onClick={() => this.findPlace(item)} key={item.place_id}>
            {item.structured_formatting.main_text}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <h1>Search</h1>
        <input
          type="text"
          onChange={e =>
            this.setState({
              searchTerm: e.target.value
            })
          }
          value={this.state.searchTerm}
        />
        <button onClick={() => this.onSubmit(this.state.searchTerm)}>
          Find Place
        </button>
        <ul>{this.displayLocations()}</ul>
        <FoundPlace
          place={this.state.selectedPlace}
          addToWant={this.props.addToWant}
          addToHave={this.props.addToHave}
        />
      </div>
    );
  }
}

export default Search;
