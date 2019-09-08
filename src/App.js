import React, { Component } from 'react'
import routes from './routes'
import Nav from './components/nav/Nav'
import 'reset-css'



export default class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        {routes}
        
      </div>
    )
  }
}
