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

<style>
  .header-links li span {
    position: relative;
    z-index: 0;
  }

  .header-links li span::before {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 2px;
    left: -4px;
    right: -4px;
    display: block;
    height: 6px;
  }

  .header-links li.active span::before {
    background-color: rgba(255, 0, 0, 0.678);
  }

  .header-links li:not(.active):hover span::before {
    background-color: #515783;
  }
</style>