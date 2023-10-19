<script>
  import DefaultNavbar from '@/components/navigation/DefaultNavbar.vue';

    export default {
        components: {
            DefaultNavbar,
        },
    };
</script>

<template>
  <main class="w-100">
    <DefaultNavbar />
    <slot></slot>
  </main>
</template>