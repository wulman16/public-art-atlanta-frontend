import React, { Component } from 'react'

class SortContainer extends Component {

  // state = {
  //   sortValue: ``,
  //   filterValue: `all`,
  //   seenValue: `all`
  // }

  handleSortChange = (e) => {
    // this.setState({
    //   sortValue: e.target.value
    // })
    this.props.handleSort(e.target.value)
  }

  // handleSortSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.handleSort(this.state.sortValue)
  // }

  handleFilterChange = (e) => {
    // this.setState({
    //   filterValue: e.target.value
    // })
    this.props.handleFilter(e.target.value)
  }

  // handleFilterSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.handleFilter(this.state.filterValue)
  // }

  handleSeenChange = (e) => {
    // this.setState({
    //   seenValue: e.target.value
    // })
    this.props.handleSeenFilter(e.target.value)
  }

  // handleSeenSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.handleSeenFilter(this.state.seenValue)
  // }

  render() {
    return(
      <div>
        {/* <form onSubmit={this.handleSortSubmit}> */}
          <label>
            Sort Artworks:
            <select onChange={this.handleSortChange}>
              <option value="" disabled></option>
              <option value="nearest">Nearest</option>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
            </select>
          </label>
          {/* <input type="submit" value="Submit" className="button"></input> */}
        {/* </form>
        <form onSubmit={this.handleFilterSubmit}> */}
          <label>
            Filter Artworks by Medium:
            <select onChange={this.handleFilterChange}>
              <option value="all">All</option>
              <option value="sculpture">Sculpture</option>
              <option value="mural">Mural</option>
              <option value="monument">Monument</option>
              <option value="architectural">Architectural</option>
              <option value="installation">Installation</option>
              <option value="relief">Relief</option>
              <option value="painting">Painting</option>
              <option value="photography">Photography</option>
            </select>
          </label>
          {/* <input type="submit" value="Submit" className="button"></input> */}
        {/* </form>
        <form onSubmit={this.handleSeenSubmit}> */}
          <label>
            Filter Artworks by Seen:
            <select onChange={this.handleSeenChange}>
              <option value="all">All</option>
              <option value="seen">Seen</option>
              <option value="unseen">Unseen</option>
            </select>
          </label>
          {/* <input type="submit" value="Submit" className="button"></input> */}
        {/* </form> */}
      </div>
    )
  }
}

export default SortContainer