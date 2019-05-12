import React from 'react'

class Search extends React.Component {

  handleSearchChange = event => {
    this.props.handleSearchChange(event.target.value)
  }

  render() {
    return (
      <input
        id="search"
        type="text"
        placeholder="Search by Title or Artist"
        onChange={this.handleSearchChange}
        />
    )
  }
}

export default Search