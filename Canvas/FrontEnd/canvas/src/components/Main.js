
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavLayout from './LandingPage/NavLayout';
import Home from './Home/Home';
import Register from './Login/Register';
import Login from './Login/Login';
import Courses from './Courses/Courses';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';
import cookie from 'react-cookies';
import SearchCourses from './Courses/SearchCourses';

class Main extends Component {


  handleNavClick = (param) => { 

    localStorage.setItem('course', param);

  }




  handleLogout = () => {
    cookie.remove('cookie', { path: '/' })
    let mainNav = document.getElementsByClassName("mainnav");
    for (var i = 0; i < mainNav.length; i++) {
      mainNav[i].classList.remove("active");
    } //we remove for all
  }
  render() {
    return (
      <div>
        {/*Renders component on the basis of route here*/}


        <div id="wrapper">

          <ul class="sidebar dii navbar-nav">

            <li class="nav-item dii active">
              <a class="nav-link" href="home">

                <h4>CANVAS</h4>
              </a>

            </li>

            <li id="dashboard"  class="nav-item dii mainnav">
              <a class="nav-link" href="dashboard">
                <i class="fas fa-fw dii fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li id="account" class="nav-item mainnav">
              <a class="nav-link" href="profile">
                <i class="fas fa-fw fa-user"></i>
                <span>Account</span></a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-fw fa-folder"></i>
                <span>Courses</span>
              </a>
              <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                <h6 class="dropdown-header">Courses Registered:</h6>
                <a class="dropdown-item" onClick={() => {this.handleNavClick('273')}} href="courses">273</a>
                <a class="dropdown-item" onClick={() => {this.handleNavClick('245')}} href="courses">257</a>
              </div>
            </li>

            <li id="courses"  class=" d-none nav-item mainnav">
              <a class="nav-link" href="courses">
                <i class="fas fa-fw fa-book"></i>
                <span>Courses</span></a>
            </li>

            <li id="search" class="mainnav nav-item">
              <a class="nav-link" href="searchcourses">
                <i class="fas fa-fw fa-search"></i>
                <span>Search Courses</span></a>
            </li>

            <li id="sign" onClick={this.handleLogout} class="mainnav nav-item">
              <a class="nav-link" href="login">
                <i class="fas fa-fw fa-sign-out-alt"></i>
                <span>Sign In/Out</span></a>
            </li>
          </ul>

          <div id="content-wrapper">

            <div class="container-fluid">

              <p name="divisha"></p>
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/register" component={Register} />
              <Route path="/courses" component={Courses} />
              <Route path="/searchcourses" component={SearchCourses} />

            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default Main;