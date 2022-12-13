import React, { Component } from 'react';
import {Button, Space} from 'antd';
import Queue from './queue';
import getToken from './getToken';
import printToken from './helperToken';
export default class AddButton extends Component{
    handleClick = () => {

       // console.log(this.props.uri)
       fetch('/addToQueue',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "id" : this.props.uri,
            "track_id": this.props.song,
            "imgurl": this.props.img,
            "artist": this.props.artist
        })
       })
       
    }
    render(){
        return(
            <Space wrap>
            <Button type="primary" onClick={this.handleClick}>Add</Button>
            </Space>
        )
    }
}