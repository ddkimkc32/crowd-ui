import { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default class WebPlayer extends Component{
    constructor(){
        super()
        this.state={
            token: '',
            queue: []
        }
    }
    componentDidMount(){
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
        return(
            <SpotifyPlayer
                token={this.state.token}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}/>
        )
    }
}