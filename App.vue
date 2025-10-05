<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const router = useRouter()

const menuItems = [
  { title: 'Agenda', icon: 'mdi-calendar-clock', route: '/' },
  { title: 'Serviços', icon: 'mdi-scissors-cutting', route: '/servicos' },
  { title: 'Sobre', icon: 'mdi-information', route: '/sobre' }
]

const navigateTo = (route) => {
  router.push(route)
  drawer.value = false
}
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="text-white font-weight-bold">
        <v-icon icon="mdi-content-cut" size="large" class="mr-2"></v-icon>
        Barbearia Afro
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="item in menuItems"
          :key="item.route"
          :to="item.route"
          variant="text"
          color="white"
          class="mx-1"
        >
          <v-icon :icon="item.icon" class="mr-2"></v-icon>
          {{ item.title }}
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      color="primary"
      theme="dark"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-content-cut"
          title="Barbearia Afro"
          subtitle="Estilo e Cultura"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.route"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="navigateTo(item.route)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main style="background-color: #FDF6E3;">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" app>
      <v-row justify="center" no-gutters>
        <v-col class="text-center text-white py-3" cols="12">
          <strong>Barbearia Afro</strong> - Celebrando a cultura e o estilo
          <div class="mt-1">
            <v-icon icon="mdi-phone" size="small"></v-icon> (65) 99999-9999
            <span class="mx-2">|</span>
            <v-icon icon="mdi-instagram" size="small"></v-icon> @barbearia.afro
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-toolbar-title {
  font-family: 'Merriweather', serif;
}
</style>
