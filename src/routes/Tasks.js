import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'

import axios from 'axios'
import apiUrl from '../../apiConfig'

class tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tasks: [],
      loaded: false,
      error: null
    }
  }

  async componentDidMount () {
    // // api request!!
    // axios(`${apiUrl}/tasks`)
    //   .then(res => this.setState({ tasks: res.data.tasks, loaded: true }))
    //   .catch(err => this.setState({ error: err.message }))
    try {
      const response = await axios(`${apiUrl}/tasks`)
      this.setState({ tasks: response.data.tasks, loaded: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: err.message })
    }
  }
  render () {
    const { tasks, error, loaded } = this.state

    const tasksList = tasks.map(task => (
      <li key={task.id}>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </li>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }
    if (tasks.length === 0) {
      return <p>No tasks yet!!</p>
    }

    if (error) {
      return <p>Error: {error}</p>
    }

    return (
      <Layout>
        <h4>tasks</h4>
        <ul>
          {tasksList}
        </ul>
      </Layout>
    )
  }
}

export default tasks
