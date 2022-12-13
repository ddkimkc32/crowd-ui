import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {render} from 'react-dom';
import './App.css';
import'./search.css'
import 'antd/dist/antd.css';
import Searchbar from './search';
import Login from './login';
import Queue from './queue';
import WebPlayer from './helperToken';
import SpotifyPlayer from 'react-spotify-web-playback';
import getToken from './getToken.js'
import printToken from './helperToken';

function App() {
  return (
    
    <main className="App">
      <Searchbar />
      <Queue />
      <Login />
     

    </main>
  );
}


export default App;
