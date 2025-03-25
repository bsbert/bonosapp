<template>
    <div class="add-bono-container">
      <button class="add-bono-button" @click="redirigirAEditBono">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  <div class="container">
    <div class="card mb-3" 
      :class="{ 'card-active': bono.active, 'card-inactive': !bono.active }"
      style="max-width: 540px;" 
      v-for="bono in bonos" 
      :key="bono.id"
      @click="mostrarModal(bono)">
      <div class="row g-0">

          <div class="card-body">
            <h5 class="card-title">{{ bono.name }}</h5>
            <p class="card-text">{{ bono.description }}</p>
            <p class="card-text">
              <small :class="{ 'text-muted': bono.active }">
                Activo desde: {{ formatDate(bono.available_from) }}
              </small>
            </p>
            <p class="card-text">
              <small :class="{ 'text-muted': bono.active }">
                Activo hasta: {{ formatDate(bono.available_to) }}
              </small>
            </p>
            <p class="card-text">
              <small :class="{ 'text-muted': bono.active }">Precio: {{ bono.nominal }}</small>
            </p>
          </div>
      </div>
    </div>
    <div v-if="mostrarModalBono" class="modal">
      <div class="modal-content">
        <button class="btn btn-danger"@click="borrarBono(bonoSeleccionado.id)" >Borrar</button>
        <button class = "btn btn-info"@click="editarBono(bonoSeleccionado)">Editar</button>
        <button  class = "btn btn-secondary" @click="cerrarModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Asegúrate de que la ruta sea correcta

export default {
  data() {
    return {
      bonos: [],
      mostrarModalBono: false,
      bonoSeleccionado: null,
    };
  },
  mounted() {
    const bonosCollection = collection(db, 'bonos');
    onSnapshot(bonosCollection, (snapshot) => {
      this.bonos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
  created() {
    // Convertir el campo "active" a booleano y ordenar las tarjetas
    this.bonos = this.bonos
      .map((bono) => ({
        ...bono,
        active: bono.active === true, // Convertir a booleano
      }))
      .sort((a, b) => b.active - a.active); // Ordenar: activos primero
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return 'Fecha inválida'; // Manejar fechas inválidas
      }

      const day = date.getDate();
      const month = date.toLocaleString('es-ES', { month: 'short' }); // Obtener el mes abreviado en español
      const year = date.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año

      return `${day}-${month}-${year}`;
    },
    mostrarModal(bono) {
      this.bonoSeleccionado = bono;
      this.mostrarModalBono = true;
    },
    cerrarModal() {
      this.mostrarModalBono = false;
      this.bonoSeleccionado = null;
    },
    async borrarBono(bonoId) {
      try {
        await deleteDoc(doc(db, 'bonos', bonoId)); // Elimina el documento
        console.log('Bono borrado con éxito');
        this.cerrarModal();
      } catch (error) {
        console.error('Error al borrar el bono: ', error);
      }
    },
    editarBono(bono) {
      this.router.push({
        path: '/editbono',
        query: bono,
      });
      this.cerrarModal();
    },
    redirigirAEditBono() {
      this.$router.push('/editbono');
    },
  },
};
</script>

<style>
.container, .modal {
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card-active {
  background-image: linear-gradient(to top, #43e97b 0%, #38f9d7 100%);
  border-color: #c3e6cb;
}

.card-inactive {
  background-image: linear-gradient(to top, #463c52 0%, #38f9d7 100%);
  color: white;
  background-color: #A9A9A9;
  border-color: #d6d8db;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  width: 50%;
}
button{
  margin: 10px;
}

.add-bono-container {
  display: flex;
  justify-content: center;
  width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
  margin: 30px 0px 20px 0px;
}

.add-bono-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>