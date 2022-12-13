import React, { Component } from 'react';
import {Card} from 'antd';
import { Input, List, Avatar } from 'antd';
import "./App.css"
import 'antd/dist/antd.css';
import AddButton from './addButton';
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
            <List.Item key={element.id}
            // actions={<addButton track_id={element.id}> Add</addButton>}
            actions={[<AddButton uri={element.uri} track_id={element.id} song={element.name} artist={element.artist} img={element.imgurl}>Add </AddButton>]}
            >
            <List.Item.Meta
                avatar={<Avatar shape='square' size='large' src={element.imgurl} />}
                title={<p href="https://ant.design">{element.name}</p>}
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
            card = <Card>
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
        <h1> Search </h1>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onChange={this.handleChange}
        />
        {card}
      </div>
      );
    }
  }
