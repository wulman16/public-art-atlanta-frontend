import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <div>
        <p className="username">{this.props.userName}</p>
        <p className="seen-ratio">{this.props.numSeen} / {this.props.numArtworks}</p>
      </div>
    )
  }
}

export default Profile