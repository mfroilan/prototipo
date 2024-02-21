<template>
  <div class="productos-container">
    <!-- Titulo de la vista -->
    <h2 class="section-title">Productos</h2>

    <!-- Barra de búsqueda -->
    <div class="search-bar-container">
      <div class="search-bar">
        <input type="text"
               v-model="terminoDeBusqueda" placeholder="🔍 Buscar por nombre..." class="search-input"/>
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

import CartIndicator from './CarritoIndicadorView.vue';
import ProductItem from './ProductoItemView.vue';

export default {
  components: {
    CartIndicator,
    ProductItem
  },
  data() {
    return {
      productos: [],
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
  mounted() {
    this.obtenerProductos();
  },
  methods: {
    agregarAlCarrito(pProducto) {
      this.cantidadDeProductos++;
      let itemsDelCarrito = JSON.parse(localStorage.getItem('cartItems')) || [];
      itemsDelCarrito.push(pProducto);
      localStorage.setItem('cartItems', JSON.stringify(itemsDelCarrito));
    },
    obtenerProductos() {
      const URL_LOCAL = "http://localhost:2024";
      fetch(`${URL_LOCAL}/api/v1/productos`)
          .then(response => response.json())
          .then(data => {
            this.productos = data; // Almacenar los productos en el estado
          })
          .catch(error => console.error('Error al obtener los productos:', error));
    },
  }
};
</script>

<style>
.productos-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.cart-indicator-container {
  margin-bottom: 20px;
}
</style>
