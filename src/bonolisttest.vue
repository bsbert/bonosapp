<template>
    <div>
      <ul>
        <!-- Cambiar bonosData por bonos -->
        <li v-for="bono in bonos" :key="bono.id">
          {{ bono.id }} - {{ bono.nominal }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta
  import { collection, getDocs } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        bonos: [], // Variable reactiva para almacenar los datos
      };
    },
    async mounted() {
      try {
        const bonosCollection = collection(db, 'bonos');
        const querySnapshot = await getDocs(bonosCollection);
  
        const bonosData = [];
        querySnapshot.forEach((doc) => {
          bonosData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
  
        console.log(bonosData); // Verifica los datos en la consola
        this.bonos = bonosData; // Almacena los datos en la variable reactiva
      } catch (error) {
        console.error('Error getting documents:', error);
      }
    },
  };
  </script>