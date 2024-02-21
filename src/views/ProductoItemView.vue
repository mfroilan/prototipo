<template>
  <div class="product-item">
    <!-- Contenido del producto -->
    <img :src="obtenerUrlImagen(producto_prop.rutaImagenProducto)" alt="Producto" class="product-image"/>
    <div class="product-details">
      <h3>{{ producto_prop.nombre }}</h3>
      <p>Precio: Bs. {{ producto_prop.precio }}</p>
      <button @click="agregarAlCarrito">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
import imagenPredeterminada from '@/assets/3561856_blank_dead_emoticon_icon.png';
const URL_LOCAL = "http://localhost:2024";

export default {
  props: ['producto_prop'],
  methods: {
    agregarAlCarrito() {
      this.$emit('agregar-a-carrito', this.producto_prop);
    },
    obtenerUrlImagen(rutaRelativa) {
      if (!rutaRelativa) {
        return imagenPredeterminada;
      }
      const nombreArchivo = rutaRelativa.split('\\').pop();
      return `${URL_LOCAL}/api/v1/productos/images/${nombreArchivo}`;
    },
  }
}
</script>

<style>
@import '../assets/productos.css';
</style>