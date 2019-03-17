import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//you wanna copy this file for componenets
class People extends Component {
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
                 <h3>People</h3>
                 <table class="table top7">
                    <thead class="thead">
                        <tr>
                
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                         
                         <td><i class="fas fa-user"></i> <span class="left5">Divisha Bera</span></td>
                         <td>Student</td>
                   
                     </tr>
                    <tr>
                         
                    <td><i class="fas fa-user"></i> <span class="left5">Lee Jong Suk</span></td>
                         <td>Student</td>
                   
                     </tr>
                        <tr>
                         
                            <td><i class="fas fa-user-shield"></i><span class="left5">Sang Shim</span></td>
                            <td>Faculty</td>
                      
                        </tr>
                
              
                    </tbody>
                </table>
            </div> 
        )
    }
}
//export this Component
export default People;