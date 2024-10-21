<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/book-generator">Generate Book</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #2c3e50;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    gap: 15px;
  }
  
  .navbar li {
    color: #ecf0f1;
  }
  
  .navbar a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  
  .navbar a:hover {
    color: #1abc9c;
  }
  </style>
  