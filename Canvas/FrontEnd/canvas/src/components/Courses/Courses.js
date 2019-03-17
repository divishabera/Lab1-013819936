import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import AddCourse from './AddCourse';
import Assignments from './Assignments';
import Announcements from './Announcements';
import Files from './Files';
import ViewAnnouncements from './ViewAnnouncements';
import AddQuiz from './AddQuiz';
import Quiz from './Quiz';
import AddAssignment from './AddAssignment'
import PermissionCode from './PermissionCode';
import Grade from './Grade';
import People from './People'

class Courses extends Component {
    constructor() {
        super();
        this.state = {
            showAssignments: false,
            showAddCourse: false,
            showAnnouncements: false,
            showFiles:false,
            showSearchCourses: false,
            showViewAnnouncementsPage: false,
            showAddQuiz: false,
            showQuiz:false,
            showAddAssignment: false,
            showPermissionCode: false,
            showGrade: false,
            showPeople: false
        }
        this.AssignmentsClick = this.AssignmentsClick.bind(this);
        this.AnnouncementsClick = this.AnnouncementsClick.bind(this)
        this.AddCourseClick = this.AddCourseClick.bind(this)
        this.FilesClick = this.FilesClick.bind(this)
        this.UnShowAll = this.UnShowAll.bind(this)
        this.SearchCoursesClick = this.SearchCoursesClick.bind(this)
        this.ViewAnnouncementsClick =  this.ViewAnnouncementsClick.bind(this)
        this.AddQuizClick = this.AddQuizClick.bind(this)
        this.QuizClick = this.QuizClick.bind(this)
        this.AddAssignmentClick = this.AddAssignmentClick.bind(this)
        this.PermissionCodeClick =  this.PermissionCodeClick.bind(this)
        this.GradeClick =  this.GradeClick.bind(this)
        this.PeopleClick = this.PeopleClick.bind(this)
    }

    PeopleClick = () => {
        this.UnShowAll();
        this.setState({
            showPeople: true
        })
    }
    GradeClick = () => {
        this.UnShowAll();
        this.setState({
            showGrade: true
        })
    }


    PermissionCodeClick = () => {
        this.UnShowAll();
        this.setState({
            showPermissionCode: true
        })
    }

    AddAssignmentClick = () => {
        this.UnShowAll();
        this.setState({
            showAddAssignment: true
        })
    }

    QuizClick = () => {
        this.UnShowAll();
        this.setState({
            showQuiz: true
        })
    }

    AddQuizClick = () => {
        this.UnShowAll();
        this.setState({
            showAddQuiz: true
        })
    }

    ViewAnnouncementsClick = () => {
        this.UnShowAll();
        this.setState({
            showViewAnnouncementsPage: true
        })
    }

    SearchCoursesClick = () => {
        this.UnShowAll();
        this.setState({
            showSearchCourses: true
        })
    }

    AssignmentsClick = () => {
        this.UnShowAll();
        this.setState({
            showAssignments: true
        })
    }

    FilesClick = () => {
        this.UnShowAll();
        this.setState({
            showFiles: true
        })
    }

    AnnouncementsClick = () => {
        this.UnShowAll();
        this.setState({
            showAnnouncements: true
        })
    }

    AddCourseClick = () => {
        this.UnShowAll();
        this.setState({
            showAddCourse: true
        })
    }

    UnShowAll = () => {
        this.setState({
            showAssignments: false,
            showAddCourse: false,
            showAnnouncements: false,
            showFiles:false,
            showSearchCourses: false,
            showViewAnnouncementsPage: false,
            showQuiz:false,
            showAddQuiz:false,
            showAddAssignment: false,
            showPermissionCode: false,
            showGrade : false,
            showPeople: false
        })
    }

    componentDidMount() {
        let mainNav = document.getElementsByClassName("mainnav");
        for (var i = 0; i < mainNav.length; i++) {
            mainNav[i].classList.remove("active");
        } //first we remove for all
        document.getElementById('courses').classList.add('active');
    }

    render() {

        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}
                <div id="wrapper">


                    <ul class="sidebar dii navbar-nav">

                        <li class="nav-item dii"  onClick={() => {this.ViewAnnouncementsClick()}}    >
                            <a class="nav-link" >
                                <i class="fas fa-fw dii fa-bullhorn"></i>
                                <span>Announcements</span>
                            </a>
                        </li>
             
                        <li class="nav-item dii " onClick={this.AssignmentsClick}>
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-journal-whills"></i>

                                <span>Assignments</span>
                            </a>
                        </li>
                        <li class="nav-item dii "onClick={this.GradeClick}>
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-check-circle"></i>

                                <span>Grades</span>
                            </a>
                        </li>
                        <li class="nav-item dii " onClick = {this.PeopleClick}>
                            <a class="nav-link" >
                                <i class="fas fa-fw dii fa-users"></i>

                                <span>People</span>
                            </a>
                        </li>

                        <li class="nav-item dii " onClick={this.FilesClick}>
                            <a class="nav-link" >
                                <i class="fas fa-fw dii fa-file-word"  ></i>

                                <span>Files</span>
                            </a>
                        </li>
                        <li class="nav-item dii " onClick={this.QuizClick}>
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-clipboard-check"></i>
                                <span>Quiz</span>
                            </a>
                        </li>
                        <li class="nav-item dii " onClick={this.AddCourseClick}  >
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-plus"></i>
                                <span>Add Course</span>
                            </a>
                        </li>
                        <li class="nav-item dii " onClick={this.AnnouncementsClick}  >
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-plus"></i>
                                <span>Add Announcements</span>
                            </a>
                        </li>

                        <li class="nav-item dii " onClick={this.AddQuizClick}  >
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-plus"></i>
                                <span>Add Quiz</span>
                            </a>
                        </li>

                        <li class="nav-item dii " onClick={this.AddAssignmentClick}  >
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-plus"></i>
                                <span>Add Assignments</span>
                            </a>
                        </li>
                        <li class="nav-item dii " onClick={this.PermissionCodeClick}  >
                            <a class="nav-link">
                                <i class="fas fa-fw dii fa-barcode"></i>
                                <span>Permission Code</span>
                            </a>
                        </li>
        
        
                    </ul>

                    <div id="content-wrapper">

                        <div class="container-fluid">

                        <ol class="breadcrumb">
           <li class="breadcrumb-item">
            <a href="#">Courses</a>
          </li>
          <li class="breadcrumb-item active">{localStorage.getItem('course')}</li>
        </ol>
                            <h2 name="divisha"></h2>
                        

                            {this.state.showAssignments && <Assignments />}
                            {this.state.showAddCourse && <AddCourse />}
                            {this.state.showAnnouncements && <Announcements />}
                            {this.state.showFiles && <Files />}
                            {this.state.showViewAnnouncementsPage && <ViewAnnouncements />}
                            {this.state.showAddQuiz && <AddQuiz />}
                            {this.state.showQuiz && <Quiz />}
                            {this.state.showAddAssignment && <AddAssignment />}
                            {this.state.showPermissionCode && <PermissionCode />}
                            {this.state.showGrade && <Grade />}
                            {this.state.showPeople && <People/>}
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
//export this Component
export default Courses;