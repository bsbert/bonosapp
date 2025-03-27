<template>
  <div class="form">
    <h1 class="centered-title">{{ bonoId && !ver ? 'Editar Bono' : bonoId && ver ? 'Ver Bono' : 'Crear Bono' }}</h1>
    <div class="mb-3">
      <label for="nombreBono" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="nombreBono" v-model="nombre" :disabled="ver" required />
    </div>
    <div class="mb-3">
      <label for="descripcionBono" class="form-label">Descripción</label>
      <textarea class="form-control" id="descripcionBono" rows="3" v-model="descripcion" :disabled="ver"></textarea>
    </div>
    <div class="mb-3">
      <label for="importeBono" class="form-label">Importe</label>
      <div class="input-group">
        <input type="number"    class="form-control"   id="importeBono" placeholder="0" min="0" inputmode="numeric" v-model="importe" aria-label="Importe"/>
        <select class="form-select" aria-label="Default select example" v-model="moneda" :disabled="ver">
          <option value="EUR" selected>EUR</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
    <div class="mb-3">
      <label for="Caducidad" class="form-label">Caducidad</label>
      <div class="input-group mb-3">
        <input type="number" id="numero" class="form-control me-5" placeholder="1" aria-label="Username" min="0" inputmode="numeric" v-model="caducidadNumero" :disabled="ver" />
        <select class="form-select" aria-label="Default select example" v-model="caducidadUnidad" :disabled="ver">
          <option value="días">Día/s</option>
          <option value="semanas">Semana/s</option>
          <option value="meses">Mes/es</option>
          <option value="años">Año/s</option>
        </select>
      </div>
    </div>
    <div class="mb-3">
      <label for="validezDesde" class="form-label" required>Validez Desde</label>
      <input type="date" class="form-control" id="validezDesde" v-model="validezDesde" :disabled="ver" required />
    </div>
    <div class="mb-3">
      <label for="validezHasta" class="form-label">Validez Hasta</label>
      <input type="date" class="form-control" id="validezHasta" v-model="validezHasta" :disabled="ver" />
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="nominalCheck" v-model="nominal" :disabled="ver" />
      <label class="form-check-label" for="nominalCheck"> Nominal </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="activeCheck" v-model="activo" :disabled="ver" />
      <label class="form-check-label" for="activeCheck"> Activo </label>
    </div>
    <div class="d-grid mt-4">
      <button v-if="!ver" type="submit" class="btn btn-primary btn-lg" @click="guardarBono">Guardar</button>
      <button type="button" class="btn btn-secondary btn-lg mt-2" @click="cancelarEdicion">{{ ver ? 'Cerrar' : 'Cancelar' }}</button>
    </div>
  </div>
</template>
  
  <script>
  import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
  import { useRouter } from 'vue-router'; // Importa useRouter
  import { db } from '../../firebaseConfig';
  export default {
    props: {
    bono: {
      type: Object,
      default: null,
    },
    route: { // Añadir la prop route
      type: Object,
      default: null,
    },
  },
    setup(props) { // Usar setup()
    const router = useRouter(); // Obtener la instancia del router
    const ver = !!props.route.query.ver; // Obtener 'ver' de la query
    return {
      router, 
      ver,
    };
  },
    data() {
      return {
      bonoId: this.bono ? this.bono.id : null,
      nombre: this.bono ? this.bono.name : '',
      descripcion: this.bono ? this.bono.description : '',
      importe: this.bono ? this.bono.amount : '',
      moneda: this.bono ? this.bono.currency : 'EUR',
      caducidadNumero: this.bono ? this.bono.expiration_num : 1,
      caducidadUnidad: this.bono ? this.bono.expiration_units : 'meses',
      validezDesde: this.bono ? this.bono.available_from : '',
      validezHasta: this.bono ? this.bono.available_to : '',
      nominal: this.bono ? this.bono.nominal : false,
      activo: this.bono ? this.bono.active : false,
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
        if (this.bonoId) {
          // Edición de bono existente
          await updateDoc(doc(db, 'bonos', this.bonoId), {
            name: this.nombre,
            description: this.descripcion,
            amount: this.importe,
            currency: this.moneda,
            expiration_num: this.caducidadNumero,
            expiration_units: this.caducidadUnidad,
            available_from: this.validezDesde,
            available_to: this.validezHasta,
            nominal: this.nominal,
            active: this.activo,
            last_update: serverTimestamp(),
          });
          console.log('Bono actualizado con éxito!');
        } else {
          // Creación de nuevo bono
          await addDoc(collection(db, 'bonos'), {
            name: this.nombre,
            description: this.descripcion,
            amount: this.importe,
            currency: this.moneda,
            expiration_num: this.caducidadNumero,
            expiration_units: this.caducidadUnidad,
            available_from: this.validezDesde,
            available_to: this.validezHasta,
            nominal: this.nominal,
            active: this.activo,
            creation_time: serverTimestamp(),
            last_update: serverTimestamp(),
          });
          console.log('Bono guardado con éxito!');
        }
        this.router.push('/bonolist');
      } catch (error) {
        console.error('Error al guardar/actualizar el bono:', error);
      }
    },
    cancelarEdicion() {
      this.router.push('/bonolist');
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