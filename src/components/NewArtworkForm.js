import React from 'react'

class NewArtworkForm extends React.Component {

  initialState = {
    title: ``,
    artist: ``,
    year: ``,
    image: ``,
    medium: ``,
    owner: ``,
    profile: ``,
    lat: ``,
    lng: ``,
    source: ``
  }

  state = this.initialState

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.incompleteSubmission(event)) {
      const error = document.querySelector(`.new-artwork-error-message`)
      error.textContent = `Fields with * are required!`
    } else if (this.badCoordinates(event)) {
      const error = document.querySelector(`.new-artwork-error-message`)
      error.textContent = `Latitude and Longitude must correspond to valid Atlanta coordinates!`
    } else {
      let artworkObject = {}
      for (let key in this.state) {
        artworkObject[key] = this.handleEmptyField(this.state[key])
      }
      this.props.handleArtworkSubmit(artworkObject)
      this.setState(() => this.initialState)
      this.props.onClose()
    }
  }

  incompleteSubmission = event => {
    return (!event.target.image.value ||
      !event.target.lat.value ||
      !event.target.lng.value)
  }

  badCoordinates = event => {
    const lat = parseFloat(event.target.lat.value)
    const lng = parseFloat(event.target.lng.value)
    return (!lat || lat > 33.930925 || lat < 33.629466 ||
           !lng || lng > -84.227898 || lng < -84.587811)
  }

  handleEmptyField = input => {
    return input.length === 0 ? null : input
  }

  // handleClose = () => {
  //   this.setState(() => this.initialState)
  //   this.props.onClose()
  // }

  render() {

    // Render nothing if the "show" prop is false
    if(!this.props.isOpen) {
      return null;
    }

    // // The gray background
    // const backdropStyle = {
    //   position: 'fixed',
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   right: 0,
    //   backgroundColor: 'rgba(0,0,0,0.3)',
    //   padding: 50
    // };

    // // The modal "window"
    // const modalStyle = {
    //   backgroundColor: '#fff',
    //   borderRadius: 5,
    //   maxWidth: 500,
    //   minHeight: 300,
    //   margin: '0 auto',
    //   padding: 30
    // };

    return (
      <div className="backdrop">
        <div className="modal">
          <div className="new-artwork-error-message"></div>
          <form onSubmit={this.handleSubmit}>
            <label>New Artwork</label>
            <input type="text" placeholder="Title" name="title"
                    value={this.state.title} onChange={this.handleChange} ></input>
            <input type="text" placeholder="Artist" name="artist"
                    value={this.state.artist} onChange={this.handleChange} ></input>
            <input type="text" placeholder="Year" name="year"
                    value={this.state.year} onChange={this.handleChange} ></input>
            <input type="text" placeholder="Image URL*" name="image"
                    value={this.state.image} onChange={this.handleChange} ></input>
            <select value={this.state.medium} onChange={this.handleChange}
                    name="medium">
              <option value="" disabled>Medium</option>
              <option value="sculpture">Sculpture</option>
              <option value="mural">Mural</option>
              <option value="monument">Monument</option>
              <option value="architectural">Architectural</option>
              <option value="installation">Installation</option>
              <option value="relief">Relief</option>
              <option value="painting">Painting</option>
              <option value="photography">Photography</option>
            </select>
            <input type="text" placeholder="Owner" name="owner"
                    value={this.state.owner} onChange={this.handleChange} ></input>
            <textarea placeholder="Profile" name="profile"
                    value={this.state.profile} onChange={this.handleChange} ></textarea>
            <input type="text" placeholder="Latitude*" name="lat"
                    value={this.state.lat} onChange={this.handleChange} ></input>
            <input type="text" placeholder="Longitude*" name="lng"
                    value={this.state.lng} onChange={this.handleChange} ></input>
            <input type="text" placeholder="Source URL" name="source"
                    value={this.state.source} onChange={this.handleChange} ></input>
            <input type="submit" value="Submit" />
          </form>

          {/* <div className="footer">
            <button onClick={this.handleClose}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default NewArtworkForm