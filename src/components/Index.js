import React, { Component, Fragment } from 'react'
import ReactModal from 'react-modal'
import Header from './Header'
import BodyContainer from './BodyContainer'
import Details from './Details'
import NewArtworkForm from './NewArtworkForm'

ReactModal.setAppElement('#root')

class Index extends Component {

  state = {
    showDetails: false,
    detailsOpen: false,
    newOpen: false,
    showSort: false,
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

  toggleSort = () => {
    this.setState({
      showSort: !this.state.showSort
    })
  }

  // toggleModal = () => {
  //   this.setState({
  //     showModal: !this.state.showModal
  //   })
  // }

  openDetails = (profile, artworkID, artworkTitle, artworkArtist,
    artworkYear, artworkImage, artworkLat, artworkLng, artworkSource,
    artworkOwner) => {
    this.setState({
      showDetails: true,
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
      showDetails: false,
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
        <div>
          <ReactModal
            portalClassName="modal"
            isOpen={this.state.showDetails}
            contentLabel={this.state.title}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeDetails}>
            <Details
                  isOpen={this.state.showDetails} 
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
            <button onClick={this.closeDetails} className="button">Close</button>
          </ReactModal>
        </div>
        <div>
          <ReactModal
            isOpen={this.state.newOpen}
            contentLabel="New Artwork Form"
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeNew}>
            <NewArtworkForm
              isOpen={this.state.newOpen}
              handleArtworkSubmit={this.props.handleArtworkSubmit}
              handleClose={this.closeNew} />
            <button onClick={this.closeNew} className="button">Close</button>
          </ReactModal>
        </div>

        <div className="site-name-container">
          <h1 className="site-name">Public Art Atlanta</h1>
        </div>
        <Header userId={this.props.userId}
                userName={this.props.userName}
                seen={this.props.seen}
                artworks={this.props.artworks}
                openNew={this.openNew}
                handleLogout={this.props.handleLogout}
                toggleSort={this.toggleSort} />
        <div className="separator"></div>
        <BodyContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       handleSort={this.props.handleSort}
                       handleFilter={this.props.handleFilter}
                       handleSeenFilter={this.props.handleSeenFilter}
                       openDetails={this.openDetails}
                       toggleSort={this.toggleSort}
                       showSort={this.state.showSort} />
      </Fragment>
    )
  }
}

export default Index