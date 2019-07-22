import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class Movie extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ movie: res.data.movie }))
      .catch(err => this.setState({ error: err.stack }))
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/movies/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  // deleteMovie () {
  //   axios.delete(`${apiUrl}/movies/${this.props.match.params.id}`)
  //     .then(console.log('The movie has been deleted'))
  //     .catch(err => this.setState({ error: err.stack }))
  // }

  render () {
    const { movie, error, deleted } = this.state

    if (error) {
      return <p>ERROR: {error}</p>
    }

    if (!movie) {
      return <p>Loading...</p>
    }
    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Movie Successfully Deleted!!' } }
      }/>
    }

    return (
      <Layout>
        <h4>{movie.title}</h4>
        <p>Date released: {movie.year}</p>
        <p>Directed by: {movie.director}</p>
        <Link to="/movies">Back to all the movies</Link>
        <button onClick={this.destroy}>DELETE MOVIE</button>
        <Link to={ `/movies/${this.props.match.params.id}/edit` }>
          <button>Edit Movie</button></Link>
      </Layout>
    )
  }
}

export default Movie
