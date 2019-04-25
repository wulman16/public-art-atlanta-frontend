import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import BodyContainer from './BodyContainer'

class Index extends Component {
  render() {
    return(
      <Fragment>
        {!this.props.userId ? <Redirect push to="/login" /> : null}
        <h1 className="site-name">Public Art Atlanta</h1>
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks} />
        <BodyContainer seen={this.props.seen}
                       artworks={this.props.artworks} />
      </Fragment>
    )
  }
}

export default Index