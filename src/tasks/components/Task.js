import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Layout from '../../shared/Layout'

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
        console.log(res.data.task.user.id)
        const dateObj = new Date(res.data.task.due_date)
        const formattedDate = dateObj.toLocaleDateString(undefined, options)
        this.setState({
          task: {
            ...res.data.task,
            due_date: formattedDate,
            owner: res.data.task.user.id
          }
        })
      })
      .catch(console.error)
  }

  handleDelete = () => {
    console.log(this.props.match.params.id)
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.props.alert('You deleted a task!', 'success'))
      .then(() => this.props.history.push('/tasks'))
      .catch(() => this.props.alert('Something went wrong :-( ', 'danger'))
  }

  // handleEdit = () => {
  //   console.log(this.props.match.params.id)
  //   axios({
  //     url: `${apiUrl}/tasks/${this.props.match.params.id}`,
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //   })
  //     .then(() => this.props.alert('You deleted a task!', 'success'))
  //     .then(() => this.props.history.push('/tasks'))
  //     .catch(() => this.props.alert('Please check your work ', 'danger'))
  // }

  render () {
    const { task } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button variant="danger" className="mr-2" onClick={this.handleDelete}>Delete</Button>
        <Link to={`/tasks/${this.props.match.params.id}/edit`}>
          <Button>Edit</Button>
        </Link>
        &nbsp;&nbsp;
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
        { console.log(user.id + ' ' + task.owner) }
        {console.log(user)}

        {user && user.id === task.owner ? ownerButtons : <p style={{ color: 'red' }}>{user ? 'You don\'t own this task. Please note that you can only delete or edit tasks that you created.' : 'Sign in to edit your tasks'}</p>}
        <Link to={'/tasks'}>
          <Button>Back to Tasks</Button>
        </Link>
      </Layout>
    )
  }
}

export default withRouter(Task)
