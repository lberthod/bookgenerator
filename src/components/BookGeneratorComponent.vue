<template>
    <div class="book-generator">
      <h2>Create Your Story</h2>
  
      <textarea
        v-model="storyPrompt"
        placeholder="Enter your story prompt"
        class="story-input"
      ></textarea>
  
      <div class="controls">
        <label for="genre" class="genre-label">Choose Genre:</label>
        <select v-model="selectedGenre" class="genre-select">
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Science Fiction</option>
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
        </select>
      </div>
  
      <div class="controls">
        <label for="chapters" class="genre-label">Number of Chapters:</label>
        <input 
          type="number" 
          v-model="numberOfChapters" 
          placeholder="Enter number of chapters" 
          class="chapter-input" 
        />
      </div>
  
      <button @click="generateStory" class="btn">Generate Story</button>
      <button v-if="currentStoryId" @click="generateFirstChapter" class="btn">Generate First Chapter</button>
  
      <div v-if="generatedStory" class="story-output">
        <h3>Your Generated Story:</h3>
        <p>{{ generatedStory }}</p>
      </div>
  
      <!-- Utilisation du nouveau composant SummaryGenerator -->
      <SummaryGenerator v-if="currentStoryId" :storyId="currentStoryId" />
    </div>
  </template>
  
  <script>
  import { db } from '../firebase'; // Import de la configuration Firebase
  import { ref, set, update } from 'firebase/database'; // Importer les fonctions Firebase
  import SummaryGenerator from './SummaryGenerator.vue'; // Importer le composant


  export default {
    components: {
      SummaryGenerator, // Déclaration du composant
    },
    data() {
      return {
        storyPrompt: '',
        selectedGenre: 'fantasy',
        generatedStory: '',
        currentStoryId: null, // Stocker l'ID de l'histoire générée
        numberOfChapters: 1, // Nombre de chapitres par défaut
      };
    },
    methods: {
      async generateStory() {
        try {
          // Générer le texte de l'histoire avec l'API GPT-4
          this.generatedStory = `Generated story for ${this.selectedGenre} based on the prompt: ${this.storyPrompt}`;
  
          // Sauvegarder l'histoire générée dans la Realtime Database
          await this.saveStoryToDatabase();
        } catch (error) {
          console.error('Error generating story:', error);
        }
      },
      async saveStoryToDatabase() {
        try {
          // Créer un identifiant unique pour chaque histoire
          const storyId = Date.now().toString();
  
          // Créer la référence dans la Realtime Database sous le noeud "stories"
          const storyRef = ref(db, 'stories/' + storyId);
  
          // Les données de l'histoire
          const storyData = {
            prompt: this.storyPrompt,
            genre: this.selectedGenre,
            story: this.generatedStory,
            numberOfChapters: this.numberOfChapters, // Sauvegarder le nombre de chapitres
            summary: '', // Laisser le champ summary vide au départ
            timestamp: new Date().toISOString(),
          };
  
          // Enregistrer les données dans la Realtime Database
          await set(storyRef, storyData);
          console.log('Story saved with ID:', storyId);
  
          // Mettre à jour l'ID de l'histoire pour l'utiliser dans le composant SummaryGenerator
          this.currentStoryId = storyId;
        } catch (error) {
          console.error('Error saving story:', error);
        }
      },
      async generateFirstChapter() {
        try {
          // Appel à GPT-4 ou un autre service pour générer le premier chapitre
          const firstChapter = `First chapter of the story: ${this.storyPrompt}. Genre: ${this.selectedGenre}. Chapter 1: ...`;
  
          // Sauvegarder le premier chapitre dans la base de données
          const chapterRef = ref(db, `stories/${this.currentStoryId}/chapters/chapter1`);
          await update(chapterRef, {
            content: firstChapter,
            chapterNumber: 1,
            timestamp: new Date().toISOString(),
          });
  
          console.log('First chapter saved.');
        } catch (error) {
          console.error('Error generating first chapter:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .book-generator {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 50px; /* Ajouter une marge en bas */
  }
  
  h2 {
    color: #34495e;
    margin-bottom: 20px;
    font-size: 32px;
  }
  
  .story-input {
    width: 100%;
    height: 120px;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 2px solid #1abc9c;
    border-radius: 5px;
  }
  
  .controls {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .genre-label {
    font-size: 18px;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .genre-select,
  .chapter-input {
    padding: 10px;
    font-size: 16px;
    width: 60%;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
  }
  
  .btn {
    background-color: #1abc9c;
    color: white;
    padding: 12px 25px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-bottom: 30px;
  }
  
  .btn:hover {
    background-color: #16a085;
  }
  
  .story-output,
  .summary {
    text-align: left;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
  }
  
  .story-output h3,
  .summary h3 {
    color: #34495e;
  }
  
  .story-output p,
  .summary p {
    background-color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
  }
  
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', sans-serif;
  }
  
  html,
  body {
    min-height: 100%;
  }
  </style>
  