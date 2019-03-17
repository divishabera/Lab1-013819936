import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//you wanna copy this file for componenets
class AddCourse extends Component {
    constructor() {
        super();
        console.log()
        this.state = {
            showCourseSuccess: false,
            showCourse: true,
            showAdmin: true,// ('cookie value',cookie.load('cookie') == 0) ? true: false 
            cid: 0,
            ccap: 0,
            cname: "",
            cdept: "",
            croom: "",
            cwl: 0,
            cterm:""
        }
        this.submit_CourseForm = this.submit_CourseForm.bind(this);
        this.showCourse = this.showCourse.bind(this);
    }

    submit_CourseForm = (e) => {
        var headers = new Headers();

        e.preventDefault();//to prevents page from refreshing
        const courseData = {
            cid: this.state.cid,
            cname: this.state.cname,
            ccap: this.state.ccap,
            cdept: this.state.cdept,
            croom: this.state.croom,  
            cdesc: this.state.cdesc,
            cwl: this.state.cwl,
            cterm:this.state.cterm     
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/addCourse', courseData)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
     this.setState({showCourseSuccess: true, showCourse:false })
                } else {
                    this.setState({
                      
                    })
                }
            });  
    }

    showCourse=() =>{
        this.setState({showCourseSuccess: false, showCourse:true })
    }

    componentDidMount() {

    }

    cid_ChangeHandler = (e) => {
        this.setState({
            cid : e.target.value
        })
    }

    cname_ChangeHandler = (e) => {
        this.setState({
            cname : e.target.value
        })
    }
    cdept_ChangeHandler = (e) => {
        this.setState({
            cdept : e.target.value
        })
    }
    cdesc_ChangeHandler = (e) => {
        this.setState({
            cdesc : e.target.value
        })
    }
    croom_ChangeHandler = (e) => {
        this.setState({
            croom : e.target.value
        })
    }

    ccap_ChangeHandler = (e) => {
        this.setState({
            ccap : e.target.value
        })
    }
    cwl_ChangeHandler = (e) => {
        this.setState({
            cwl : e.target.value
        })
    }
    cterm_ChangeHandler = (e) => {
        this.setState({
            cterm : e.target.value
        })
    }


    render() {

        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}
                <h3>Add Course</h3>
                { this.state.showCourse && 
                
                <div class="" id="courseForm">

                <form onSubmit={this.submit_CourseForm}>
                    <div class="form-group row">
                        <label for="cid" class="col-sm-2 col-form-label">Course Id</label>
                        <div class="col-sm-10">
                            <input type="text" pattern="[0-9]{3}" onChange = {this.cid_ChangeHandler}  title="Please enter a 3 digit number" autoFocus  class="form-control" id="cid" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cname" class="col-sm-2 col-form-label">Course Name</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.cname_ChangeHandler}  class="form-control" id="cname" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cdept" class="col-sm-2 col-form-label">Course Department</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.cdept_ChangeHandler}  class="form-control" id="cdept" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cdesc" class="col-sm-2 col-form-label">Course Description</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.cdesc_ChangeHandler}  class="form-control" id="cdesc" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="croom" class="col-sm-2 col-form-label">Course Room</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.croom_ChangeHandler}  class="form-control" id="croom" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="ccap" class="col-sm-2 col-form-label">Course Capacity</label>
                        <div class="col-sm-10">
                            <input type="number" min="1" step="1" onChange = {this.ccap_ChangeHandler}   title="Please enter numbers"   class="form-control" id="ccap" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cwl" class="col-sm-2 col-form-label">Waitlist Capacity</label>
                        <div class="col-sm-10">
                            <input type="number" min="1" step="1" onChange = {this.cwl_ChangeHandler}   title="Please enter numbers"   class="form-control" id="cwl" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cterm" class="col-sm-2 col-form-label">Course Term</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.cterm_ChangeHandler}  class="form-control" id="cterm" required />
                        </div>
                    </div>


                    <input type="submit" class="btn dii btn-primary"></input>
                </form>                 
                  
                </div>
            }

                { this.state.showCourseSuccess && <div id="courseSuccess" class=" top5 alert alert-success" role="alert">
                         <strong>Done!</strong> Course added sucessfully!
                         <br/>
                         <button  type="button" onClick= {this.showCourse} class="top7 btn btn-success">Add another</button>
                    </div> }

                
              
            

            </div>
        )
    }
}
//export this Component
export default AddCourse;