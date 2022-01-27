<template>
  <div>
    <router-link :to="{ name: 'game' }">
      <hr />
      <center><h4>Back to game</h4></center>
      <hr />
    </router-link>

    <hr />
    <center><h4>This Game</h4></center>
    <hr />
    <h3>{{ PLAYER }} набрал : {{ POINTS }}</h3>
    <h3>Правильных ответов : {{ TOTAL_TRUE }}</h3>
    <h3>Неправильных ответов : {{ TOTAL_WRONG }}</h3>

    <hr />
    <center><h4>История игр</h4></center>
    <hr />
    <!-- <div v-for="history in GET_HISTORY" :key="history">
      <h3>Игрок {{ history.username }} набрал : {{ history.points }}</h3>
      <h3>Правильных ответов : {{ history.currectAnswersCount }}</h3>
      <h3>Неправильных ответов : {{ history.incorrectAnswersCount }}</h3>
      <h3>Создано: {{ history.createdAt }}</h3>
      <center><h4>**********</h4></center>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "score",
  data() {
    return {
      history: [],
    };
  },
  computed: {
    ...mapGetters(["PLAYER", "POINTS", "TOTAL_TRUE", "TOTAL_WRONG"]),
  },
  methods: {},
  mounted() {
    // let raw = localStorage.getItem("history");
    // const history = JSON.parse(raw);
    // console.log(history);
    // this.history = history;
    console.log(localStorage);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
