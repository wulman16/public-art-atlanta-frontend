import React, { Component } from 'react'

class Card extends Component {

  // TODO: automatically crop images to fit the square thumbnail dimensions?

  handleClick = () => {
    this.props.openDetails(this.props.artworkProfile, 
      this.props.artworkID,
      this.props.artworkTitle,
      this.props.artworkArtist,
      this.props.artworkYear,
      this.props.artworkImage,
      this.props.artworkLat,
      this.props.artworkLng,
      this.props.artworkSource,
      this.props.artworkOwner)
  }

  render() {
    return(
      <div className="card" onClick={this.handleClick}>
        {/* TODO: handle null image */}
        <img className="card-image" src={this.props.artworkImage} alt={this.props.artworkTitle}></img>
        <div className="card-info">
          <div className="artwork-title">{this.props.artworkTitle}</div>
          <div>{this.props.artworkArtist}</div>
        </div>
        {/* {this.props.seen ? `true` : `false`} */}
      </div>
    )
  }
}

export default Card