<template>
    <div class="login-view">
      <h2>Login with Google</h2>
      <button @click="loginWithGoogle" class="btn">Login</button>
    </div>
  </template>
  
  <script>
  import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';
  
  export default {
    methods: {
      async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          console.log('User logged in:', result.user);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-view {
    text-align: center;
    margin-top: 50px;
  }
  
  h2 {
    color: #34495e;
    margin-bottom: 20px;
  }
  
  .btn {
    background-color: #1abc9c;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
  
  .btn:hover {
    background-color: #16a085;
  }
  </style>
  