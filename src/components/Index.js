import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import BodyContainer from './BodyContainer'

class Index extends Component {
  render() {
    return(
      <Fragment>
        {/* TODO: eventually handle presence of token instead of presence of user in state */}
        {!this.props.userId ? <Redirect push to="/login" /> : null}
        <h1 className="site-name">Public Art Atlanta</h1>
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks} />
        <BodyContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       handleSort={this.props.handleSort}
                       handleFilter={this.props.handleFilter} />
      </Fragment>
    )
  }
}

export default Index