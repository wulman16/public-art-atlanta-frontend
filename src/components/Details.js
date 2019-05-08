import React from 'react'
import MapContainer from './MapContainer'

class Details extends React.Component {
  render() {

    const mapStyle = {
      position: 'relative',
      height: `75vh`,
      // backgroundColor: `grey`
    }

    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={{backdropStyle}}>
        <div className="modal" style={{modalStyle}}>
          <div className="map" style={{mapStyle}}>
            <MapContainer artworks={[{
              title: this.props.title,
              artist: this.props.artist,
              lat: this.props.lat,
              lng: this.props.lng
            }]}
            zoom={15} />
          </div>
          <div>
            {this.props.title}
            {this.props.artist}
            {this.props.year}
            <img src={this.props.image} alt={this.props.title}></img>
            {this.props.lat}
            {this.props.lng}
            {this.props.profile}
            {this.props.source}
            {this.props.owner}
          </div>
          <div className="footer">
            <button onClick={() => this.props.handleSeen(this.props.id)}>
              {this.props.seen && this.props.seen.includes(this.props.id)
                ? `Remove from Seen`
                : `Add to Seen` }
            </button>
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Details