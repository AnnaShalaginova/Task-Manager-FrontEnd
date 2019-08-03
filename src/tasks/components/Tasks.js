import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

    const App = () => {
      const [showMore, setShowMore] = useState(true);

      const taskArray = tasks.map((item, i) => {
        const classes = !showMore ? "d-none" : "";
        return (
          <ListGroup.Item key={i} className={i > 2 ? classes : ""}>
            {item.task}
          </ListGroup.Item>
        );
      });

      const toggleList = () => setShowMore(!showMore);

      return (
        <Row className="mt-5">
          <Col>
            <h1 className="display-4 text-center">All Tasks</h1>
            <ListGroup>{items}</ListGroup>
            <Button block onClick={toggleList}>
              more
            </Button>
          </Col>
        </Row>
      );
    };

export default Tasks
