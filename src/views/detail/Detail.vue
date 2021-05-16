<template>
  <nav-bar>
    <template v-slot:left>
    </template>
    <template v-slot:default>详情{{id}}</template>
  </nav-bar>
  <h1>详情</h1>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {useRoute} from "vue-router";
import {ref} from "vue";
export default {
  name: "Category",
  components: {
    NavBar
  },
  setup() {
    const route = useRoute();

    let id = ref(0);

    id.value = route.query.id;

    return {
      id
    }
  }
}
</script>

<style scoped>

</style>