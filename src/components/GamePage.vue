<template>
  <div class="game-page">
    <div class="q-pa-md">
      <q-layout
        view="lHh lpr lFf"
        container
        style="height: 475px"
        class="shadow-2 rounded-borders"
      >
        <q-header elevated class="bg-purple">
          <q-toolbar inset>
            <q-toolbar-title>
              <strong>Jeopardy Game</strong>
            </q-toolbar-title>
          </q-toolbar>
          <q-toolbar inset>
            <q-toolbar-title>
              <h6>Players name: {{ PLAYER }}</h6>
            </q-toolbar-title>
          </q-toolbar>
          <q-toolbar inset>
            <q-toolbar-title>
              <h6>Score: {{ POINTS }}</h6>
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
        <div class="table">
          <div v-for="(question, id) in QUESTIONS" :key="id" class="table-in">
            <strong class="table-title">
              {{ question.title }}
            </strong>

            <game-page-element
              @queClick="showModal(item)"
              :adress="address"
              v-for="(item, index) in question.clues"
              :key="index"
              :value="item.value"
              :answer="item.answer"
              :id="item.id"
            />
            <!-- {{q.answer}}  -->
            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">{{ currentQuestion.question }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input
                    placeholder="Type Answer There"
                    dense
                    v-model="address"
                    autofocus
                    @keyup.enter="checkAnswer"
                  />
                  {{ currentQuestion.answer }}
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <h6>{{ timerCount }}</h6>
                  <div>
                    <q-btn
                      @click="checkAnswer"
                      flat
                      label="Enter"
                      v-close-popup
                    />
                  </div>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-layout>
      <router-link :to="{ name: 'startPage' }">
        <q-btn class="end-game" @click="logOut">End Game</q-btn>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import GamePageElement from "./GamePageElement.vue";
export default {
  components: { GamePageElement },
  name: "GamePage",
  data() {
    return {
      alert: false,
      confirm: false,
      prompt: false,

      address: "",
      currentQuestion: {},
      timerCount: 10,
      timerID: "",
    };
  },
  watch: {
    // timerCount: {
    //   handler(value) {
    //     if (value > 0) {
    //       setInterval(() => {
    //         this.timerCount--;
    //       }, 1000);
    //     }
    //   },
    //   immediate: false, // This ensures the watcher is triggered upon creation
    // },
  },
  computed: {
    ...mapGetters(["QUESTIONS", "PLAYER", "POINTS"]),
  },
  methods: {
    startTimer() {
      if (this.timerCount >= 0) {
        const intervalID = setInterval(() => {
          this.timerCount -= 1;
          if (this.timerCount === 0) {
            this.setWrongAnswers(this.currentQuestion.id);
            this.takePoints(this.currentQuestion.value);

            this.stopTimer(intervalID);
            this.prompt = false;
          }
        }, 1000);
        this.timerID = intervalID;
      }
    },
    stopTimer(intervalID) {
      clearInterval(intervalID);
    },
    checkAnswer() {
      // this.answer = this.currentQuestion.answer;
      // console.log(typeof this.currentQuestion.answer);
      // console.log(this.answerData);
      if (this.currentQuestion.answer === this.address) {
        this.setPoints(this.currentQuestion.value);
        this.setTrueAnswers(this.currentQuestion.id);
      } else {
        this.setWrongAnswers(this.currentQuestion.id);
        this.takePoints(this.currentQuestion.value);
      }

      this.stopTimer(this.timerID);
      this.timerCount = 10;
      this.prompt = false;
      this.address = "";
    },
    showModal(item) {
      this.timerCount = 10;
      this.startTimer();
      this.currentQuestion = item;
      this.$data.prompt = true;

      //   this.timerCount
    },
    logOut() {
      this.clearState();
    },

    ...mapActions([
      "GET_QUESTIONS",
      "setTrueAnswers",
      "setWrongAnswers",
      "setPoints",
      "takePoints",
      "clearState",
    ]),
  },
  mounted() {
    this.GET_QUESTIONS();
  },
};
</script>
<style lang="scss">
.bg-purple {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
}
.table {
  margin-top: 125px;
}
.table-in {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(111, 216, 7, 1);
  font-size: 20px;
}
.table-title {
  min-width: 200px;
}
.table-value {
  min-width: 50px;
}
.text-primary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.end-game {
  background-color: rgba(247, 29, 29, 1);
  margin-top: 10px;
  position: absolute;
  bottom: 255px;
  right: 15px;
  padding: 16px;
  border: solid 2px;
  color: aliceblue;
}
</style>
