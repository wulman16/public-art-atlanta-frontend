import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
// import { Redirect } from 'react-router'

class New extends Component {
  render() {
    return(
      <Fragment>
        <Link to="/index">Index</Link>
        New!
      </Fragment>
    )
  }
}

export default New