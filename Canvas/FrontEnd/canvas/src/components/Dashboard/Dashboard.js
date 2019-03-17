import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {  
         
        }
    }  
 
    componentDidMount(){
      let mainNav = document.getElementsByClassName("mainnav");
      for (var i = 0; i < mainNav.length; i++) {
       mainNav[i].classList.remove("active");
        } //first we remove for all
      document.getElementById('dashboard').classList.add('active');
    }

    render(){
        
        let redirectVar = null;
        if(!cookie.load('cookie')){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
        return(
            <div>
                {redirectVar}
                <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
        
              </ol>


              <div class="row">
                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-primary o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-book-open"></i>
                      </div>
                      <div class="mr-5"><h5>Course 257</h5></div>
 
                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                      <span class="float-left">
                        <i class="fas fa-angle-right"></i>
                      </span>
                 
                  
                      <span class="float-right">
                        <i class="fas fa-trash"></i>
                      </span>
                      <span class="float-right">Drop</span>
                    </a>
                  </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-warning o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-book-open"></i>
                      </div>
                      <div class="mr-5"><h5>Course 273</h5></div>
                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                      <span class="float-left">WL  <i class="fas fa-angle-right"></i> 4 </span>
          
                      <span class="float-right">
                        <i class="fas fa-trash"></i>
                      </span>
                      <span class="float-right">Drop</span>
                    </a>
                  
                  </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-3">
                  <div class="card text-white bg-primary o-hidden h-100">
                    <div class="card-body">
                      <div class="card-body-icon">
                        <i class="fas fa-fw fa-book-open"></i>
                      </div>
                      <div class="mr-5"><h5>Course 272</h5></div>
                    </div>
                    <a class="card-footer text-white clearfix small z-1" href="#">
                    <span class="float-left">View Details</span>
                      <span class="float-left">
                        <i class="fas fa-angle-right"></i>
                      </span>
                  
                      <span class="float-right">
                        <i class="fas fa-trash"></i>
                      </span>
                      <span class="float-right">Drop</span>
                    </a>
                  </div>
                </div>
    
          
          
              </div>


            </div> 
        )
    }
}
//export this Component
export default Dashboard;