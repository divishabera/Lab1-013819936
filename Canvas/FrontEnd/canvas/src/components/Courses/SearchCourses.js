import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class SearchCourses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    }
    this.filterList = this.filterList.bind(this);
    this.registerCourse = this.registerCourse.bind(this);
    this.updateCourses = this.updateCourses.bind(this);


  }

  componentDidMount() {

    var emailParam = cookie.load('emailID')
    axios.get('http://localhost:3003/getCourses'
      , { params: { id: emailParam } }
    )
      .then((response) => {
        //update the state with the response data
        this.setState({
          courses: this.state.courses.concat(response.data)
        });
      });

  }


  registerCourse(id, name, email, event) {
   

    const courseData = {
      ID: id,
      Name: name,//has the email  
      userID: "1",
      userEmail: email
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3003/registerCourses', courseData)
      .then(response => {

        if (response.status === 200) {
          this.updateCourses(); //update list

        } else {

        }
      });
  }

  filterList = (event) => {
    if(event.target.value == undefined || event.target.value == null || event.target.value == '')
    {
      this.updateCourses();
    }

    let updatedList = this.state.courses.map(a => a.ID);
    updatedList = updatedList.filter(function (item) {
      return item.toString().toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });

    var newList = []

    for (var id in updatedList) {
      var result = this.state.courses.find(x => x.ID === updatedList[id])
      if (result != undefined) {
        newList.push({ ID: updatedList[id], Name: result.Name , Status: result.Status})
      }
    }

    this.setState({ courses: newList });
  }

  updateCourses = () =>{

    var emailParam = cookie.load('emailID')
    axios.get('http://localhost:3003/getCourses'
      , { params: { id: emailParam } }
    )
      .then((response) => {
        //update the state with the response data
        this.setState({
          courses: response.data
        });
      });
  }

  render() {
    var emailID = cookie.load('emailID');
    let coursesDisplayed = this.state.courses.map(course => {
      return (
        <div class="col-xl-3 col-sm-6 mb-3">
          <div class="card text-white bg-primary o-hidden h-100">
            <div class="card-body">
              <div class="card-body-icon">
                <i class="fas fa-fw fa-book-open"></i>
              </div>
              <div class="mr-5">Course {course.ID} {course.Name}</div>
            </div>
            {course.Status == undefined || course.Status == null ?
              <a class="card-footer pointer  text-white clearfix  z-1" onClick={this.registerCourse.bind(this, course.ID, course.Name, emailID)}>

                <span class="float-left">Register</span>
                <span class="float-right">
                  <i class="fas fa-angle-right"></i>
                </span>
              </a>
              : (course.Status == 'Normal' ?
                <a class="card-footer pointer bg-success  text-white clearfix z-1" >
                  <span class="float-left">Registered</span>            
                </a>
                : (course.Status == 'WL' ?
                  <a class="card-footer pointer bg-warning text-white clearfix  z-1" >
                    <span class="float-left">Waitlisted</span>             
                  </a>
                  :
                  null))}


          </div>
        </div>
      )
    })


    let redirectVar = null;
    if (!cookie.load('cookie')) { //should be !cookie
      redirectVar = <Redirect to="/login" /> //not logged in then rediect
    }
    return (
      <div >
        {redirectVar}

        <div class="row container">
          <form>
            <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList} />
            </fieldset>
          </form>
        </div>


        <div class="row">


          {coursesDisplayed}

        </div>


      </div>
    )
  }
}
//export this Component
export default SearchCourses;