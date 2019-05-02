import React, { Component } from 'react'
import Card from './Card'

class CardContainer extends Component {

  handleSeen = artwork => {
    if (this.props.seen) {
      return this.props.seen.find(id => id === artwork.id)
        ? true 
        : false
    } else {
      return false
    }
  }

  render() {
    return(
      <div>
        {this.props.artworks.map((artwork, i) => {
          return <Card key={i}
                       artworkTitle={artwork.title}
                       artworkArtist={artwork.artist}
                       artworkYear = {artwork.year}
                       artworkImage={artwork.image}
                       artworkProfile={artwork.profile}
                       artworkID={artwork.id}
                       seen={this.handleSeen(artwork)}
                       openDetails={this.props.openDetails} />})}
      </div>
    )
  }
}

export default CardContainer