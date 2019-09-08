import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends Component {
    
    render() {
       if(this.props.location.pathname !== '/'){
           
        return (
            <div>
                <img src = {this.props.profile_pic} alt={this.props.id.username}></img>
                <p>{this.props.id.username}</p>
                
               <Link to='/dashboard'><button>Home</button></Link>
               <Link to='/new'><button>New</button></Link>
               <Link to='/'><button>Logout</button></Link>               
            </div>
        )
       }else {return null}
    }
}

    function mapStateToProps(state){
        return state
    }

export default withRouter(connect(mapStateToProps)(Nav))
