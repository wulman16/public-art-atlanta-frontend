import React, { Component } from 'react'

class SortDialog extends Component {

  state = {
    value: `nearest`
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSort(this.state.value)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Sort Artworks:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="nearest">Nearest</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="year">Year</option>
          </select>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    )
  }
}

export default SortDialog