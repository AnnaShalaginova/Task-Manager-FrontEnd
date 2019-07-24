import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Layout from '../../shared/Layout'

class EditTask extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        id: '',
        title: '',
        description: '',
        status: '',
        due_date: '',
        notes: '',
        user_id: ''
      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/tasks/${this.props.match.params.id}`)
      .then(res => {
        const dateObj = new Date(res.data.task.due_date)
        const formattedDate = dateObj.toISOString().substring(0, 10)
        this.setState({
          task: {
            ...res.data.task,
            due_date: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  handleChange = event => (
    this.setState({
      task: {
        ...this.state.task,
        [event.target.name]: event.target.value
      }
    })
  )

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { task: this.state.task }
    })
      .then(() => this.props.history.push(`/tasks/${this.state.task.id}`))
      .then(() => this.props.alert('Amazing! You edited a task.', 'success'))
      .catch(() => this.props.alert('Still needs work.', 'danger'))
  }

  render () {
    const { task } = this.state

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
                value={task.status}
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

export default withRouter(EditTask)
