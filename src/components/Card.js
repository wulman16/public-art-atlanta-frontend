import React, { Component } from 'react'

class Card extends Component {

  // TODO: automatically crop images to fit the square thumbnail dimensions?
  imageStyle = {
    height: `50px`,
    width: `50px`
  }

  render() {
    return(
      <div>
        {/* TODO: handle null image */}
        <img src={this.props.artworkImage} alt={this.props.artworkTitle} style={this.imageStyle}></img>
        <div>{this.props.artworkTitle}</div>
        <div>{this.props.artworkArtist}</div>
        <div>{this.props.artworkYear}</div>
        {this.props.seen ? `true` : `false`}
      </div>
    )
  }
}

export default Card