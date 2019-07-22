import React, { Component } from 'react'
import Layout from '../shared/Layout'
import MovieForm from '../shared/MovieForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class MovieCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movie: {
        title: '',
        director: '',
        year: ''
      },
      createdMovieId: null
    }
  }
  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // create an object with updated field

    // use object to create updated state object
    const editedMovie = Object.assign(this.state.movie, updatedField)

    // finally setState with updated object
    this.setState({ movie: editedMovie })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.post(`${apiUrl}/movies`, {
      movie: this.state.movie

    })
      .then(res => this.setState({
        createdMovieId: res.data.movie.id
      }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { movie, createdMovieId } = this.state

    if (createdMovieId) {
      return <Redirect to={`/movies/${createdMovieId}`} />
    }

    return (
      <Layout>
        <h4>Create a new movie</h4>
        <MovieForm
          movie={movie}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath = "/"
        />
      </Layout>
    )
  }
}
export default MovieCreate
