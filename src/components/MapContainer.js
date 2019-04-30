import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  width: `100%`,
  height: `100%`
}

class MapContainer extends Component {
  render() {
    return(
      <div style={{ height: '400px', width: '700px', backgroundColor: 'grey' }}>
        Map
      </div>
    )
  }
}

export default MapContainer