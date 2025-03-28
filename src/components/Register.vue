

<template>
  <body class="text-center">
    <main class="form-signin">
    <form>
      <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
      <h1 class="h3 mb-3 fw-normal">Registro</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  v-model="email">
        <label for="floatingInput">Correo</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Contraseña</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Recordar contraseña
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" @click="register">Registrarse</button>
      <button class="w-100 btn btn-lg btn-primary" @click="signInWithGoogle">Registrarse con Google</button>
      <p class="mt-5 mb-3 text-muted">&copy; bonosapp</p>
    </form>
  </main>
  </body>
</template>

<script setup>
import{ref} from 'vue';
import{useStore} from 'vuex';
import { auth, createUserWithEmailAndPassword } from '../../firebaseConfig';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const register = async () => {
  event.preventDefault();  
  console.log(email.value, password.value);
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("Se ha registrado correctamente");
    console.log(auth.currentUser);
    router.push('/bonolist');
  } catch (error) {
    switch(error.code){
      case 'auth/email-already-in-use':
        alert('El correo ya está en uso');
        break;
      case 'auth/invalid-email':
        alert('El correo no es válido');
        break;
      case 'auth/wrong-password':
        alert('La contraseña es incorrecta');
        break;
      case 'auth/weak-password':
        alert('La contraseña es débil');
        break;
        default:
        alert('Error al registrarse');
    }
    return
  }
  router.push('/bonolist');
};
const signInWithGoogle = () =>{
  
}
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