import React, { Component, Fragment } from 'react'
import SortDialog from './SortDialog'
import CardContainer from './CardContainer'

class BodyContainer extends Component {
  render() {
    return(
      <Fragment>
        <SortDialog handleSort={this.props.handleSort}
                    handleFilter={this.props.handleFilter}
                    handleSeenFilter={this.props.handleSeenFilter} />
        <CardContainer seen={this.props.seen}
                       artworks={this.props.artworks}
                       openDetails={this.props.openDetails} />
      </Fragment>
    )
  }
}

export default BodyContainer