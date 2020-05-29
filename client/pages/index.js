import React from 'react'
import axios from 'axios';
import api from '../utils/api';

const Home = ({ currentUser }) => {
  console.log(currentUser);
  return (
    currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
  )
}

export default Home
