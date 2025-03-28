

<template>
  <body class="text-center">
    <main class="form-signin">
    <form>
      <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
      <h1 class="h3 mb-3 fw-normal">Iniciar Sesión</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  v-model="email">
        <label for="floatingInput">Correo</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Contraseña</label>
      </div>
      <p v-if="errMsg" class="text-danger" v-html="errMsg"></p>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Recordar contraseña
        </label>
      </div>
      <button type= "button" class = "w-100 btn btn-lg btn-primary" @click="signIn">Iniciar Sesión</button>
      <button type= "button" class="w-100 btn btn-lg btn-primary" @click="register">Registrarse</button>
      <!-- <button type= "button" class="w-100 btn btn-lg btn-primary" @click="signInWithGoogle">Registrarse con Google</button> -->
      <p class="mt-5 mb-3 text-muted">&copy; bonosapp</p>
    </form>
  </main>
  </body>
</template>

<script setup>
import{ref} from 'vue';
import { auth, signInWithEmailAndPassword ,createUserWithEmailAndPassword} from '../../firebaseConfig';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errMsg = ref('');

const signIn = async () => {
  console.log(email.value, password.value);
  errMsg.value = '';
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("Se ha iniciado sesión correctamente");
    console.log(auth.currentUser);
    router.push('/bonolist');
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        errMsg.value = 'El correo no es válido';
        break;
      case 'auth/user-not-found':
        errMsg.value = 'El usuario no existe';
        break;
      case 'auth/wrong-password':
        errMsg.value = 'La contraseña es incorrecta';
        break;
      case 'auth/user-disabled':
        errMsg.value = 'El usuario ha sido deshabilitado';
        break;
        case 'auth/invalid-credential':
        errMsg.value = 'El usuario no está creado.<br>Por favor, regístrese.';
        break;
      default:
        errMsg.value = error.message;
    }
  }
};
const register = async () => {
  console.log(email.value, password.value);
  errMsg.value = '';
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("Se ha registrado correctamente");
    console.log(auth.currentUser);
    router.push('/bonolist');
  } catch (error) {
    switch(error.code){
      case 'auth/email-already-in-use':
        errMsg.value = 'El correo ya está en uso';
        break;
      case 'auth/invalid-email':
        errMsg.value = 'El correo no es válido';
        break;
      case 'auth/wrong-password':
        errMsg.value = 'La contraseña es incorrecta';
        break;
      case 'auth/weak-password':
        errMsg.value = 'La contraseña es débil';
        break;
        default:
        errMsg.value = error.message;
    }
    return
  }
  router.push('/bonolist');
};
</script>

<style>

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }


body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>