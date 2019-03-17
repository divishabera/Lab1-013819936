import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//you wanna copy this file for componenets
class Grade extends Component {
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
                 <h3>Grades</h3>
                 <table class="table top7">
                    <thead class="thead">
                        <tr>
                
                            <th scope="col">Assignment</th>
                            <th scope="col">Grade</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                         
                            <td>LAB 1</td>
                            <td> 100/100 </td>
                      
                        </tr>
                        <tr>

                            <td>HW 1</td>
                            <td> Not Graded </td>
                        </tr>
              
                    </tbody>
                </table>
                <table class="table top7">
                    <thead class="thead">
                        <tr>
                
                            <th scope="col">Overall Score</th>
                            
                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                         
                            <td>100 %</td>
                   
                      
                        </tr>
                
              
                    </tbody>
                </table>
            </div> 
        )
    }
}
//export this Component
export default Grade;