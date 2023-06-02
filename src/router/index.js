import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import PersonsPage from "@/components/PersonsPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/crud/persons", name: "personsPage", component: PersonsPage },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
