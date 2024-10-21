<template>
    <div class="login-view">
      <h2>Login to Book Generator</h2>
      <p>Use your Google account to access the story generator features.</p>
      <button @click="loginWithGoogle" class="btn">Login with Google</button>
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
          this.$router.push('/'); // Rediriger vers la page d'accueil après la connexion
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
  
  p {
    font-size: 18px;
    color: #7f8c8d;
    margin-bottom: 30px;
  }
  
  .btn {
    background-color: #1abc9c;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .btn:hover {
    background-color: #16a085;
  }
  </style>
  