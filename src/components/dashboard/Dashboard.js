import React, { Component } from 'react'
import Post from '../post/Post'
import axios from 'axios'

import{connect} from 'react-redux'

class Dashboard extends Component {
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
        if(this.props.id.id){
        this.setState({
            id: this.props.id.id
        })
    }
    
    }


    getPosts = () => {
        axios.get('http://localhost:8080/api/posts')
        .then(response => {          
            this.setState({
                posts: response.data,
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
        axios.get(`http://localhost:8080/api/posts/id/${search}`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    trueNoSearch = () => {
       
        
        const {id} = this.props
        
        
        axios.get(`http://localhost:8080/api/posts/${id}`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    checkSearch = () => {

        if(this.state.myPosts === false && this.state.search !== ''){
            this.trueSearch()
        }
         else if (this.state.myPosts === true && this.state.search !== ''){
            this.falseSearch()
        } else if (this.state.myPosts === false && this.state.search === ''){
            this.trueNoSearch()
        }else {}
    }

    myPost = () => {
        this.setState({
            myPosts: !this.state.myPosts
        })
        
        if(this.myPosts === true){            
            this.getPosts()

        }
        else {this.trueNoSearch()}
       
    }
    render() {
        // console.log(this.state.myPosts)
    //    console.log(this.state.posts)
    //    console.log(this.state.id)
      
        
        const mappedPosts = this.state.posts.map((list, index) => {
            return (
                <Post key={index} list={list}/>
            )
            
        })
        
        

        return (
            <div>
            <div className='dash'>
                <div>
                <input onChange={this.handleChange}></input>
                <button onClick={this.checkSearch}>search</button>
                <button>Reset</button>
                </div>
                <label>My Posts</label>
                <input type="checkbox" onClick={this.myPost}></input>
                
            </div>
            {mappedPosts}
            </div>
        )
    }
}
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Dashboard)