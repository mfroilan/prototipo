<template>
  <div class="container">
    <h2 class="section-title">Subir Imagen Producto</h2>
    <div class="select-wrapper">
      <select v-model="selectedProductId" class="select-product">
        <option value="" disabled>Seleccione un producto</option>
        <option v-for="producto in productos" :key="producto.id" :value="producto.id">
          {{ producto.nombre }}
        </option>
      </select>
    </div>

    <div class="file-upload-wrapper">
      <input type="file" @change="seleccionarImagen" class="file-input"/>
      <button @click="subirImagen"
              :disabled="!selectedProductId || !imagen"
              class="submit-button">Subir Imagen
      </button>
    </div>

    <div v-if="mensajeExito" class="mensaje-exito">
      {{ mensajeExito }}
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'VistaProductos',
  data() {
    return {
      productos: [],
      selectedProductId: '',
      imagen: null,
      mensajeExito: '',
    };
  },
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    obtenerProductos() {
      axios.get('http://localhost:2024/api/v1/productos')
          .then(response => {
            this.productos = response.data;
          })
          .catch(error => {
            console.error('Error al obtener los productos:', error);
          });
    },
    seleccionarImagen(event) {
      this.imagen = event.target.files[0];
    },
    subirImagen() {
      if (!this.imagen || !this.selectedProductId) {
        alert('Por favor, seleccione un producto y una imagen.');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.imagen);

      axios.post(`http://localhost:2024/api/v1/productos/${this.selectedProductId}/cargar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        console.log('Imagen subida con éxito:', response.data);
        this.mensajeExito = 'La imagen se subió con éxito 👌';
        setTimeout(() => {
          this.$router.push('/');
        }, 3000);
      }).catch(error => {
        console.error('Error al subir la imagen:', error);
      });
    },
  },
};
</script>

<style scoped>

.container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ECEFF1;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

.select-product {
  padding: 0.25rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #333;
}

.file-input {
  border-radius: 4px;
  margin-bottom: 1rem;
  width: calc(100% - 2rem);
  font-size: 1rem;
  color: #333;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  //background-color: #4cae4c;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.mensaje-exito {
  color: #28a745;
  background-color: #e2e6ea;
  border-left: 5px solid #28a745;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    width: 90%;
    padding: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}

/*Para pruebas*/

/*
.file-input {
  display: none;
}

.upload-button {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  display: inline-block;
  margin-bottom: 1rem;
}

.upload-button:hover {
  background-color: #0056b3;
}
*/
</style>

<!--Opcional-->
<!--    <div class="file-upload-wrapper">-->
<!--      <button class="upload-button" @click="triggerFileInput">Seleccionar Imagen</button>-->
<!--      <input type="file" ref="fileInput" @change="seleccionarImagen" class="file-input"/>-->
<!--    </div>-->
<!--Metodo-->
<!--// triggerFileInput() {-->
<!--//   this.$refs.fileInput.click(); // Activa el clic en el input de archivo-->
<!--// },-->