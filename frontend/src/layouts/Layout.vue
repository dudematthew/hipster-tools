<script>
  import {
    RouterLink,
    RouterView
  } from "vue-router";
  import BaseLayout from "./BaseLayout.vue";
  import AuthLayout from "./AuthLayout.vue";
  import { useServerStore } from "@/stores/server.js";

  export default {
    components: {
      RouterLink,
      RouterView,
      BaseLayout,
      AuthLayout
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                await useServerStore().checkLoginStatus();
            } catch (error) {
                // Handle error
                console.error(error);
            }
        }
    },
    computed: {
        isAuthenticated() {
            return useServerStore().isLoggedIn;
        }
    }
  };
</script>

<template>
    <AuthLayout v-if="isAuthenticated">
        <slot></slot>
    </AuthLayout>
    <BaseLayout v-else>
        <slot></slot>
    </BaseLayout>
</template>
