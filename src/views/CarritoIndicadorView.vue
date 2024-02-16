<template>
  <div class="cart-indicator" @click="irAlDetalleCarrito">
    <div class="cart-content">
      <img src="../assets/carrito.png" alt="Carrito de productos"/>
      <span>{{ itemContadorProp }}</span>
      <i v-if="itemContadorProp > 1">Productos</i>
      <i v-else-if="itemContadorProp == 1">Producto</i>
      <i v-else></i>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  props: {
    itemContadorProp: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const router = useRouter();
    const irAlDetalleCarrito = () => {
      router.push({name: 'cart-detail'});
    };
    return {irAlDetalleCarrito};
  }
};
</script>

<style scoped>
/* Estilos para el indicador del carrito */
.cart-indicator {
  cursor: pointer;
}

.cart-content {
  display: flex;
  align-items: center;
}

.cart-content span {
  margin-right: 5px;
  color: white;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.cart-content img {
  width: 30px;
  height: 30px;
}
</style>
