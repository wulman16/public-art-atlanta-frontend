import React, { Component } from 'react'
import Card from './Card'

class CardContainer extends Component {

  handleSeen = artwork => {
    return this.props.seen.find(id => id === artwork.id)
      ? true 
      : false
  }

  render() {
    return(
      <div>
        {this.props.artworks.map(artwork => {
          return <Card artworkTitle={artwork.title}
                       artworkArtist={artwork.artist}
                       artworkYear = {artwork.year}
                       artworkImage={artwork.image}
                       seen={this.handleSeen(artwork)} />})}
      </div>
    )
  }
}

export default CardContainer