<script>
  import LayoutVue from '../layouts/Layout.vue';
  import IconVue from '@/components/other/Icon.vue';

  export default {
    components: {
      LayoutVue,
      IconVue,
    },
    name: 'HomeView',
    data() {
      return {
        panels: [{
            title: "Panel Gracza",
            content: "Witaj w świecie gry! W panelu gracza znajdziesz narzędzia, które pomogą ci w pokonywaniu trudności i osiąganiu celów. Flakon pełen dziwnej substancji czeka na wypicie.",
            buttonText: "Graj",
            iconName: "Flask",
            link: "/player"
          },
          {
            title: "Panel GM'a",
            content: "Kontroluj świat gry i wprowadzaj nowe wyzwania dla graczy. Czeka na ciebie wiele narzędzi, które pomogą ci w tworzeniu niezapomnianej przygody. Twoja wyobraźnia jest jedynym ograniczeniem!",
            buttonText: "Nadzoruj",
            iconName: "BottleTonickSkull",
            link: "/gm"
          }
        ],
      }
    },
  }
</script>

<template>
  <LayoutVue>
    <div class="w-full flex justify-center space-x-10 p-10">
      <div class="flex flex-wrap flex-row w-96" v-for="(panel, id) in panels" :key="id">
        <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div class="p-6">
            <IconVue :iconName="panel.iconName" class="mb-4 h-12 w-12 text-primary-400"></IconVue>
            <h5
              class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {{ panel.title }}
            </h5>
            <p class="block font-sans h-32 text-base font-light leading-relaxed text-inherit antialiased">
              {{ panel.content }}
            </p>
          </div>
          <div class="p-6 pt-0">
            <router-link class="text-primary-400 !transition-colors hover:!text-pink-500" :to="panel.link">
              <button
                class="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-primary-400 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button" data-ripple-dark="true">
                {{ panel.buttonText }}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" aria-hidden="true" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3">
                  </path>
                </svg>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </LayoutVue>
</template>