import { createApp } from 'vue';
import { BootstrapVue3, IconsPlugin } from 'bootstrap-vue-3';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

createApp(App)
  .use(BootstrapVue3)
  .use(IconsPlugin)
  .use(store)
  .use(router)
  .mount('#app');
