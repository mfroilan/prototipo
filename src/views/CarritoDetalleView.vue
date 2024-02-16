<template>
  <div class="cart-wrapper">
    <p>&nbsp;</p>
    <h2 class="section-title">Detalle del Carrito</h2>
    <!-- Aquí va el contenido del carrito -->
    <div class="cart-container">
      <table class="cart-table">
        <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>P.U.</th>
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
          <td>{{ item.producto.precio }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ calcularElSubtotal(item) }}</td>
          <td>
            <button @click="removerDelCarrito(item)">Remover</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="cart-total">
        <h4>Total del Carrito</h4>
        <p> Bs. {{ calcularElTotal() }}</p>
        <p>&nbsp;</p>
        <button>Ir a Pagar</button>
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
          const nuevoArticulo = {producto: item, cantidad: 1};
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
/* Estilos para este componente */
.cart-wrapper {
  padding: 10px;
  font-family: 'Arial', sans-serif;
}

.cart-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  text-align: left;
  padding: 4px;
  border-bottom: 1px solid #ddd;
}

.cart-table img {
  width: 42px; /* Tamaño fijo para móviles */
}

.cart-total {
  margin-top: 20px;
  text-align: right;
}

.cart-total h4 {
  margin-bottom: 0.5rem;
}

button {
  background-color: #007bff;
  //border: 1px solid #ddd;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

button:hover {
  //background-color: #3eb0e1;
}

@media (min-width: 768px) {
  .cart-table img {
    width: auto; /* Tamaño más grande para pantallas más grandes */
  }

  .cart-container {
    flex-direction: row;
    justify-content: space-between;
  }

  .cart-total {
    width: 250px;
    margin-top: 0;
  }

}
</style>
