<template>
    <div class="form">
      <h1 class="centered-title">Crea tu Bono</h1>
      <div class="mb-3">
        <label for="nombreBono" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombreBono" v-model="nombre" required />
      </div>
      <div class="mb-3">
        <label for="descripcionBono" class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcionBono" rows="3" v-model="descripcion"></textarea>
      </div>
      <div class="mb-3">
        <label for="Caducidad" class="form-label">Caducidad</label>
        <div class="input-group mb-3">
          <input type="number" id="numero" class="form-control me-5" placeholder="1" aria-label="Username" min="0" inputmode="numeric" v-model="caducidadNumero" />
          <select class="form-select" aria-label="Default select example" v-model="caducidadUnidad">
            <option value="días">Día/s</option>
            <option value="semanas">Semana/s</option>
            <option value="meses">Mes/es</option>
            <option value="años">Año/s</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label for="validezDesde" class="form-label" required>Validez Desde</label>
        <input type="date" class="form-control" id="validezDesde" v-model="validezDesde" required/>
      </div>
      <div class="mb-3">
        <label for="validezHasta" class="form-label">Validez Hasta</label>
        <input type="date" class="form-control" id="validezHasta" v-model="validezHasta" />
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="nominalCheck" v-model="nominal" />
        <label class="form-check-label" for="nominalCheck"> Nominal </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="activeCheck" v-model="activo" />
        <label class="form-check-label" for="activeCheck"> Activo </label>
      </div>
      <div class="d-grid mt-4">
        <button type="submit" class="btn btn-primary btn-lg" @click="guardarBono">Guardar</button>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { useRouter } from 'vue-router'; // Importa useRouter
  import { db } from '../../firebaseConfig';
  export default {
    setup() { // Usar setup()
    const router = useRouter(); // Obtener la instancia del router

    return {
      router, // Exponer el router al template
    };
  },
    data() {
      return {
        nombre: '',
        descripcion: '',
        caducidadNumero: 1,
        caducidadUnidad: 'meses',
        validezDesde: '',
        validezHasta: '',
        nominal: false,
        activo: false,
      };
    },
    methods: {
      async guardarBono() {
        if (!this.nombre) {
        alert('El campo Nombre es obligatorio.');
        return;
      }
      if (!this.validezDesde){
          alert('El campo Validez Desde es obligatorio.');
          return;
      }
      // Verifica otros campos requeridos...

        try {
          await addDoc(collection(db, 'bonos'), {
            name: this.nombre,
            description: this.descripcion,
            expiration_num: this.caducidadNumero,
            expiration_units: this.caducidadUnidad,
            avaiable_from: this.validezDesde,
            available_to: this.validezHasta,
            nominal: this.nominal,
            active: this.activo,
            creation_time: serverTimestamp(),
            last_update: serverTimestamp()
          });
          console.log('Bono guardado con éxito!');
          // Limpiar formulario o mostrar mensaje de éxito
          this.nombre = '';
          this.descripcion = '';
          this.caducidadNumero = 1;
          this.caducidadUnidad = 'meses';
          this.validezDesde = '';
          this.validezHasta = '';
          this.nominal = false;
          this.activo = false;
          this.router.push('/bonolist'); // Usar this.router
        } catch (error) {
          console.error('Error al guardar el bono:', error);
          // Manejar el error (mostrar mensaje de error, etc.)
        }
      },
    },
  };
  </script>
  
  <style>
  .form {
    padding: 30px;
    width: 90%;
    margin: 0 auto;
  }
  
  .centered-title {
    display: flex;
    justify-content: center;
  }
  </style>