<template>
  <div class="game-page-element" @click="showQ" :class="answerTrue">
    {{ value }}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GamePageElement",
  props: {
    value: Number,
    answer: String,
    id: Number,
  },
  data() {
    return {};
  },
  methods: {
    showQ() {
      this.$emit("queClick");
    },
  },

  computed: {
    ...mapGetters(["TRUE_ANSWERS", "WRONG_ANSWERS"]),
    answerTrue() {
      if (this.TRUE_ANSWERS.includes(this.id)) {
        return "bg-light-green-15";
      } else if (this.WRONG_ANSWERS.includes(this.id)) {
        return "bg-red-14";
      } else {
        return "bg-cyan-1";
      }
    },
  },
};
</script>
<style>
/* .game-page-element {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(111, 216, 7, 1);
  font-size: 20px;
} */
</style>
