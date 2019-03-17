import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//you wanna copy this file for componenets
class Assignments extends Component {
    constructor() {
        super();

        this.state = {
            showAdmin: true,// ('cookie value',cookie.load('cookie') == 0) ? true: false 
            selected_File: null, load: 0,
            showNewSubmission: false,
            showViewSubmission: false,
        }

        this.handle_FileSelect = this.handle_FileSelect.bind(this);
        this.handle_Upload = this.handle_Upload.bind(this);
        this.handle_showNewSubmission = this.handle_showNewSubmission.bind(this);
        this.handle_showViewSubmission = this.handle_showViewSubmission.bind(this);
    }

    handle_showNewSubmission = () => {
        this.setState({ showNewSubmission: true, showViewSubmission: false })
    }

    handle_showViewSubmission = () => {
        this.setState({ showViewSubmission: true, showNewSubmission: false })
    }

    handle_FileSelect = e => {
        this.setState({
            selected_File: e.target.files[0],
            load: 0

        })
    }

    handle_Upload = () => {
        const data = new FormData()

        data.append('file', this.state.selected_File)
        data.append('filename', this.state.selected_File.name)

        axios
            .post('http://localhost:3003/upload', data, {
                onUploadProgress: Progress_Event => {
                    this.setState({
                        load: (Progress_Event.loaded / Progress_Event.total * 100),
                    })
                },
            })
            .then(res => {
                //log(res.status Text)
            })

    }

    componentDidMount() {

    }

    render() {

        const { showNewSubmission } = this.state;
        const { showViewSubmission } = this.state;
        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}


                <h3>Assignments</h3>

                <button type="button" onClick={this.handle_showViewSubmission} class="btn btn-outline-primary btn-lg">View Submission</button>
                <button type="button" onClick={this.handle_showNewSubmission} class="btn btn-outline-success btn-lg">New Submission</button>

                <div style={{ display: (showNewSubmission ? 'block' : 'none') }}>
                    <div class="card">
                        <h5 class="card-header">New Submission</h5>
                        <div class="card-body">
                            <form>
                                <div class="form-row">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Assignment name
  </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#">LAB 1</a>
                                            <a class="dropdown-item" href="#">HW 1</a>
                                            <a class="dropdown-item" href="#">HW 2</a>
                                        </div>
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
                <div style={{ display: (showViewSubmission ? 'block' : 'none') }}>

                    <div class="top7">
                        <div class="card">
                            <h5 class="card-header">Lab 1 </h5>
                            <div class="card-body">

                                <span class="file">  <i class="fas fa-fw dii fa-file"></i>
                                    <a rel="noopener noreferrer" href="http://localhost:3003/pdf" target="_blank">273_Lab1_me.pdf</a> </span>
                            </div>
                        </div>
                    </div>


                </div>


            </div>



        )
    }
}
//export this Component
export default Assignments;