import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import BodyContainer from './BodyContainer'
import Details from './Details'

class Index extends Component {

  state = {
    detailsOpen: false,
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

  // openDetails = (profile) => {
  //   const details = document.getElementById(`details`)
  //   details.innerHTML = profile
  //   if (typeof details.showModal === `function`) {
  //     details.showModal()
  //   } else {
  //     alert(`The dialog API is not supported by this browser`)
  //   }
  // }

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
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks} />
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