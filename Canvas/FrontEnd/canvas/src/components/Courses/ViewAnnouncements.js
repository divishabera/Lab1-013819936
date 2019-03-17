import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//you wanna copy this file for componenets
class ViewAnnouncements extends Component {
    constructor(){
        super();
       
        this.state = {  
        showAdmin : true,// ('cookie value',cookie.load('cookie') == 0) ? true: false 
        showNewAnnouncement: false,
        showViewAnnouncement:false,
        heading:"",
        the_body:"",
        announcements: []
    }
        this.submit_AnnouncementForm = this.submit_AnnouncementForm.bind(this);
        this.handle_showNewAnnouncement = this.handle_showNewAnnouncement.bind(this);
        this.handle_showViewAnnouncement = this.handle_showViewAnnouncement.bind(this);
    }  

    componentDidMount() {

this.LoadAnnouncements();
    
      }

      LoadAnnouncements(){
        var idParam =  localStorage.getItem('course')  
        axios.get('http://localhost:3003/getAnnouncements'
          , { params: { id: idParam } }
        )
          .then((response) => {
            //update the state with the response data
            this.setState({
              announcements: response.data
            });
          });
      }

    head_ChangeHandler = (e) => {
        this.setState({
            heading : e.target.value
        })
    }

    body_ChangeHandler = (e) => {
        this.setState({
            the_body : e.target.value
        })
    }


    handle_showNewAnnouncement=() => {
        this.setState({showNewAnnouncement: true, showViewAnnouncement:false})        
    }

    handle_showViewAnnouncement=() => {
        this.setState({showViewAnnouncement: true, showNewAnnouncement : false})   
        this.LoadAnnouncements(); 
    }

    submit_AnnouncementForm = (e) => {
        var headers = new Headers();

        e.preventDefault();//to prevents page from refreshing
        const announcementData = {
            heading: this.state.heading,
            the_body: this.state.the_body,
            courseId: localStorage.getItem('course')  
        }   
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data
             axios.post('http://localhost:3003/addAnnouncement', announcementData)
                 .then(response => {
                    
                     if (response.status === 200) {
                        //announcement added
                        alert("Announcement added");
                        this.setState({
                            the_body : "",
                            heading: "",
                        })
                     } else {
                         this.setState({
                           
                         })
                     }
                 });  
    }
 


    render(){
     
        const { showViewAnnouncement } = this.state;
        let redirectVar = null;

        let announcementsDisplayed = this.state.announcements.map(announcement => {
            return (
                <div class="top7">
      <div class="card">
                <h5 class="card-header">{announcement.heading} </h5>
                    <div class="card-body">
                    {announcement.body}
                    </div>
                </div>
                </div>
            )})


        if(!cookie.load('cookie')){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
        return(
            <div>
                {redirectVar}
                <h3>Announcements</h3>
                <button type="button" onClick={this.handle_showViewAnnouncement} class="btn btn-outline-primary btn-lg">View Announcements</button>

                <div style={{ display: (showViewAnnouncement ? 'block' : 'none') }}>

          {announcementsDisplayed}
                </div>

            </div> 
        )
    }
}
//export this Component
export default ViewAnnouncements;