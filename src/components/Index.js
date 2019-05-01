import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import BodyContainer from './BodyContainer'
import Details from './Details'
import New from './New'

class Index extends Component {

  state = {
    detailsOpen: false,
    newOpen: false,
    id: null,
    profile: ``
  }

  openDetails = (profile, artworkID) => {
    this.setState({
      detailsOpen: true,
      id: artworkID,
      profile: profile
    })
  }

  closeDetails = () => {
    this.setState({
      detailsOpen: false,
      id: null,
      profile: ``
    })
  }

  openNew = () => {
    this.setState({
      newOpen: true
    })
  }

  closeNew = () => {
    this.setState({
      newOpen: false
    })
  }

  render() {
    return(
      <Fragment>
        {/* TODO: eventually handle presence of token instead of presence of user in state */}
        {!this.props.userId ? <Redirect push to="/login" /> : null}
        <h1 className="site-name">Public Art Atlanta</h1>
        <Details show={this.state.detailsOpen}
                 onClose={this.closeDetails}
                 profile={this.state.profile}
                 id={this.state.id}
                 seen={this.props.seen}
                 handleSeen={this.props.handleSeen} />
        <New show={this.state.newOpen}
             onClose={this.closeNew} />
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks}
                openNew={this.openNew} />
        <BodyContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       handleSort={this.props.handleSort}
                       handleFilter={this.props.handleFilter}
                       openDetails={this.openDetails} />
      </Fragment>
    )
  }
}

export default Index