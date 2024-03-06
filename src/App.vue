<script setup>
import { onBeforeMount, ref } from "vue"
import HomeView from "./views/HomeView.vue";

let pwaInstallEvent;

const state = ref({
  pwaSupportAvailable: false
})

onBeforeMount(() => {
  console.log("MOUNTED!");
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log("PWA SUPPORT DETECTED!");
    state.pwaSupportAvailable = true

    e.preventDefault();
    pwaInstallEvent = e;
  })
})

const pwaInstall = async () => {
  pwaInstallEvent.prompt()
  const { outcome } = await pwaInstallEvent.userChoice;
  if (outcome === 'accepted') {
    console.log("PWA INSTALLED!");

    // Take extra actions if the user opted for installation.
  } else {
    console.log("PWA NOT INSTALLED!");

    // Take extra actions if the user cancels.
  }
}
</script>

<template>
  <HomeView />

  <div v-if="state.pwaSupportAvailable" class="flex w-full absolute bottom-10 justify-center">
    <div class="flex items-center h-[60px] rounded-lg px-12 bg-blue-500 shadow-lg">
      <div class="mr-12">
        <p class="text-xl text-white">Coursely App supports offline use. Download Now!</p>
      </div>

      <div>
        <button @click="pwaInstall" class="bg-white text-blue-500 py-2 px-8 rounded">
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
