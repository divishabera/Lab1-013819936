import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//you wanna copy this file for componenets
class Quiz extends Component {
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
                <h3>Quiz</h3>

                <div class="card">
                    <h5 class="card-header">1</h5>
                    <div class="card-body">
                        <form onSubmit={this.submit_AnnouncementForm}>

                            <div class="form-group row">
                              
                                <div class="col-sm-10">
                                   <h4>What is the latest version of React JS?</h4>
                                </div>
                            </div>
                            <div class="container">
                            <div class="form-group row">
                                <div class="checkbox">
                                    <label><input type="checkbox" value="" />15.1</label>
                                </div>
                                </div>
                                <div class="form-group row">
                                <div class="checkbox">
                                    <label><input type="checkbox" value="" />16.6</label>
                                </div>
                                </div>
                                <div class="form-group row">
                                <div class="checkbox">
                                    <label><input type="checkbox" value="" />16.6</label>
                                </div>
                                </div>
                                <div class="form-group row">
                                <div class="checkbox ">
                                    <label><input type="checkbox" value=""  />16.2</label>
                                </div>
                                </div>
                                </div>
                            <input type="submit" class="btn dii btn-primary"></input>
                        </form>


                    </div>
                </div>


            </div>
        )
    }
}
//export this Component
export default Quiz;