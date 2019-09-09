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
            <div className='auth-container'>
                <div className='auth-top'>
                <img className='auth-img'></img>
                <h1 className='helo'>Helo</h1>
                </div>
                <div className='username'>
                <label>Username:</label>
                <input type='text' 
                 placeholder='Username'
                 name='username'
                 value={this.state.username}
                 onChange={this.handleChange}>                    
                </input>
                </div>
                <div className='password'>
                <label>Password:</label>
                <input type='text' 
                 placeholder='Password'
                 name='password'
                 value={this.state.password}
                 onChange={this.handleChange}>                     
                 </input>
                 </div>
                 <div className='auth-btns'>
                <button className='authBtn' onClick={this.login}>login</button>

                <button className='authBtn' onClick={this.register}>register</button>
                </div>
            </div>
        )
    }
}




export default connect(null, {updateUser})(Auth)