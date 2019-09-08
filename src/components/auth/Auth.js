import React, { Component } from 'react'
import axios from 'axios'


import{connect} from 'react-redux'
import {updateUser} from '../../redux/reducer'

class Auth extends Component {
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            profile_pic: ''
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = () =>{
       
        const {username, password} = this.state
        axios.post('http://localhost:8080/auth/register', {username, password})
        .then(response =>{
            this.props.updateUser(response.data)
            this.props.history.push('/dashboard')        
        })
        this.setState({
            username:'',
            password: '',
        })
    }

    login = () => {
        const {username, password} = this.state
        axios.post('http://localhost:8080/auth/login', {username, password})
        .then(response => {
            this.props.updateUser(response.data)
            this.props.history.push('/dashboard')
        })
    }

    render() {
     
        return (
            <div>
             
                <input type='text' 
                 placeholder='Username'
                 name='username'
                 value={this.state.username}
                 onChange={this.handleChange}>                    
                </input>

                <input type='text' 
                 placeholder='Password'
                 name='password'
                 value={this.state.password}
                 onChange={this.handleChange}>                     
                 </input>

                <button onClick={this.login}>login</button>

                <button onClick={this.register}>register</button>
            </div>
        )
    }
}




export default connect(null, {updateUser})(Auth)