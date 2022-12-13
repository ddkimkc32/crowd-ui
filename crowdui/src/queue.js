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
          {card}
          <SpotifyWebPlayer
                token={this.state.token}
                uris={this.state.tracks}/>
        </div>
      )
    }
}


//     constructor(){
//         super()
//         this.state={
//             queue: []
//         }
//     }
//     componentDidMount() {
//       fetch('getQueue', {
//         method: 'GET', 
//         headers: {'Content-Type': 'application/json'}
//       }).then(response=> response.json())
//       .then(response => {
//         const results=[]
//         response.forEach(element => {
//             let artists = []
//             artists.push(element.artist)
//             results.push(      
//             <List.Item key={element.id}
//             // actions={<addButton track_id={element.id}> Add</addButton>}
//             actions={[<AddButton track_id={element.id} song={element.name}>Add </AddButton>]}
//             >
//             <List.Item.Meta
//                 avatar={<Avatar shape='square' size='large' src={element.imgurl} />}
//                 title={<p href="https://ant.design">{element.name}</p>}
//                 description={artists.join(', ')}

//             />
//             </List.Item>);
//         });
//         this.setState({
//             searchResults: results
//           });
//       })
//       .catch(error => this.setState({
//         searchResults: []
//       })
//       )
//     }

//     render() {
//         const { items, session } = this.props;
//         return (
//           <div style={{ paddingBottom: '10px' }}>
//             <h2><FormattedMessage id="queue.title" /></h2>
//             {items.length === 0
//               ? <p><FormattedMessage id="queue.empty" /></p>
//               : <table className="queue">
//                   <style jsx>{`
//                     .queue {
//                       max-width: 550px;
//                     }
//                   `}</style>
//                   <tbody>
//                     {items.map((i, index) => (
//                       <QueueItem
//                         item={i}
//                         session={session}
//                         index={index}
//                         key={index}
//                       />
//                     ))}
//                   </tbody>
//                 </table>}
//           </div>
//         );
//       }
// }