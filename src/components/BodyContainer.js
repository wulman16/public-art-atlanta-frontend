import React, { Component, Fragment } from 'react'
import ReactModal from 'react-modal'
import SortDialog from './SortDialog'
import CardContainer from './CardContainer'

class BodyContainer extends Component {

  state = {
    showSort: false
  }

  toggleSort = () => {
    this.setState({
      showSort: !this.state.showSort
    })
  }

  render() {
    return(
      <Fragment>
        <div>
          <ReactModal
            isOpen={this.state.showSort}
            contentLabel="Sort and Filter Options">
            <SortDialog
              handleSort={this.props.handleSort}
              handleFilter={this.props.handleFilter}
              handleSeenFilter={this.props.handleSeenFilter}
              closeDialog={this.toggleSort} />
            <button onClick={this.toggleSort}>Close Modal</button>
          </ReactModal>
          <button onClick={this.toggleSort}>Sort and Filter Artworks</button>
        </div>
        <CardContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       openDetails={this.props.openDetails} />
      </Fragment>
    )
  }
}

export default BodyContainer