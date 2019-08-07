import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import Layout from '../../shared/Layout'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      filtered: false,
      sorted: false,
      showMore: false
    }
  }

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

  toggleList = () => this.setState({ showMore: !this.state.showMore })

  render () {
    const { tasks, showMore } = this.state
    const classes = !showMore ? 'd-none' : ''

    return (
      <Row className="mt-5">
        <Col>
          <h1 className="display-4 text-center">All Tasks</h1>
          <ListGroup>
            {tasks.map((item, i) => (
              <ListGroup.Item key={i} className={i > 4 ? classes : ''}>
                {item.title}
              </ListGroup.Item>
            )
            )}
          </ListGroup>
          <Button block onClick={this.toggleList}>
            more
          </Button>
        </Col>
      </Row>
    )
  }
}

export default Tasks
