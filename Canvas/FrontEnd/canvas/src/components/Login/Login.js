import '../../App.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';



class Login extends Component{

    constructor(props){
        //Calls  constructor de Super class 
        super(props);

        this.state = {
            eemail : "",
            authFlag : false,
            password : ""
        }
        //Binding the handlers 
        this.e_mail_ChangeHandler = this.e_mail_ChangeHandler.bind(this);
        this.pass_wordChangeHandler = this.pass_wordChangeHandler.bind(this);
        this.submit_LoginForm = this.submit_LoginForm.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag : false//initially it is false
        })
    }

    e_mail_ChangeHandler = (e) => {
        this.setState({
            eemail : e.target.value
        })
    }

    pass_wordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit to backend (node)
    submit_LoginForm = (e) => {
        var headers = new Headers();
        
        e.preventDefault();//to prevents page from refreshing
        const loginData = {
            password : this.state.password,
            email : this.state.eemail  //has the email          
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/login',loginData)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){
       
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>  //AFTER SUCCESSFUL LOGIN, LAND HERE
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2> Login</h2>
                    
                        </div>
                        
                        <form onSubmit={this.submit_LoginForm}>
                            <div class="form-group">
                                <input type="email" onChange = {this.e_mail_ChangeHandler} autoFocus class="form-control" name="email" required="required" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input type="password" onChange = {this.pass_wordChangeHandler}  class="form-control" name="password" required="required" placeholder="Password"/>
                            </div>
                            <input type="submit" class="btn dii btn-primary"></input>
                            </form>            
                    </div>
                </div>
                <div class="text-center">
          <a class="d-block dii medium mt-3" href="register">Sign up for a new account</a>
        </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;