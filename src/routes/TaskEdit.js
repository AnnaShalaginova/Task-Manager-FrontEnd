import React, { Component } from 'react'
import MovieForm from '../shared/MovieForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import { Redirect } from 'react-router-dom'

// Step 1: initialize constructor, state
class MovieEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        title: '',
        director: '',
        year: ''
      },
      edited: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/movies/${this.props.match.params.id}`)
      .then(res => this.setState({ movie: res.data.movie }))
      .catch(console.error)
  }
  handleChange = event => {
    const updatedField = {
      // square brackets because it's a variable name
      [event.target.name]: event.target.value
    }
    const editedMovie = Object.assign(this.state.movie, updatedField)
    this.setState({ movie: editedMovie })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.patch(`${apiUrl}/movies/${this.props.match.params.id}`, {
      movie: this.state.movie
    })
      .then(res => this.setState({
        movie: res.data.movie,
        edited: true
      }))
      .catch(console.error)
  }

  // handleChange = event => {
  //   const updatedField = {
  //     [event.target.name]: event.target.value
  //   }
  //   // create an object with updated field
  //   // use object to create updated state object
  //   const editedMovie = Object.assign(this.state.movie, updatedField)
  //  // finally setState with updated object
  //   this.setState({ movie: editedMovie })
  // }
  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios.post(`${apiUrl}/movies`, {
  //     movie: this.state.movie
  //
  //   })
  //     .then(res => this.setState({
  //       createdMovieId: res.data.movie.id
  //     }))
  //     .catch(console.error)
  // }
  // Step 2: render function to display/return jsx
  render () {
    const { handleChange, handleSubmit } = this
    const { movie, edited } = this.state

    if (edited) {
      return <Redirect to={
        {
          pathname: `/movies/${this.props.match.params.id}`,
          state: {
            msg: 'Updated movie!'
          }
        }
      } />
    }

    return (
      // Layout & MovieForm
      // Step 2.a reuse Movieform
      <Layout>
        <h3>Edit your movie:</h3>
        <MovieForm
          movie={movie}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/movies/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
  // Step 2.a reuse MovieForm
  // Step 3: populate from - GET request
  // Step 3.a: update state from successfully API response
  // Step 4: handleChange, handleSubmit

  // Step 5: on submit - update state & handle redirect in render
}
export default MovieEdit
