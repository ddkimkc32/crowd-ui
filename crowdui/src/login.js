import React, { Component } from 'react';
import {useRef, useState, useEffect} from 'react';
export default class Login extends Component{
    constructor(){
        super()
        this.state ={
            username: ""
        }
    }
    handleChange = event =>{
        this.setState({
            username: event.target.value
        })
        console.log(this.username)
    }
    handleClick= event =>{
        fetch('/genToken',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": this.username
            })
        }).then(response=> console.log(response))
    }

    render() {
        return(
        <div className='login'>
            <h1> Login </h1>
            <input 
                type="text" 
                id="username"
                onChange={this.handleChange}
                value={this.username}
                required
            />
            <button onClick={this.handleClick}>Start session</button>
        </div>
        )
    }
}