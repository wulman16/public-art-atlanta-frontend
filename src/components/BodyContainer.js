import React, { Component } from 'react'
import ReactModal from 'react-modal'
import SortContainer from './SortContainer'
import CardContainer from './CardContainer'

ReactModal.setAppElement('#root')

class BodyContainer extends Component {

  render() {
    return(
      <div className="body-container">
        <div>
        <SortContainer
              handleSearchChange={this.props.handleSearchChange}
              handleSort={this.props.handleSort}
              handleFilter={this.props.handleFilter}
              handleSeenFilter={this.props.handleSeenFilter}
              closeDialog={this.props.toggleSort} />
          {/* <ReactModal
            portalClassName="sort-modal"
            isOpen={this.props.showSort}
            contentLabel="Sort and Filter Options"
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.props.toggleSort}>
            <button onClick={this.props.toggleSort} className="button" id="close-button">X</button>
            <SortDialog
              handleSort={this.props.handleSort}
              handleFilter={this.props.handleFilter}
              handleSeenFilter={this.props.handleSeenFilter}
              closeDialog={this.props.toggleSort} />
          </ReactModal> */}
        </div>
        <CardContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       openDetails={this.props.openDetails} />
      </div>
    )
  }
}

export default BodyContainer