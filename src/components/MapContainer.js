import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
  position: `absolute`,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
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

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    // return (<div style={mapStyles}></div>)
    return(
      <Map 
        google={this.props.google}
        zoom={this.props.zoom}
        style={mapStyles}
        initialCenter={{
          lat: this.avgValue(this.props.artworks, `lat`),
          lng: this.avgValue(this.props.artworks, `lng`)
        }}
        >
        {this.props.artworks.map((artwork, i) => {
          return <Marker key={i}
                         onClick={this.onMarkerClick}
                         name={`${artwork.title} — ${artwork.artist}`}
                         title={artwork.title}
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