import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {render} from 'react-dom';
import './App.css';
import'./search.css'
import 'antd/dist/antd.css';
import Searchbar from './search';
import Login from './login';

function App() {
  return (
    <main className="App">
      <Searchbar />
    </main>
  );
}

export default App;
