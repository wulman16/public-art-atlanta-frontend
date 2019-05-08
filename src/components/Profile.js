import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return(
      <div>
        <div className="username">{this.props.userName}</div>
        <div className="seen-ratio">{this.props.numSeen} / {this.props.numArtworks}</div>
      </div>
    )
  }
}

export default Profile