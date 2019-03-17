import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//you wanna copy this file for componenets
class AddAssignment extends Component {
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
                <h3>Add Assignment</h3>
                <div class="card top7">
                    <h5 class="card-header">New Assignment</h5>
                    <div class="card-body">
                        <form>

                            <div class="form-group row">
                                <label for="nam" class="col-sm-2 col-form-label">Assignment Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="nam" />
                                </div>
                            </div>


                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label class="col-form-label" for="upload1">Upload File</label>
                                    <input type="file" id="upload1" class="form-control-file-lg" onChange={this.handle_FileSelect} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label class="col-form-label" for="Password">Progress</label>
                                    <h4>{Math.round(this.state.load, 2)} %</h4>
                                </div>
                            </div>
                            <button class="btn btn-primary" onClick={this.handle_Upload}>Upload</button>
                        </form>


                    </div>
                </div>

            </div>
        )
    }
}
//export this Component
export default AddAssignment;