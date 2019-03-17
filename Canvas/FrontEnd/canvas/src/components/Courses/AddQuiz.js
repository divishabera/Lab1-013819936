import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//you wanna copy this file for componenets
class AddQuiz extends Component {
    constructor(){
        super();
 
        var setAdmin = 0;
        ('cookie value',cookie.load('cookie') == 0) ? setAdmin = 0: setAdmin = 1 
        this.state = {  
        showAdmin : setAdmin//
        }
    }  
 
    componentDidMount(){
     
    }

    render(){

        let redirectVar = null;
        if(!cookie.load('cookie')){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
        return(
            <div>
                        <h3>Add Quiz</h3>
                {redirectVar}

                <div class="form-group row">
                        <label for="ccap" class="col-sm-2 col-form-label">Number of Questions</label>
                        <div class="col-sm-10">
                            <input type="number" min="1" step="1" onChange = {this.ccap_ChangeHandler}   title="Please enter numbers"   class="form-control" id="ccap" required />
                        </div>
                    </div>

                <div class="card">
                    <h5 class="card-header">Question 1</h5>
                    <div class="card-body">
                    <form onSubmit={this.submit_Question}>

                    <div class="form-group row">
                        <label for="headd" class="col-sm-2 col-form-label">Question</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.head_ChangeHandler}  class="form-control" id="headd" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bodyy" class="col-sm-2 col-form-label">Option 1</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.body_ChangeHandler}  class="form-control" id="bodyy" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bodyy" class="col-sm-2 col-form-label">Option 2</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.body_ChangeHandler}  class="form-control" id="bodyy" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bodyy" class="col-sm-2 col-form-label">Option 3</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.body_ChangeHandler}  class="form-control" id="bodyy" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bodyy" class="col-sm-2 col-form-label">Option 4</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.body_ChangeHandler}  class="form-control" id="bodyy" required />
                        </div>
                    </div>
                    <input type="submit" class="btn dii btn-primary"></input>
                        </form>


                    </div>
                </div>


            </div> 
        )
    }
}
//export this Component
export default AddQuiz;