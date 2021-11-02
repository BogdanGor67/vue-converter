import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

let app = createApp(App);
app.use(store);
app.use(router);
store.dispatch('loadState').then(() => {
	app.mount('#app');
});

