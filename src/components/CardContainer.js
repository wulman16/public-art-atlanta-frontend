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
        {this.props.artworks.map(artwork => <Card artworkTitle={artwork.title}
        seen={this.handleSeen(artwork)} />)}
      </div>
    )
  }
}

export default CardContainer