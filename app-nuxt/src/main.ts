import { createApp, watch } from "vue";
import App from "./App";
import { VueCounter } from "./components/VueCounter";
import { VueName } from "./components/VueName";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ChakraUIVuePlugin from "@chakra-ui/vue-next";
import { createPinia } from "pinia";
import { PiniaPersistencePlugin } from "./persist";

const routes: RouteRecordRaw[] = [
  { path: "/vue-name", component: VueName },
  { path: "/vue-counter", component: VueCounter },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(PiniaPersistencePlugin);

app.use(ChakraUIVuePlugin);
app.use(router);
app.use(pinia);

app.mount("#app");
