import React, { Component } from 'react'
import Layout from '../shared/Layout'
import TaskForm from '../shared/TaskForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class TaskCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movie: {
        title: '',
        director: '',
        year: ''
      },
      createdTaskId: null
    }
  }
  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // create an object with updated field

    // use object to create updated state object
    const editedTask = Object.assign(this.state.movie, updatedField)

    // finally setState with updated object
    this.setState({ movie: editedTask })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.post(`${apiUrl}/tasks`, {
      movie: this.state.movie

    })
      .then(res => this.setState({
        createdTaskId: res.data.movie.id
      }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { movie, createdTaskId } = this.state

    if (createdTaskId) {
      return <Redirect to={`/tasks/${createdTaskId}`} />
    }

    return (
      <Layout>
        <h4>Create a new movie</h4>
        <TaskForm
          movie={movie}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath = "/"
        />
      </Layout>
    )
  }
}
export default TaskCreate
