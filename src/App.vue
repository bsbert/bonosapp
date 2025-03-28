<template>
  <nav>
    <router-link to="/bonolist">Lista</router-link> |
    <router-link to="/editbono">Crear Bono</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link>
  </nav>
  <router-view/>
</template>

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
