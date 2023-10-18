<script>
  import {
    RouterLink,
    RouterView
  } from "vue-router";
  import DefaultNavbar from '@/components/navigation/DefaultNavbar.vue';
  import BaseLayoutVue from "./layouts/BaseLayout.vue";
  import AuthLayoutVue from "./layouts/AuthLayout.vue";

  export default {
    components: {
      RouterLink,
      RouterView,
      DefaultNavbar,
      BaseLayoutVue,
      AuthLayoutVue,
    },
    computed: {
      isAuthenticated() {
        // return true if user is authenticated, false otherwise
        return true;
      },
    },
  };
</script>

<template>
  <main class="w-100">
    <component v-if="isAuthenticated" :is="AuthLayoutVue">
      <RouterView />
    </component>
    <component v-else :is="BaseLayoutVue">
      <RouterView />
    </component>
  </main>
</template>