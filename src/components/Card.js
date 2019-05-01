import React, { Component } from 'react'

class Card extends Component {

  // TODO: automatically crop images to fit the square thumbnail dimensions?
  imageStyle = {
    height: `50px`,
    width: `50px`
  }

  divStyle = {
    border: `2px solid black`,
    margin: `5px`,
    padding: `2px`
  }

  handleClick = () => {
    this.props.openDetails(this.props.artworkProfile, this.props.artworkID)
  }

  render() {
    return(
      <div style={this.divStyle}>
        {/* TODO: handle null image */}
        <img onClick={this.handleClick} src={this.props.artworkImage} alt={this.props.artworkTitle} style={this.imageStyle}></img>
        <div onClick={this.handleClick}>{this.props.artworkTitle}</div>
        <div>{this.props.artworkArtist}</div>
        <div>{this.props.artworkYear}</div>
        {/* {this.props.seen ? `true` : `false`} */}
      </div>
    )
  }
}

export default Card