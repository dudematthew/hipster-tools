<script>
  import bgImage from '@/assets/img/login-background.jpg';
  import bgVideo from '@/assets/video/login-background.mp4';
  import IconVue from '../components/other/Icon.vue';

  export default {
    components: {
      IconVue,
    },
    data() {
      return {
        bgImage,
        users: [],
        showModal: false,
        chosenUser: null,
      };
    },
    computed: {
      userOptionButtonText () {
        return this.chosenUser ? this.chosenUser.name : "Wybierz użytkownika";
      }
    },
    methods: {
      openUserModal() {
        this.showModal = true;
      },
      closeUserModal() {
        this.showModal = false;
      },
      chooseUser(user) {
        this.chosenUser = user;
        this.closeUserModal();
      }
    },
  };
</script>

<template>
  <div>
    <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${bgImage})` }">
      <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover object-center z-0">
        <source src="@/assets/video/login-background.mp4" type="video/mp4">
      </video>
      <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div class="text-white">
          <div class="mb-8 flex flex-col items-center">
            <img src="@/assets/img/logo.png" class="mb-4 cursor-pointer" width="150" alt="" srcset="" @click="$router.push('/')" />
            <h1 class="text-gray-300 text-lg">Zaloguj się</h1>
          </div>
          <div class="flex flex-col max-w-md space-y-5">
            <button
              class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white" @click="openUserModal">{{ userOptionButtonText }}</button>
            <input type="password" placeholder="Wprowadź Hasło"
              class="flex px-3 py-2 md:px-4 md:py-3 border-2 text-black border-black rounded-lg font-medium placeholder:font-normal" />
            <button
              class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
              <span>Zaloguj się</span>
            </button>
            <div class="flex justify-center items-center">
              <span class="w-full border border-black"></span>
              <span class="px-4">Lub</span>
              <span class="w-full border border-black"></span>
            </div>
            <button @click="$router.push('/')"
              class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
              <IconVue iconName="KeyboardBackspace" class="absolute left-3 w-5 h-5"></IconVue>
              <span>Strona Główna</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-gray-900 bg-opacity-50 absolute inset-0" @click="closeUserModal()"></div>
      <div class="bg-white rounded-lg p-8 z-10 min-w-[500px]">
        <div class="flex-1 px-2 sm:px-0">
          <div class="flex justify-between items-center">
            <h3 class="text-3xl font-extralight text-black">Wybierz użytkownika</h3>
          </div>
          <div class="mb-10 sm:mb-0 mt-10 flex flex-wrap gap-x-5 gap-y-5">
            <!-- <div
              class="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
              <a class="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </a>
              Stwórz użytkownika </div> -->
            <div v-for="user in users" :key="user.id" @click="chooseUser(user)"
              class="relative group bg-gray-900 min-w-[125px] py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
              <img class="w-20 h-20 object-cover object-center rounded-full" :src="user.image" :alt="user.image" />
              <h4 class="text-white text-2xl font-bold capitalize text-center">{{ user.name }}</h4>
              <p class="text-white/50">{{ user.appAmount }} aplikacji</p>
              <!-- <p class="absolute top-2 text-white/20 inline-flex items-center text-xs">Online<span
                  class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p> -->
            </div>
            <div
              class="relative group bg-gray-400 min-w-[125px] rounded-md border-2 border-dark-300 border-dashed">
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>