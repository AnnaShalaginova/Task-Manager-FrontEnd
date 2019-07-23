import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'

class Task extends Component {
  constructor (props) {
    super(props)
    this.state = {
      task: {
        title: '',
        description: '',
        status: '',
        due_date: '',
        notes: '',
        owner: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => {
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
        const dateObj = new Date(res.data.task.due_date)
        const formattedDate = dateObj.toLocaleDateString(undefined, options)
        this.setState({
          task: {
            ...res.data.task,
            due_date: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  handleDelete = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.props.alert('You deleted a task!', 'success'))
      .then(() => this.props.history.push('/tasks'))
      .catch(() => this.props.alert('Something went wrong :-( ', 'danger'))
  }

  render () {
    const { task } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button variant="danger" className="mr-2" onClick={this.handleDelete}>Delete</Button>
        <Link to={`/tasks/${this.props.match.params.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    )

    return (
      <Layout md="8" lg="6">
        <h3>Task Details</h3>
        <h4>Title: {task.title}</h4>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
        <p>Due Date: {task.due_date}</p>
        <p>Notes: {task.notes}</p>
        {user && user._id === task.owner ? ownerButtons : <p>{user ? 'You don\'t own this task' : 'Sign in to edit your tasks'}</p>}
      </Layout>
    )
  }
}

export default withRouter(Task)
