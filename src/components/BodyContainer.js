import React, { Component, Fragment } from 'react'
import FilterContainer from './FilterContainer'
import SortDialog from './SortDialog'
import CardContainer from './CardContainer'

class BodyContainer extends Component {
  render() {
    return(
      <Fragment>
        <FilterContainer />
        <SortDialog handleSort={this.props.handleSort} />
        <CardContainer seen={this.props.seen}
                       artworks={this.props.artworks} />
      </Fragment>
    )
  }
}

export default BodyContainer