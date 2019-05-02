import React, { Component } from 'react'

class SortDialog extends Component {

  state = {
    sortValue: ``,
    filterValue: `all`
  }

  handleSortChange = (e) => {
    this.setState({
      sortValue: e.target.value
    })
  }

  handleSortSubmit = (e) => {
    e.preventDefault()
    this.props.handleSort(this.state.sortValue)
  }

  handleFilterChange = (e) => {
    this.setState({
      filterValue: e.target.value
    })
  }

  handleFilterSubmit = (e) => {
    e.preventDefault()
    this.props.handleFilter(this.state.filterValue)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSortSubmit}>
          <label>
            Sort Artworks:
            <select value={this.state.sortValue} onChange={this.handleSortChange}>
              <option value="" disabled></option>
              <option value="nearest">Nearest</option>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
            </select>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        <form onSubmit={this.handleFilterSubmit}>
          <label>
            Filter Artworks by Medium:
            <select value={this.state.filterValue} onChange={this.handleFilterChange}>
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
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default SortDialog