import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
    selectedPlace: {},
    selectedArtwork: {}
  }

  avgValue = (locations, type) => {
    return locations.reduce((a, b) => a + b[type], 0) / locations.length
  }

  onMarkerClick = (props, marker, e, artwork) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      selectedArtwork: artwork
    })
  }

  onInfoWindowOpen = () => {
    const content = (<h4 onClick={() => this.props.handleInfoWindowClick(this.state.selectedArtwork)} className="map-label">{this.state.selectedPlace.name}</h4>)
    ReactDOM.render(React.Children.only(content), document.getElementById(`iwc`))
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
                         onClick={(props, marker, e) => this.onMarkerClick(props, marker, e, artwork)}
                         name={`${artwork.title} — ${artwork.artist}`}
                         title={artwork.title}
                         position={{lat: artwork.lat , lng: artwork.lng }}/>
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          onOpen={this.onInfoWindowOpen}
        >
          <div id="iwc">
            {/* <h4 className="map-label">{this.state.selectedPlace.name}</h4> */}
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapContainer)