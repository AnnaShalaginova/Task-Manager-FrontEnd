import React, { Component } from 'react'
import TaskForm from '../shared/TaskForm'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import { Redirect } from 'react-router-dom'

// Step 1: initialize constructor, state
class TaskEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        title: '',
        director: '',
        year: ''
      },
      edited: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => this.setState({ task: res.data.task }))
      .catch(console.error)
  }
  handleChange = event => {
    const updatedField = {
      // square brackets because it's a variable name
      [event.target.name]: event.target.value
    }
    const editedTask = Object.assign(this.state.task, updatedField)
    this.setState({ task: editedTask })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.patch(`${apiUrl}/tasks/${this.props.match.params.id}`, {
      task: this.state.task
    })
      .then(res => this.setState({
        task: res.data.task,
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
  //   const editedTask = Object.assign(this.state.task, updatedField)
  //  // finally setState with updated object
  //   this.setState({ task: editedTask })
  // }
  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios.post(`${apiUrl}/tasks`, {
  //     task: this.state.task
  //
  //   })
  //     .then(res => this.setState({
  //       createdTaskId: res.data.task.id
  //     }))
  //     .catch(console.error)
  // }
  // Step 2: render function to display/return jsx
  render () {
    const { handleChange, handleSubmit } = this
    const { task, edited } = this.state

    if (edited) {
      return <Redirect to={
        {
          pathname: `/tasks/${this.props.match.params.id}`,
          state: {
            msg: 'Updated task!'
          }
        }
      } />
    }

    return (
      // Layout & TaskForm
      // Step 2.a reuse Taskform
      <Layout>
        <h3>Edit your task:</h3>
        <TaskForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/tasks/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
  // Step 2.a reuse TaskForm
  // Step 3: populate from - GET request
  // Step 3.a: update state from successfully API response
  // Step 4: handleChange, handleSubmit

  // Step 5: on submit - update state & handle redirect in render
}
export default TaskEdit
