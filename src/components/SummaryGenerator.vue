<template>
    <div class="summary" v-if="summary">
      <h3>Summary of the Story:</h3>
      <!-- Affichage du résumé en HTML, interprété à partir de Markdown -->
      <div v-html="markdownSummary"></div>
    </div>
  </template>
  
  <script>
  import { marked } from 'marked'; // Importer marked pour convertir le Markdown en HTML
  import { ref, onValue } from 'firebase/database'; // Importer Firebase pour écouter les mises à jour en temps réel
  import { db } from '../firebase'; // Import direct de la base de données
  
  export default {
    props: {
      storyId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        summary: '', // Stocker le résumé récupéré
      };
    },
    computed: {
      // Convertir le Markdown en HTML
      markdownSummary() {
        return marked(this.summary);
      },
    },
    methods: {
      listenForSummary() {
        try {
          // Référence vers le champ summary de l'histoire
          const summaryRef = ref(db, `stories/${this.storyId}/summary`);
  
          // Écouter les changements dans Firebase Realtime Database
          onValue(summaryRef, (snapshot) => {
            const summaryData = snapshot.val();
            if (summaryData) {
              this.summary = summaryData; // Mettre à jour le résumé
            }
          });
        } catch (error) {
          console.error('Error listening to summary:', error);
        }
      },
    },
    mounted() {
      // Démarrer l'écoute des mises à jour dès que le composant est monté
      this.listenForSummary();
    },
  };
  </script>
  
  <style scoped>
  .summary {
    text-align: left;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .summary h3 {
    color: #34495e;
  }
  
  .summary p {
    background-color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
  }
  </style>
  