<template>
  <nav-bar>
    <template v-slot:left>
    </template>
    <template v-slot:default>购物车</template>
  </nav-bar>
  <h1>购物车</h1>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: "ShopCart",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>