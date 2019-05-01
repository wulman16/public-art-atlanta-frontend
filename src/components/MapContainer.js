import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
  width: `75%`,
  height: `100%`
}

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  avgValue = (locations, type) => {
    return locations.reduce((a, b) => a + b[type], 0) / locations.length
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return(
      <Map 
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{
          lat: this.avgValue(this.props.artworks, `lat`),
          lng: this.avgValue(this.props.artworks, `lng`)
        }}
        >
        {this.props.artworks.map(artwork => {
          return <Marker onClick={this.onMarkerClick}
                         name={artwork.title}
                         position={{lat: artwork.lat , lng: artwork.lng }}/>
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)