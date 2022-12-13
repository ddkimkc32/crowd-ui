import { defaultIconPrefixCls } from 'antd/lib/config-provider';
import { Input, List, Avatar } from 'antd';
import React, { Component } from 'react';
import Vote from './vote';
import {Card} from 'antd';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
export default class Queue extends Component{
  constructor(){
    super()
    this.state={
        token: '',
        queue: [],
        tracks: []
    }
  }
  componentDidMount(){
    fetch('/getQueue',{
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }).then(response=> response.json())
    .then(response =>{
      const results = []
      const tracks =[]
      response.forEach(element => {
        tracks.push(element.id.toString())
        results.push(      
        <List.Item key={element.id}
        actions = {[<Vote uri={element.id} votes={element.votes}/>]}>
        <List.Item.Meta
            avatar={<Avatar shape='square' size='large' src={element.img} />}
            title={<p href="https://ant.design">{element.track_id}</p>}
            description={element.artist}

        />
        </List.Item>);
    });
    this.setState({
      queue: results,
      tracks: tracks
    });
    })
    .catch(error => this.setState({
     queue: [],
     tracks: []
    })
    )
    fetch('/getToken', {
      method: 'GET', 
      headers: {'Content-Type': 'application/json'}
    }).then(response=> response.json())
    .then(response => {
      const results = []
      results.push(response.token)
     
    this.setState({
      token: results[0]
    })
  })
    .catch(error => this.setState({
      token: ''
    }))
  }
    render(){
      console.log(this.state.tracks)
      let card;
      if(this.state.queue.length > 0){
          card = <Card>
          <List itemLayout="horizontal">
          {this.state.queue}
          </List>
          </Card>;
      }
      else {
      card = <Card hidden={true}/>;
      }
      return(
        <div>
           <SpotifyWebPlayer
                token={this.state.token}
                uris={this.state.tracks}
                />
            <p>Up next</p>
          {card}
         
        </div>
      )
    }
}
