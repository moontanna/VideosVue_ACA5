import { createRouter, createWebHistory } from 'vue-router'
import categorybar from '../components/CategoryBar.vue'
import navbar from '../components/navBar.vue'
import IndecisionView from '../views/IndecisionView.vue';
import feedsection from '../components/FeedSection.vue';
import GamePlay from '../components/GamePlay.vue';
import videocard from '../components/Videocard.vue';
import Eventos from '../components/Eventos.vue';
import Cuenta from '../components/Cuenta.vue';
import Membresia from '../components/membreasia.vue';
import Tienda from '../components/Tienda.vue';
import Juegos from '../components/juegos.vue';


const routes = [
  { path: '/', name: 'home', component: feedsection },
  { path: '/soporte', name: 'soporte', component: IndecisionView },
  { path: '/eventos', name: 'eventos', component: Eventos },
  { path: '/cuenta', name: 'cuenta', component: Cuenta },
  { path: '/membresia', name: 'membresia', component: Membresia },
  { path: '/tienda', name: 'tienda', component: Tienda },
  { path: '/juegos/:titulo', name: 'juegos', component: Juegos },
  { path: '/indecision', name: 'indecision', component: IndecisionView },
  { path: '/categorybar', name: 'categorybar', component: categorybar },
  { path: '/navbar', name: 'navbar', component: navbar },
  { path: '/feedsection', name: 'feedsection', component: feedsection },
  { path: '/gameplay', name: 'gameplay', component: GamePlay },
  { path: '/videocard/:id', name: 'videocard', component: videocard },
  { path: '/:pathMatch(.*)*', redirect: '/soporte' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
