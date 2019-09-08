import React, { Component } from 'react'

export default class Post extends Component {
    render() {
        const{title,username,profile_pic} = this.props.list
        
        return (
            <div>
                <h1>{title}</h1>
                <h2>by {username}</h2>
                <p>{profile_pic}</p>
            </div>
        )
    }
}
