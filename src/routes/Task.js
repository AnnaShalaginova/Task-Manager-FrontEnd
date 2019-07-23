import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => this.setState({ task: res.data.task }))
      .catch(err => this.setState({ error: err.stack }))
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  // deleteTask () {
  //   axios.delete(`${apiUrl}/tasks/${this.props.match.params.id}`)
  //     .then(console.log('The task has been deleted'))
  //     .catch(err => this.setState({ error: err.stack }))
  // }

  render () {
    const { task, error, deleted } = this.state

    if (error) {
      return <p>ERROR: {error}</p>
    }

    if (!task) {
      return <p>Loading...</p>
    }
    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Task Successfully Deleted!!' } }
      }/>
    }

    return (
      <Layout>
        <h4>{task.title}</h4>
        <p>Date released: {task.year}</p>
        <p>Directed by: {task.director}</p>
        <Link to="/tasks">Back to all the tasks</Link>
        <button onClick={this.destroy}>DELETE MOVIE</button>
        <Link to={ `/tasks/${this.props.match.params.id}/edit` }>
          <button>Edit Task</button></Link>
      </Layout>
    )
  }
}

export default Task
