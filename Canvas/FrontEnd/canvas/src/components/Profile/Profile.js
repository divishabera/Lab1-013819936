import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            email : cookie.load('emailID'),
            name : "",
            gender: "",
            phone : 0,
           aboutme : "",
           city : "",
           country: "",
            company : "",
            school : "",
             hometown : "",
              languages : "",
         
        }
        this.submit_profile = this.submit_profile.bind(this);
        
    }

    componentDidMount() {
        let mainNav = document.getElementsByClassName("mainnav");
        for (var i = 0; i < mainNav.length; i++) {
         mainNav[i].classList.remove("active");
          } //first we remove for all
        document.getElementById('account').classList.add('active');
      
        //now we want to initialize the

    }

    name_ChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    gender_ChangeHandler = (e) => {
        this.setState({
            gender : e.target.value
        })
    }

    phone_ChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    aboutme_ChangeHandler = (e) => {
        this.setState({
            aboutme : e.target.value
        })
    }

    city_ChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    country_ChangeHandler = (e) => {
        this.setState({
            country : e.target.value
        })
    }

    company_ChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }
    school_ChangeHandler = (e) => {
        this.setState({
            school : e.target.value
        })
    }

    hometown_ChangeHandler = (e) => {
        this.setState({
            hometown : e.target.value
        })
    }

    languages_ChangeHandler = (e) => {
        this.setState({
            languages : e.target.value
        })
    }

    submit_profile = (e) => {
        var headers = new Headers();

        e.preventDefault();//to prevents page from refreshing
        const profileData = {
            
            email : cookie.load('emailID'),
            name : this.state.name,
            gender: this.state.gender,
            phone : this.state.phone,
           aboutme :this.state.aboutme,
           city : this.state.city,
           country:this.state.country,
            company :this.state.company,
            school : this.state.school,
             hometown :this.state.hometown,
              languages :this.state.languages
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/modifyProfile', profileData)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    alert("Profile modified!");
                } else {
                    this.setState({
                      
                    })
                }
            });  
    }

    render() {

        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}
                <img class="profile-dii-pic center-block" src={require("./profile_pic.png")} width="100" height="100" />
                <div>
                    <form onSubmit={this.submit_profile}>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="dii col-sm-10">
                                <input type="text" readOnly class="form-control-plaintext" id="email" value={this.state.email} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Name</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.name_ChangeHandler}  class="form-control" id="name" value="Divisha" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="gender" class="col-sm-2 col-form-label">Gender</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.gender_ChangeHandler}  class="form-control" id="gender" value="F" />
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="phno" class="col-sm-2 col-form-label">Phone</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.phone_ChangeHandler}  pattern="[0-9]{10}" title="Please enter 10 digit mobile number" class="form-control" id="phno" value="7384059239" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="abtme" class="col-sm-2 col-form-label">About Me</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.aboutme_ChangeHandler}  class="form-control" id="abtme" value="I like to code even on weekends!" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="city" class="col-sm-2 col-form-label">City</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.city_ChangeHandler}  class="form-control" id="city" defaultValue="San Jose" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="country" class="col-sm-2 col-form-label">Country</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.country_ChangeHandler}  class="form-control" id="country" value="USA" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="company" class="col-sm-2 col-form-label">Company</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.company_ChangeHandler}  class="form-control" id="company" value="NA" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="school" class="col-sm-2 col-form-label">School</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.school_ChangeHandler}  class="form-control" id="school" value="SJSU CA" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="homeTown" class="col-sm-2 col-form-label">Home Town</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.hometown_ChangeHandler}  class="form-control" id="homeTown" value="Bhilai" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="lang" class="col-sm-2 col-form-label">Languages</label>
                            <div class="dii col-sm-10">
                                <input type="text"  onChange = {this.languages_ChangeHandler}  class="form-control" id="lang" value="English/Korean/Hindi" />
                            </div>
                        </div>
                        <input type="submit" class="btn dii btn-primary"></input>
                    </form>
                </div>
            </div>
        )
    }
}
//export this Component
export default Profile;