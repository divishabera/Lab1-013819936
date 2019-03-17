import '../../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';



class Register extends Component {

    constructor(props) {
        //Calls  constructor de Super class 
        super(props);

        this.state = {
            email: "",
            authFlag: false,
            namee: "",
            password: "",
            role:"0"
        }
        //Binding the handlers 
        this.e_mail_ChangeHandler = this.e_mail_ChangeHandler.bind(this);
        this.name_ChangeHandler = this.name_ChangeHandler.bind(this);
        this.pass_wordChangeHandler = this.pass_wordChangeHandler.bind(this);
        this.submit_LoginForm = this.submit_LoginForm.bind(this);
        this.role_handler = this.role_handler.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false//initially it is false
        })
    }

    e_mail_ChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    name_ChangeHandler = (e) => {
        this.setState({
            namee: e.target.value
        })
    }
    
    role_handler = e => {
        this.setState({
          role: e.target.value
        });
      };

    pass_wordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit to backend (node)
    submit_LoginForm = (e) => {
        var headers = new Headers();


        e.preventDefault();//to prevents page from refreshing
        const loginData = {
            password: this.state.password,
            email: this.state.email,
            namee: this.state.namee,
            role: this.state.role
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/register', loginData)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
    }

    render() {

        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />  //AFTER SUCCESSFUL LOGIN, LAND HERE
        }
        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2> Sign Up</h2>

                            </div>

                            <form onSubmit={this.submit_LoginForm}>
                                <div class="form-group">
                                    <input type="email" onChange={this.e_mail_ChangeHandler} autoFocus class="form-control" name="email" required placeholder="Email" />
                                </div>
                                <div class="form-group">
                                    <input type="text" onChange={this.name_ChangeHandler} class="form-control" name="name" required placeholder="Name" />
                                </div>

                                <div class="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            onChange={this.role_handler}
                                            name="role"
                                            value="0"
                                            checked={this.state.role === "0"}
                                          
                                            
                                        />
                                        Student
                                     </label>
                                </div>

                                <div class="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            onChange={this.role_handler}
                                            name="role"
                                            value="1"
                                            checked={this.state.role === "1"}
                                           
                                        />
                                        Faculty
                                     </label>
                                </div>



                                <div class="form-group">
                                    <input type="password" onChange={this.pass_wordChangeHandler} class="form-control" name="password" required placeholder="Password" />
                                </div>
                                <input type="submit" class="btn dii btn-primary"></input>
                            </form>
                        </div>
                    </div>
                    <div class="text-center">

                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Register;