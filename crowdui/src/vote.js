import React, { Component } from 'react';
import {Button, Space} from 'antd';


export default class Vote extends Component{

    
    handleClick = () => {
       // console.log(this.props.uri)
       fetch('/vote',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "id" : this.props.uri,
        })
       })
       window.location.reload(false);
    }
    render(){
        return(
            <Space wrap>
            <Button type="primary" onClick={this.handleClick}> {this.props.votes} Vote</Button>
            </Space>
        )
    }
}