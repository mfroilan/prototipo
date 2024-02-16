<template>
  <div class="product-item">
    <!-- Contenido del producto -->
    <img :src="producto_prop.imagenProducto" alt="Producto" class="product-image"/>
    <div class="product-details">
      <h3>{{ producto_prop.nombre }}</h3>
      <p>Precio: Bs. {{ producto_prop.precio }}</p>
      <button @click="agregarAlCarrito">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['producto_prop'],
  methods: {
    agregarAlCarrito() {
      this.$emit('agregar-a-carrito', this.producto_prop);
    }
  }
}
</script>

<style>
@import '../assets/productos.css';
</style>