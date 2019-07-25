import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import Layout from '../../shared/Layout'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      filtered: false,
      sorted: false
    }
  }
  // {
  //   user ? (
  //     <div>
  //       <Button variant="outline-secondary" href="#createbook" className="mr-2">
  //         <i className="icofont-ui-add"></i>
  //       </Button>
  //       <Button variant={filtered ? 'outline-primary' : 'outline-secondary'} onClick={this.handleFilter} className="mr-2">
  //         <i className="icofont-filter"></i>
  //       </Button>
  //       <Button variant={sorted ? 'outline-primary' : 'outline-secondary'} onClick={this.handleSort}>
  //         <i className="icofont-sort"></i>
  //       </Button>
  //     </div>
  //   ) : (
  //     <Button variant={sorted ? 'outline-primary' : 'outline-secondary'} onClick={this.handleSort}>
  //       <i className="icofont-sort"></i>
  //     </Button>
  //   )
  // }

  componentDidMount () {
    axios(`${apiUrl}/tasks`)
      .then(res => this.setState({ tasks: res.data.tasks }))
      .catch(console.error)
  }

  handleSort = event => {
    event.preventDefault()
    this.setState({ tasks: this.state.tasks.reverse(), sorted: !this.state.sorted })
  }

  handleFilter = event => {
    event.preventDefault()
    this.setState({ filtered: !this.state.filtered })
  }

  render () {
    const { tasks, filtered } = this.state
    const { user } = this.props

    const taskArray = tasks.map(task => (
      <ListGroup.Item
        className={filtered && !(user.id === task.user_id) ? 'd-none' : ''}
        key={task.id}
        action
        as={Link}
        to={`/tasks/${task.id}`}
      >
        {task.title}
      </ListGroup.Item>
    ))
    return (
      <Layout md="8" lg="6">
        <div className="d-flex justify-content-between mb-2">
          <h3>Tasks</h3>

        </div>
        <ListGroup>
          {taskArray}
        </ListGroup>
      </Layout>
    )
  }
}

export default Tasks
