import React, { Component } from 'react';
import {useRef, useState, useEffect} from 'react';
export default class Login extends Component{
    constructor(){
        super()
        this.state ={
            username: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange = event =>{
        this.q = event.target.value
        this.setState({
            username: this.q
        })
        console.log(this.state.username)
    }
    handleClick(){
        console.log(this.state.username)
        fetch('/genToken',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": this.state.username
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
                required
            />
            <button onClick={this.handleClick}>Start session</button>
        </div>
        )
    }
}