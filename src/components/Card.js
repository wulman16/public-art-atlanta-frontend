import React, { Component } from 'react'

class Card extends Component {

  render() {
    return(
      <div>
        {this.props.artworkTitle}
        {this.props.seen ? `true` : `false`}
      </div>
    )
  }
}

export default Card