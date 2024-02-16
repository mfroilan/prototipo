<template>
  <div class="producto-form-container">
    <h2 class="section-title">Registro</h2>
    <p>&nbsp;</p>
    <form class="product-form">
      <div class="form-group">
        <label for="product-name">Nombre del producto</label>
        <input type="text" id="product-name" name="product-name" placeholder="Introduce el nombre del producto"
               required>
      </div>

      <div class="form-group">
        <label for="product-price">Precio</label>
        <input type="number" id="product-price" name="product-price" placeholder="Introduce el precio" required>
      </div>

      <div class="form-group">
        <label for="product-image">Imagen del producto</label>
        <input type="file" id="product-image" name="product-image" accept="image/*" required>
      </div>

      <button type="submit" class="submit-btn">Registrar Producto</button>
    </form>
  </div>
</template>

<style>
.producto-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.product-form {
  max-width: 500px;
  margin: 0 auto;
  background: #ECEFF1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.form-group input[type="file"] {
  padding: 5px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #555;
}

/* Estilos para pantallas más grandes */
@media (min-width: 768px) {
  body {
    padding: 40px;
  }

  .product-form {
    padding: 30px;
  }
}

</style>
<script setup>
</script>