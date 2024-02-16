<template>
  <div>
    <h1>Detalle del Carrito</h1>
    <!-- Aquí va el contenido del carrito -->
    <div class="cart-container">
      <div class="cart-items">
        <table class="cart-table">
          <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in itemsAgrupadosDelCarrito" :key="index" class="cart-item">
            <td>
              <img :src="item.producto.imagenProducto" :alt="item.producto.nombre" width="48">
            </td>
            <td>{{ item.producto.nombre }}</td>
            <td>Bs. {{ item.producto.precio }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ calcularElSubtotal(item) }}</td>
            <td><button @click="removerDelCarrito(item)">Remover</button></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-total">
        <h4>Total del Carrito</h4>
        <p> Bs. {{ calcularElTotal() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articulosDelCarrito: []
    };
  },
  computed: {
    itemsAgrupadosDelCarrito() {
      const articulosAgrupados = [];
      const cartMap = new Map();

      // Agrupar los productos del carrito
      this.articulosDelCarrito.forEach(item => {
        if (cartMap.has(item.id)) {
          const articuloExistente = cartMap.get(item.id);
          articuloExistente.cantidad += 1;
        } else {
          const nuevoArticulo = { producto: item, cantidad: 1 };
          cartMap.set(item.id, nuevoArticulo);
        }
      });

      // Convertir el Map a un array para su fácil manipulación
      cartMap.forEach(item => {
        articulosAgrupados.push(item);
      });

      return articulosAgrupados;
    }
  },
  // Método para obtener los productos del carrito desde el localStorage
  mounted() {
    this.articulosDelCarrito = JSON.parse(localStorage.getItem('cartItems')) || [];
  },
  methods: {
    calcularElSubtotal(item) {
      return item.producto.precio * item.cantidad;
    },
    calcularElTotal() {
      let total = 0;
      this.itemsAgrupadosDelCarrito.forEach(item => {
        total += this.calcularElSubtotal(item);
      });
      return total;
    },
    removerDelCarrito(item) {
      const index = this.articulosDelCarrito.findIndex(cartItem => cartItem.id === item.producto.id);
      if (index !== -1) {
        this.articulosDelCarrito.splice(index, 1); // Eliminar el producto del carrito
        localStorage.setItem('cartItems', JSON.stringify(this.articulosDelCarrito)); // Actualizar el localStorage
      }
    },
  }
};
</script>

<style scoped>
/* Estilos para el componente */
.cart-container {
  display: flex;
  justify-content: space-between;
}

.cart-items {
  width: 70%;
}

.cart-total {
  width: 25%;
  padding: 10px;
  border-radius: 5px;
}

.cart-total h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.cart-total p {
  font-size: 18px;
  font-weight: bold;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.cart-item:nth-child(even) {
  background-color: #FFA726;
  color: #282828;
}

.cart-item:hover {
  /*background-color: #E8EAF6;*/
}
</style>
