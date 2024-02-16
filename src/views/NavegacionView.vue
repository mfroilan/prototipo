<script>
export default {};
</script>
<template>
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/about">Registrar</RouterLink>
    <RouterLink to="/cart">Pedido</RouterLink>
  </nav>
</template>

<style>
nav a.router-link-exact-active {
  color: yellow;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
/* Estilos de la barra de navegación */
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

a {
  color: white;
  text-decoration: none;
  font-size: 15px;
}
</style>
