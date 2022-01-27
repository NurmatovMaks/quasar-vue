<template>
  <div class="start-page">
    <h3 class="registration">Welcome to Jeopardy Game</h3>
    <h6 class="registration">Enter your name</h6>

    <q-input
      class="input"
      v-model="player"
      filled
      lazy-rules
      @keyup.enter="registrations"
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <div class="btn">
      <q-btn
        color="secondary"
        text-color="white"
        label="to score"
        @click="scorePage"
      />

      <q-btn
        color="secondary"
        text-color="white"
        label="let's start"
        @click="registrations"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "start-page",
  data() {
    return {
      player: "",
    };
  },
  methods: {
    ...mapActions(["setPlayer"]),
    scorePage: () => {
      this.$router.push("/score");
    },
    registrations: function () {
      if (this.player) {
        this.setPlayer(this.player);
        this.$router.push("/game");
      } else {
        alert("Please enter your name!");
      }
    },
  },
  computed: {},
};
</script>
<style>
.start-page {
  width: 900px;
  display: flex;
  flex-direction: column;

  align-items: center;
  margin: 0 auto;
  background-color: #9c27b0;
  color: antiquewhite;
}
.input {
  background: #fff;
  height: 53px;
  margin-bottom: 30px;
}
.btn {
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin: 15px;
}
</style>
