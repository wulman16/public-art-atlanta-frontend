import React from 'react'
import MapContainer from './MapContainer'

class Details extends React.Component {
  render() {

    if(!this.props.isOpen) {
      return null;
    }

    return (
      <div>
        <div className="details-header">
          <div className="details-map-container">
            <MapContainer artworks={[{
              title: this.props.title,
              artist: this.props.artist,
              lat: this.props.lat,
              lng: this.props.lng
            }]}
            zoom={15} />
          </div>
          <div className="details-tombstone">
            <h2 className="artwork-title">{this.props.title}</h2>
            <div>{this.props.artist}</div>
            <div>{this.props.year}</div>
          </div>
        </div>
        <img src={this.props.image} alt={this.props.title} className="details-image"></img>
        <div className="details-profile">{this.props.profile}</div>
        <div className="details-source"> — <a href={this.props.source}>{this.props.owner}</a></div>
        <div className="footer">
          <button className="button" onClick={() => this.props.handleSeen(this.props.id)}>
            {this.props.seen && this.props.seen.includes(this.props.id)
              ? `Remove from Seen`
              : `Add to Seen` }
          </button>
        </div>
      </div>
    );
  }
}

export default Details