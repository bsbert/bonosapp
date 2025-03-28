<template>
  <nav>
    <router-link to="/bonolist">Lista</router-link> |
    <router-link to="/editbono">Crear Bono</router-link>
    <router-link to="/sign-in" v-if="!isLoggedIn">| Iniciar Sesión</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Cerrar Sesión</button>
  </nav>
  <router-view/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter, RouterLink } from 'vue-router';


const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

const handleSignOut = () => {
  const auth = getAuth(); // Obtener auth dentro de handleSignOut
  signOut(auth)
    .then(() => {
      isLoggedIn.value = false;
      router.push('/');
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
<style>
/* 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*/

nav {
  padding: 30px 5px 0px 5px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
