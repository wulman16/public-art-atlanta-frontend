import React, { Component } from 'react'

class SortContainer extends Component {

  handleSortChange = (e) => {
    this.props.handleSort(e.target.value)
  }

  handleFilterChange = (e) => {
    this.props.handleFilter(e.target.value)
  }

  handleSeenChange = (e) => {
    this.props.handleSeenFilter(e.target.value)
  }
  render() {
    return(
      <div>
        <label>
          Sort Artworks:
          <select onChange={this.handleSortChange}>
            <option value="default">Default</option>
            <option value="nearest">Nearest</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
          </select>
        </label>
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
        <label>
          Filter Artworks by Seen:
          <select onChange={this.handleSeenChange}>
            <option value="all">All</option>
            <option value="seen">Seen</option>
            <option value="unseen">Unseen</option>
          </select>
        </label>
      </div>
    )
  }
}

export default SortContainer