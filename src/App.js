import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Tasks from './tasks/components/Tasks'
// import Task from './tasks/components/Task'
import CreateTask from './tasks/components/CreateTask'

import EditTask from './tasks/components/EditTask'

import Alert from 'react-bootstrap/Alert'
import Task from './tasks/components/Task'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path="/" render={() => (
            <Tasks user={user} />
          )} />
          <Route exact path="/Tasks" render={() => (
            <Tasks user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/tasks/:id' render={() => (
            <Task exact alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path="/createtask" render={() => (
            <CreateTask exact user={user} alert={this.alert} />
          )} />
          <AuthenticatedRoute
            user={user}
            exact path="/tasks/:id"
            render={() =>
              <EditTask exact alert={this.alert} user={user} />}
          />
        </main>
      </React.Fragment>
    )
  }
}

export default App
// Go back to using exact path="/tasks/:id/edit" for the last route
