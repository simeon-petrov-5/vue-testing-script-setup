import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import i18n from './locales/index';
import router from '@/router';

import 'virtual:windi.css';
// import '@/assets/css/element-ui/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');
