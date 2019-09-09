import React, { Component } from 'react'
import axios from 'axios';

import { connect } from 'react-redux';

 class Form extends Component {
    constructor(){
        super()
        
        this.state = {
            title:'',
            img: '',
            content: '',
            id: 0
        }
    }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
    })
    }

    makePost = () => {
        
        const {title,img,content} = this.state
        const id = this.props.id.id
        const body = {
            title,
            img,
            content,
            id
        }
        axios.post(`http://localhost:8080/api/post/${id}`, body).then(response=> {
            this.props.history.push('/dashboard')
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <label>Title</label>
                <input type='text' name='title' onChange={this.handleChange}/>
                <label>Image URL</label>
                <input type='text' name='img' onChange={this.handleChange}/>
                <label>Content</label>
                <input type='text' name='content' onChange={this.handleChange}/>
                <button onClick={this.makePost}>Post</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
}
export default connect(mapStateToProps)(Form)