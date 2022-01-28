<template>
  <div class="total-score">
    <div class="this-game">
      <h6>This Game</h6>
      <table class="table">
        <thead>
          <tr>
            <td>Player</td>
            <td>All Answers</td>
            <td>True Answers</td>
            <td>Wrong Answers</td>
            <td>Total Points</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ PLAYER }}</td>
            <td>{{ TOTAL_TRUE + TOTAL_WRONG }}</td>
            <td>{{ TOTAL_TRUE }}</td>
            <td>{{ TOTAL_WRONG }}</td>
            <td>{{ POINTS }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h6>History</h6>
    <table class="table">
      <thead>
        <tr>
          <td>Player</td>
          <td>All Answers</td>
          <td>True Answers</td>
          <td>Wrong Answers</td>
          <td>Total Points</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="score in history" :key="score.playerH">
          <td>{{ score.playerH }}</td>
          <td>{{ score.allAnswers }}</td>
          <td>{{ score.trueAnswers }}</td>
          <td>{{ score.falseAnswers }}</td>
          <td>{{ score.pointsH }}</td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'game' }">
      <button>Back to Game</button>
    </router-link>
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
    ...mapGetters(["PLAYER", "POINTS", "TOTAL_TRUE", "TOTAL_WRONG", "HISTORY"]),
  },
  methods: {},
  mounted() {
    let raw = localStorage.getItem("history");
    const history = JSON.parse(raw);
    console.log(history);
    this.history = history;
  },
};
</script>

<style scoped>
.total-score {
  margin-top: 20px;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
}
.this-game {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
}
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 5px solid #fff;
  border-top: 5px solid #fff;
  border-bottom: 3px solid #fff;
  border-collapse: collapse;
  outline: 3px solid #ffd300;
  font-size: 15px;
  background: #fff !important;
}
.table th {
  font-weight: bold;
  padding: 7px;
  background: #ffd300;
  border: none;
  text-align: left;
  font-size: 15px;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #ffd300;
}
.table td {
  padding: 7px;
  border: none;
  border-top: 3px solid #fff;
  border-bottom: 3px solid #fff;
  font-size: 15px;
}
.table tbody tr:nth-child(even) {
  background: #f8f8f8 !important;
}
</style>
