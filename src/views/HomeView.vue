<template>
    <div class="home-view">
      <h1>Welcome to Story Generator</h1>
      <p>Create engaging and personalized stories powered by GPT-4 AI.</p>
      <router-link to="/book-generator" class="btn">Start Generating</router-link>
    </div>
  </template>
  
  <style scoped>
  .home-view {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 48px;
    color: #34495e;
  }
  
  p {
    font-size: 20px;
    margin-bottom: 30px;
  }
  
  .btn {
    background-color: #1abc9c;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .btn:hover {
    background-color: #16a085;
  }
  </style>
  