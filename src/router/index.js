import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import BookGeneratorView from '../views/BookGeneratorView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/book-generator', name: 'BookGenerator', component: BookGeneratorView },
  { path: '/login', name: 'Login', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
