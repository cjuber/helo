import React, { Component } from 'react'
import Post from '../post/Post'
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(){
        super()
        this.state={
            search: '',
            myPosts: true,
            posts: [],
            id: 0
        }
    }

    componentDidMount(){
        this.getPosts()
    }


    getPosts = () => {
        axios.get('http://localhost:8080/api/posts')
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
        
    }
    trueSearch = () => {
       
        const {id, search} = this.state
        axios.get(`http://localhost:8080/api/posts/${id}/${search}`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    falseSearch = () => {
        
        const {search} = this.state
        axios.get(`http://localhost:8080/api/posts/${search}`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    trueNoSearch = () => {
        
        const {id} = this.state
        axios.get(`http://localhost:8080/api/posts/${id}`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    checkSearch = () => {

        if(this.state.myPosts === true && this.state.search !== ''){
            this.trueSearch()
        }
         else if (this.state.myPosts === false && this.state.search !== ''){
            this.falseSearch()
        } else if (this.state.myPosts === true && this.state.search === ''){
            this.trueNoSearch()
        }else {}
    }

    myPost = () => {
        this.setState({
            myPosts: !this.state.myPosts
        })
    }
    render() {

        console.log(this.state.myPosts)
        console.log(this.state.search)
        const mappedPosts = this.state.posts.map((list, index) => {
            return (
                <Post key={index} list={list}/>
            )
            
        })
        
        

        return (
            <div>
                <input onChange={this.handleChange}></input>
                <button onClick={this.checkSearch}>search</button>
                <button>Reset</button>
                <label>My Posts</label>
                <input type="checkbox" onClick={this.myPost}></input>
                {mappedPosts}
            </div>
        )
    }
}
