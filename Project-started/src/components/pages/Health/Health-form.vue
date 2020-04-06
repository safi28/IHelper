<template>
  <div class="app">
    <mainMenu></mainMenu>
    <v-card></v-card>
    <div class="container">
      <h2>Questions</h2>
      <div id="questionArea" v-if="questions.length &gt; 0">
        <p id="questionDisplay">{{questions[index].question}}</p>
        <div
          for="radio-1"
          class="option"
          id="possibleAnswersDisplay"
          v-for="pa in questions[index].possibleAnswers"
        >
          <label for="silver" aria-label="Silver">
            <input
              name="card"
              id="silver"
              value="silver"
              type="radio"
              checked
              v-model="userAnswer"
              v-bind:value="pa"
            />
            <span></span>
            {{pa}}
          </label>
        </div>
        <button class="btn btn-block btn-primary" id="finalAnswer" @click="checkAnswer">Final Answer</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import Json from "../../../../public/Health-questions.json";
import mainMenu from "@/components/core/Menu/Main.vue";
export default {
  name: "Health",
  components:{mainMenu},
  data() {
    return {
      message: "",
      userInfo: { userName: "A" },
      userScore: 0,
      questions: [],
      index: 0,
      userAnswer: "",
      baseUrl: Json
    };
  },
  // mixins: [quizMixin],
  ready() {
    console.log("ready");
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("Health-questions.json").then(json => {
        this.questions.push(...json.data);
      });
    },
    checkAnswer() {
      if (this.userAnswer == this.questions[this.index].correctAnswer) {
        this.userScore++;
      }
      this.updateIndex();
    },
    updateIndex() {
      if (this.index < this.questions.length - 1) {
        this.index++;
      } else {
        this.displayResults();
      }
    },
    displayResults() {
      if (parseInt(this.userScore) / this.questions.length > 0.7) {
        alert(
          `You got ${this.userScore} points, your daily food and movement habit is good!`
        );
      } else {
        alert(
          `You got only ${this.userScore} points, you need to change your food habit and start workout if you want to be healthy!`
        );
      }
      this.restartQuiz();
    },
    restartQuiz: function() {
      this.userScore = 0;
      this.index = 0;
    }
  }
};
</script>

<style scoped>
html,
body {
  font-family: "Muli", sans-serif;
  background-color: #272936;
  color: #a6a8b6;
}

.container {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}


</style>
