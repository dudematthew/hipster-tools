import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useServerStore } from "@/stores/server";
import { useMainStore } from "@/stores/main";

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
      path: "/player",
      name: "player",
      component: () => import("../views/PlayerView.vue"),
      meta: {
        requiresAuth: true, // Set to true if access is restricted
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false, // Set to true if access is restricted
      },
    },
    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/404View.vue"),
      meta: {
        requiresAuth: false, // Set to true if access is restricted
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const serverStore = useServerStore();
  const mainStore = useMainStore();

  serverStore.fetchProfile();

  if (requiresAuth && !serverStore.isLoggedIn) {
    // Store the route the user was trying to access
    mainStore.setPreviousRoute(to.fullPath);
    // Redirect to login page
    next("/login");
  } else {
    // Continue with the navigation
    next();
  }
});

export default router;
