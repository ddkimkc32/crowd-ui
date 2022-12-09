import React, { Component } from 'react';
import {Card} from 'antd';
import { Input, List, Avatar } from 'antd';
import "./App.css"
import 'antd/dist/antd.css';
import { resolveOnChange } from 'antd/lib/input/Input';

const { Search } = Input;

export default class Searchbar extends Component {
    
    constructor(){
        super()
        this.state={
            searchResults: []
        }
    }

    handleChange = event => {
      this.q = event.target.value
      fetch('/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "track_id" : this.q
        }),
      }).then(response=> response.json())
      .then(response => {
        const results=[]
        response.forEach(element => {
            let artists = []
            artists.push(element.artist)
            results.push(      
            <List.Item key={element.id}>
            <List.Item.Meta      
                avatar={<Avatar shape='square' size='large' src={element.imgurl} />}
                title={<p href="https://ant.design">{element.name}</p>}
                // id={<p href="https://ant.design">{element.id}</p>}
                description={artists.join(', ')}
            />
            </List.Item>);
        });
        this.setState({
            searchResults: results
          });
      })
      .catch(error => this.setState({
        searchResults: []
      })
      )
    };


    render() {
        let card;
        if(this.state.searchResults.length > 0){
            card = <Card id='card' onClick={() => {
              // fetch('/getToken', {
              //   method: 'GET',
              //   body: JSON.stringify({
              //     "track_id": this.state.searchResults.element.name
              //   }),
              // })
              console.log(this.state.searchResults.title)
              // const searchTracksReset = () => ({ type: this.SEARCH_TRACKS_RESET });
              // const fetchTrack = id => ({ type: this.FETCH_TRACK, id });
              // const fetchTrackSuccess = (id, track) => ({
              //   type: this.FETCH_TRACK_SUCCESS,
              //   id
              // });
              //console.log(fetchTrackSuccess)
            }}>
            <List itemLayout="horizontal">
              {this.state.searchResults}
            </List>
            </Card>;
        }
        else {
        card = <Card hidden={true}/>;
        }
      return (
        <div className="Search">
        <h1> Crowdify </h1>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onChange={this.handleChange}
        />
        {card}
      </div>
        // <div className="component-search-input">
        //   <div>
        //     <input onChange={this.handleChange} />
        //     {/* <button onclick={this.search(event.target.value)}>
        //         Searcheses change me
        //     </button> */}
        //     {card}
        //   </div>
         
        // </div>
      );
    }
  }
