import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//you wanna copy this file for componenets
class Home extends Component {
    constructor(){
        super();
 
        var setAdmin = 0;
        ('cookie value',cookie.load('cookie') == 0) ? setAdmin = 0: setAdmin = 1 
        this.state = {  
        showAdmin : setAdmin//
        }
    }  
 
    componentDidMount(){
     
    }

    render(){
        
        let redirectVar = null;
        if(!cookie.load('cookie')){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
        return(
            <div>
                {redirectVar}
                 <h2>Welcome <a href="profile">Divisha</a></h2>
                 <div><h2 className={this.state.showAdmin ? '' : 'hidden'}>You are Faculty <i class="fas fa-suitcase"></i></h2></div>
                 <div><h2 className={this.state.showAdmin ? 'hidden' : ''}>You are Student <i class="fas fa-chalkboard-teacher"></i></h2></div>

            </div> 
        )
    }
}
//export this Component
export default Home;