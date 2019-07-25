import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import Layout from '../../shared/Layout'

class CreateTask extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        title: '',
        description: '',
        status: '',
        due_date: '',
        notes: '',
        user_id: ''
      },
      createdTaskId: null
    }
  }

handleChange = event => {
  const updatedField = {
    [event.target.name]: event.target.value
  }
  const editedTask = Object.assign(this.state.task, updatedField)
  this.setState({ task: editedTask })
}

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/tasks`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { task: this.state.task }
    })
      .then(res => this.setState({ createdTaskId: res.data.task.id, task: null }))
      .then(() => this.props.alert('You created a new task', 'warning'))
      .catch(console.error)
  }

  render () {
    const { createdTaskId, task } = this.state

    if (createdTaskId) {
      return <Redirect to={`/tasks/${createdTaskId}`} />
    }

    return (
      <Layout md="8" lg="6">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={this.handleChange}
              value={task.title}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Get more cookies"
              name="description"
              onChange={this.handleChange}
              value={task.description}
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Close to completion"
              name="status"
              onChange={this.handleChange}
              value={task.status}
            />
          </Form.Group>
          <Form.Group controlId="due_date">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="09-15-2025"
              name="due_date"
              onChange={this.handleChange}
              value={task.firstPublished}
            />
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="notes"
                name="notes"
                onChange={this.handleChange}
                value={task.notes}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default CreateTask
