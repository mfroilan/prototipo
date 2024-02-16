<template>
  <div>
    <!-- Titulo de la vista -->
    <h2 class="section-title">Productos 🍇🍈🍉</h2>

    <!-- Barra de búsqueda -->
    <div class="search-bar-container">
      <div class="search-bar">
        <input type="text"
               v-model="terminoDeBusqueda" placeholder="Buscar por nombre..." class="search-input"/>
      </div>
    </div>

    <!-- Agregar el componente del indicador del carrito -->
    <div class="cart-indicator-container" v-if="cantidadDeProductos > 0">
      <cart-indicator :item-contador-prop="cantidadDeProductos"></cart-indicator>
    </div>

    <!-- Lista de productos -->
    <div class="product-list">
      <product-item v-for="producto in productosFiltrados" :key="producto.id" :producto_prop="producto"
                    @agregar-a-carrito="agregarAlCarrito"></product-item>
    </div>
  </div>
</template>

<script>
import naranjaUrl from "@/assets/frutas/naranja.png";
import peraUrl from "@/assets/frutas/pera.png";
import sandiaUrl from "@/assets/frutas/sandia.png";

import CartIndicator from './CarritoIndicadorView.vue';
import ProductItem from './ProductoItemView.vue';

export default {
  components: {
    CartIndicator,
    ProductItem
  },
  data() {
    return {
      productos: [
        {id: 1, nombre: 'Naranja', precio: 10, imagenProducto: naranjaUrl},
        {id: 2, nombre: 'Pera', precio: 15, imagenProducto: peraUrl},
        {id: 3, nombre: 'Sandia', precio: 20, imagenProducto: sandiaUrl},
      ],
      terminoDeBusqueda: '',
      cantidadDeProductos: 0
    };
  },
  computed: {
    productosFiltrados() {
      if (this.terminoDeBusqueda !== "") {
        return this.productos.filter((pProducto) =>
            pProducto.nombre.toLowerCase().includes(this.terminoDeBusqueda.toLowerCase())
        );
      }
      return this.productos;
    }
  },
  methods: {
    agregarAlCarrito(pProducto) {
      this.cantidadDeProductos++;
      let itemsDelCarrito = JSON.parse(localStorage.getItem('cartItems')) || [];
      itemsDelCarrito.push(pProducto);
      localStorage.setItem('cartItems', JSON.stringify(itemsDelCarrito));
    },
  }
};
</script>

<style>
.cart-indicator-container {
  margin-bottom: 20px;
}
</style>
