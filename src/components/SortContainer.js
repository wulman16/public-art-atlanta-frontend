import React, { Component } from 'react'
import Search from './Search'

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

  handleReset = () => {
    document.getElementById(`search`).value = ``
    document.getElementById(`sort-select`).value = `default`
    document.getElementById(`medium-select`).value = `all`
    document.getElementById(`seen-select`).value = `all`
    this.props.handleSearchChange(``)
    this.props.handleSort(`default`)
    this.props.handleFilter(`all`)
    this.props.handleSeenFilter(`all`)
  }

  render() {
    return(
      <div>
        <Search handleSearchChange={this.props.handleSearchChange} />
        <label>
          Sort Artworks:
          <select id="sort-select" onChange={this.handleSortChange}>
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
          <select id="medium-select" onChange={this.handleFilterChange}>
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
          <select id="seen-select" onChange={this.handleSeenChange}>
            <option value="all">All</option>
            <option value="seen">Seen</option>
            <option value="unseen">Unseen</option>
          </select>
        </label>
        <button className="button" onClick={this.handleReset}>Reset All</button>
      </div>
    )
  }
}

export default SortContainer