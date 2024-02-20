<template>
  <div class="cart-wrapper">
    <p>&nbsp;</p>
    <h2 class="section-title">Detalle del Carrito</h2>
    <!-- Aquí va el contenido del carrito -->
    <div class="cart-container" v-if="itemsAgrupadosDelCarrito.length > 0">
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
            <img :src="obtenerUrlImagen(item.producto.rutaImagenProducto)" :alt="item.producto.nombre" width="48">
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
      <div class="cart-total" >
        <h4>Total del Carrito</h4>
        <p> Bs. {{ calcularElTotal() }}</p>
        <p>&nbsp;</p>
        <button @click="completarPago">Ir a Pagar</button>
      </div>

      <div v-if="mensajeExito" class="mensaje-exito">
        {{ mensajeExito }}
      </div>
    </div>
    <div v-else>
      <span style="color: #9cecc4">
        {{this.mensaje}}
      </span>
    </div>
  </div>
</template>

<script>
import imagenPredeterminada from "@/assets/3561856_blank_dead_emoticon_icon.png";

export default {
  data() {
    return {
      articulosDelCarrito: [],
      mensajeExito: '',
      mensaje: 'Aun no agrego artículos al carrito 😮'
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
        this.articulosDelCarrito.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.articulosDelCarrito));
      }
    },
    obtenerUrlImagen(rutaRelativa) {
      if (!rutaRelativa) {
        return imagenPredeterminada;
      }
      const nombreArchivo = rutaRelativa.split('\\').pop();
      return `http://localhost:2024/api/v1/productos/images/${nombreArchivo}`;
    },
    completarPago() {
      const datosCarrito = {
        id: this.obtenerEnteroAleatorio(10, 100),
        fechaCreacion: this.obtenerFechaHoy(),
        estado: "ACTIVO"
      };

      fetch('http://localhost:2024/api/v1/carritos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCarrito)
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Problema al realizar la solicitud POST');
            }
            return response.json();
          })
          .then(data => {
            const lineasCarrito = this.itemsAgrupadosDelCarrito.map((item) => ({
              id: this.obtenerEnteroAleatorio(100, 1000),
              carritoId: data.id,
              productoId: item.producto.id,
              cantidad: item.cantidad,
              precioUnitario: item.producto.precio
            }));
            const promesasDeLineasCarrito = lineasCarrito.map(linea => {
              return fetch(`http://localhost:2024/api/v1/carritos/${linea.carritoId}/agregar-linea`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(linea)
              })
                  .then(responseLinea => {
                    if (!responseLinea.ok) {
                      throw new Error(`Error al agregar línea para productoId: ${linea.productoId}`);
                    }
                    const contentType = responseLinea.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                      return responseLinea.json();
                    } else {
                      return responseLinea.text();
                    }
                  });
            });
            return Promise.all(promesasDeLineasCarrito); // Esperar a que todas las solicitudes de agregar líneas al carrito se completen
          }).then(resultados => {
        console.log('Todas las líneas del carrito han sido agregadas exitosamente', resultados);
        this.mensajeExito = 'El pago ha sido realizado con éxito 👌';
        setTimeout(() => {
          this.limpiarArticulosDelCarrito();
          this.$router.push('/');
        }, 3000);
      }).catch(error => {
        console.error('Error:', error.message);
      });
    },
    limpiarArticulosDelCarrito() {
      localStorage.removeItem('cartItems');
    },
    obtenerEnteroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    obtenerFechaHoy() {
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = fecha.getMonth() + 1; // La funcion getMonth() devuelve un valor entre 0 (enero) y 11 (diciembre)
      const dia = fecha.getDate();

      const mesFormateado = mes < 10 ? `0${mes}` : mes;
      const diaFormateado = dia < 10 ? `0${dia}` : dia;

      return `${anio}-${mesFormateado}-${diaFormateado}`;
    }
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

.mensaje-exito {
  color: #28a745;
  background-color: #e2e6ea;
  border-left: 5px solid #28a745;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  font-size: 1rem;
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
