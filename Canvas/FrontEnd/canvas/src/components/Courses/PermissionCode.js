import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//you wanna copy this file for componenets
class PermissionCode extends Component {
    constructor() {
        super();

        var setAdmin = 0;
        ('cookie value', cookie.load('cookie') == 0) ? setAdmin = 0 : setAdmin = 1
        this.state = {
            showAdmin: setAdmin//
        }
    }

    componentDidMount() {

    }

    render() {

        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}
                <h3>Permission Code</h3>
                <button type="button" class="btn btn-info">Generate new code</button>
                <table class="table top7">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Currently Active Codes</th>
                            <th scope="col">Action</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>834um2</td>
                            <td>  <i class="fas fa-fw dii fa-trash-alt"></i> </td>
                      
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>023mve</td>
                            <td> <i class="fas fa-fw dii fa-trash-alt"></i> </td>
                        
                        </tr>
              
                    </tbody>
                </table>
            </div>
        )
    }
}
//export this Component
export default PermissionCode;