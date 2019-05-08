import React, { Component } from 'react'
import ReactModal from 'react-modal'
import SortDialog from './SortDialog'
import CardContainer from './CardContainer'

ReactModal.setAppElement('#root')

class BodyContainer extends Component {

  // state = {
  //   showSort: false
  // }

  // toggleSort = () => {
  //   this.setState({
  //     showSort: !this.state.showSort
  //   })
  // }

  render() {
    return(
      <div className="body-container">
        <div>
          <ReactModal
            isOpen={this.props.showSort}
            contentLabel="Sort and Filter Options">
            <SortDialog
              handleSort={this.props.handleSort}
              handleFilter={this.props.handleFilter}
              handleSeenFilter={this.props.handleSeenFilter}
              closeDialog={this.props.toggleSort} />
            <button onClick={this.props.toggleSort}>Close Modal</button>
          </ReactModal>
        </div>
        <CardContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       openDetails={this.props.openDetails} />
      </div>
    )
  }
}

export default BodyContainer