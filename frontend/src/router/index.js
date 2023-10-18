import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiscordPanelView from '../views/DiscordPanelView.vue';
import { useServerStore } from "@/stores/server";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false, // Set to true if access is restricted
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: false, // Set to true if access is restricted
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !useServerStore().isLoggedIn) {
    // Redirect to login page or handle unauthorized access
    next("/login");
  } else {
    // Continue with the navigation
    next();
  }
});

export default router;
