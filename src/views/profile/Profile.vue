<template>
  <nav-bar>
    <template v-slot:left>
    </template>
    <template v-slot:default>个人</template>
  </nav-bar>
  <h1>个人</h1>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: "Category",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>