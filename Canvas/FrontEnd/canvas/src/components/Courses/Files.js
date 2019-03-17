import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Document, Page } from 'react-pdf'


//you wanna copy this file for componenets
class Files extends Component {
    constructor() {
        super();
        console.log()
        this.state = {
            showAdmin: true// ('cookie value',cookie.load('cookie') == 0) ? true: false 
        }
        this.filePreview = this.filePreview.bind(this)
    }
    filePreview() {
        var a = 10
        var g = 9
    }

    componentDidMount() {

    }

    render() {

        let redirectVar = null;
        if (!cookie.load('cookie')) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }
        return (
            <div>
                {redirectVar}



                <div class="foldercontainer">
                    <span class="folder " data-isexpanded="true"> <i class="fas fa-fw dii fa-file"></i> Labs</span>
                    <span class="file">  <i class="fas fa-fw dii fa-file"></i>
                        <a rel="noopener noreferrer" href="http://localhost:3003/pdf" target="_blank">273_Lab1.pdf</a> </span>
                    <span class="file">  <i class="fas fa-fw dii fa-file"></i>
                        <a rel="noopener noreferrer" href="http://localhost:3003/pdf" target="_blank">273_Lab2.pdf</a> </span>
                </div>

                <div class="foldercontainer">
                    <span class="folder fa-folder-o" data-isexpanded="false"> <i class="fas fa-fw dii fa-file"></i> HW</span>
                    <span class="file">  <i class="fas fa-fw dii fa-file"></i>
                        <a rel="noopener noreferrer" href="http://localhost:3003/pdf" target="_blank">HW1.pdf</a> </span>

                        <embed src="http://localhost:3003/pdf" width="500" height="375" type="application/pdf"/>
                    <span class="file">  <i class="fas fa-fw dii fa-file"></i>
                        <a rel="noopener noreferrer" href="http://localhost:3003/pdf" target="_blank">HW2.pdf</a> </span>
                </div>

            </div>
        )
    }
}
//export this Component
export default Files;