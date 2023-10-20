<script>
  import {
    RouterLink,
    RouterView
  } from "vue-router";
  import BaseLayout from "./BaseLayout.vue";
  import AuthLayout from "./AuthLayout.vue";
  
  import { mapStores } from 'pinia';
  import { useServerStore } from '@/stores/server';

  export default {
    components: {
      RouterLink,
      RouterView,
      BaseLayout,
      AuthLayout
    },
    computed: {
        isAuthenticated() {
            return useServerStore().isLoggedIn;
        },
    },
    setup() {
        const serverStore = useServerStore();

        serverStore.fetchLoginStatus();
    },
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
