import React, { Component } from 'react'
import routes from './routes'
import Nav from './components/nav/Nav'
import 'reset-css'
import './App.css'



export default class App extends Component {
  render() {
    return (
      <div>
        <div className='nav-container'>
        <Nav/>
        </div>
        <div className='app-container'>
        {routes}
        </div>
      </div>
    )
  }
}
