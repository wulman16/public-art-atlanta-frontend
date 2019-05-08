import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router'
import Header from './Header'
import BodyContainer from './BodyContainer'
import Details from './Details'
import NewArtworkForm from './NewArtworkForm'

class Index extends Component {

  state = {
    detailsOpen: false,
    newOpen: false,
    id: null,
    profile: ``,
    title: ``,
    artist: ``,
    year: null,
    image: ``,
    lat: null,
    lng: null,
    source: ``,
    owner: ``
  }

  openDetails = (profile, artworkID, artworkTitle, artworkArtist,
    artworkYear, artworkImage, artworkLat, artworkLng, artworkSource,
    artworkOwner) => {
    this.setState({
      detailsOpen: true,
      id: artworkID,
      profile: profile,
      title: artworkTitle,
      artist: artworkArtist,
      year: artworkYear,
      image: artworkImage,
      lat: artworkLat,
      lng: artworkLng,
      source: artworkSource,
      owner: artworkOwner
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
        <h1 className="site-name">Public Art Atlanta</h1>
        <Details show={this.state.detailsOpen}
                 onClose={this.closeDetails}
                 profile={this.state.profile}
                 id={this.state.id}
                 title={this.state.title}
                 artist={this.state.artist}
                 year={this.state.year}
                 image={this.state.image}
                 lat={this.state.lat}
                 lng={this.state.lng}
                 source={this.state.source}
                 owner={this.state.owner}
                 seen={this.props.seen}
                 handleSeen={this.props.handleSeen} />
        <NewArtworkForm show={this.state.newOpen}
                        onClose={this.closeNew}
                        handleArtworkSubmit={this.props.handleArtworkSubmit} />
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks}
                openNew={this.openNew}
                handleLogout={this.props.handleLogout} />
        <BodyContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       handleSort={this.props.handleSort}
                       handleFilter={this.props.handleFilter}
                       handleSeenFilter={this.props.handleSeenFilter}
                       openDetails={this.openDetails} />
      </Fragment>
    )
  }
}

export default Index