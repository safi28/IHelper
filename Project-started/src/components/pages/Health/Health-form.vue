<template>
  <div class="app">
    <div class="container">
      <h2>Question</h2>
      <div id="questionArea" v-if="questions.length &gt; 0">
        <p id="questionDisplay">{{questions[index].question}}</p>
        <div class="clearfix" id="possibleAnswersDisplay">
          <label class="col-xs-6" v-for="pa in questions[index].possibleAnswers">
            <input type="radio" name="answers" v-model="userAnswer" v-bind:value="pa" />
            <span></span>
            {{pa}}
          </label>
        </div>
        <a class="btn btn-block btn-primary" id="finalAnswer" @click="checkAnswer">Final Answer</a>
      </div>

      <!-- <div class="option">
        <div id="questionArea" v-if="questions.length &gt; 0">
          <p id="questionDisplay">{{questions[index].question}}</p>
          <div class="clearfix" id="possibleAnswersDisplay">
            <input
              type="radio"
              name="card"
              id="silver"
              v-model="userAnswer"
              v-bind:value="pa  "
              value="silver"
            />
            <label class="col-xs-6" v-for="pa in questions[index].possibleAnswers">
              <label for="royal" aria-label="Royal blue">
                <span></span>
                {{pa}}
              </label>
            </label>
          </div>
        </div>
      </div>
      <div class="option">
        <input type="radio" name="card" id="royal" value="royal" />
        <label for="royal" aria-label="Royal blue">
          <span></span>
          Royal blue
          <div class="card card--blue card--sm">
            <div class="card__chip"></div>
            <div class="card__content">
              <div class="card__text">
                <div class="text__row">
                  <div class="text__loader"></div>
                  <div class="text__loader"></div>
                </div>
                <div class="text__row">
                  <div class="text__loader"></div>
                  <div class="text__loader"></div>
                </div>
              </div>
              <div class="card__symbol">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </label>
      </div>

      <div class="option">
        <input type="radio" name="card" id="dark" value="dark" />
        <label for="dark" aria-label="Dark grey">
          <span></span>
          Dark grey
          <div class="card card--dark card--sm">
            <div class="card__chip"></div>
            <div class="card__content">
              <div class="card__text">
                <div class="text__row">
                  <div class="text__loader"></div>
                  <div class="text__loader"></div>
                </div>
                <div class="text__row">
                  <div class="text__loader"></div>
                  <div class="text__loader"></div>
                </div>
              </div>
              <div class="card__symbol">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </label>
      </div>-->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import Json from "../../../../public/Health-questions.json";
// const baseUrl = "https://sampleapis.com/futurama/api/questions";
import quizMixin from '@/mixins/quiz-mixin'
export default {
  name: "Health",
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
  mixins: [quizMixin],
  ready() {
    console.log("ready");
  },
  created() {
    this.getQuiz();
  },
  methods: {
    fetchData() {
      // fetch(`${this.baseUrl}`)
      //   .then(resp => resp.json())
      //   .then(json => this.questions.push(...json));
  
    
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
        alert(`You got ${this.userScore} answers correct, you pass!`);
      } else {
        alert(
          `You got only ${this.userScore} answers correct, you need to rewatch all episodes. NOW!`
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

[type="radio"] {
  z-index: -1;
  position: absolute;
  opacity: 0;
}
[type="radio"]:checked ~ label {
  border-color: #4062f6;
  background-color: rgba(97, 154, 234, 0.16);
  color: #fff;
}
[type="radio"]:checked ~ label:before {
  will-change: transform, border-width, border-color;
  -webkit-animation: bubble 1s ease-in;
  animation: bubble 1s ease-in;
}
[type="radio"]:checked ~ label:after {
  will-change: opacity, box-shadow;
  -webkit-animation: sparkles 700ms ease-in-out;
  animation: sparkles 700ms ease-in-out;
}
[type="radio"]:checked ~ label > span {
  will-change: transform;
  border: 0;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    right top,
    from(#6e89ff),
    to(#4363ee)
  );
  background-image: linear-gradient(to top right, #6e89ff, #4363ee);
  -webkit-animation: radio 400ms cubic-bezier(0.17, 0.89, 0.32, 1.49);
  animation: radio 400ms cubic-bezier(0.17, 0.89, 0.32, 1.49);
}
[type="radio"]:checked ~ label > span:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #fff;
}
[type="radio"]:checked ~ label .card {
  will-change: box-shadow;
  -webkit-animation: card 500ms ease-in-out forwards;
  animation: card 500ms ease-in-out forwards;
}
[type="radio"]:checked ~ label .card:after {
  will-change: transform;
  -webkit-animation: shine 500ms ease-in forwards;
  animation: shine 500ms ease-in forwards;
  -webkit-animation-delay: 100ms;
  animation-delay: 100ms;
}

label {
  position: relative;
  display: grid;
  -webkit-box-align: center;
  align-items: center;
  grid-template-columns: 20px auto 100px;
  grid-gap: 20px;
  width: 320px;
  height: 62px;
  padding: 0 20px;
  border-radius: 6px;
  border: 2px solid transparent;
  background-color: transparent;
  -webkit-transition: all 300ms ease-in;
  transition: all 300ms ease-in;
}
label:hover {
  border-color: #4062f6;
  background-color: rgba(97, 154, 234, 0.16);
}
label:before,
label:after {
  position: absolute;
  left: 29px;
  border-radius: 50%;
  content: "";
}
label:before {
  margin: -2rem;
  border: solid 2rem #545461;
  width: 4rem;
  height: 4rem;
  -webkit-transform: scale(0);
  transform: scale(0);
}
label:after {
  margin: -0.1875rem;
  width: 0.375rem;
  height: 0.375rem;
  box-shadow: 0.32476rem -2.6875rem 0 -0.1875rem #ff8080,
    -0.32476rem -2.3125rem 0 -0.1875rem #ffed80,
    2.30366rem -1.42172rem 0 -0.1875rem #ffed80,
    1.6055rem -1.69573rem 0 -0.1875rem #a4ff80,
    2.54785rem 0.91464rem 0 -0.1875rem #a4ff80,
    2.32679rem 0.19796rem 0 -0.1875rem #80ffc8,
    0.87346rem 2.56226rem 0 -0.1875rem #80ffc8,
    1.29595rem 1.94258rem 0 -0.1875rem #80c8ff,
    -1.45866rem 2.28045rem 0 -0.1875rem #80c8ff,
    -0.71076rem 2.2244rem 0 -0.1875rem #a480ff,
    -2.69238rem 0.28141rem 0 -0.1875rem #a480ff,
    -2.18226rem 0.8312rem 0 -0.1875rem #ff80ed,
    -1.89869rem -1.92954rem 0 -0.1875rem #ff80ed,
    -2.01047rem -1.18791rem 0 -0.1875rem #ff8080;
}
label > span {
  position: relative;
  display: -webkit-inline-box;
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid #454861;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#3b4059),
    to(#1c1e2d)
  );
  background-image: linear-gradient(to bottom, #3b4059, #1c1e2d);
}

.card {
  position: relative;
  width: 243px;
  height: 152px;
  padding: 22px 24px;
  border-radius: 16px;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.25);
  background-image: linear-gradient(45deg, #fff, #cdcdcd);
  overflow: hidden;
}
.card:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.card:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  -webkit-transform: translateX(-70px);
  transform: translateX(-70px);
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 0)),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0)
  );
}
.card--blue {
  background-image: linear-gradient(45deg, #748dfb, #3859e8);
}
.card--dark {
  background-image: linear-gradient(45deg, #616161, #484848);
}
.card--sm {
  position: absolute;
  right: -76px;
  -webkit-transform: scale(0.24);
  transform: scale(0.24);
}
.card__chip {
  width: 39px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid rgba(102, 84, 50, 0.5);
  box-shadow: inset 1px 1px 0px rgba(179, 146, 86, 0.5);
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#d0a963),
    to(#ffe6ba)
  );
  background-image: linear-gradient(90deg, #d0a963, #ffe6ba);
}
.card__content {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-top: 46px;
}
.card__symbol {
  display: -webkit-box;
  display: flex;
}
.card__symbol span {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #fb4646;
}
.card__symbol span:last-child {
  background-color: rgba(255, 163, 55, 0.75);
  margin-left: -13px;
}

.text__row {
  display: grid;
  grid-template-columns: 54px 64px;
  grid-gap: 6px;
}
.text__row:last-of-type {
  grid-template-columns: 45px 54px;
  margin-top: 7px;
}
.text__loader {
  height: 13px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.4);
}

.option:not(:last-child) {
  margin-bottom: 4px;
}

@-webkit-keyframes radio {
  0%,
  17.5% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes radio {
  0%,
  17.5% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes card {
  0% {
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.25);
    -webkit-transform: scale(0.24);
    transform: scale(0.24);
  }
  45% {
    box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(0.25);
    transform: scale(0.25);
  }
  100% {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4);
    -webkit-transform: scale(0.24);
    transform: scale(0.24);
  }
}
@keyframes card {
  0% {
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.25);
    -webkit-transform: scale(0.24);
    transform: scale(0.24);
  }
  45% {
    box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(0.25);
    transform: scale(0.25);
  }
  100% {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.4);
    -webkit-transform: scale(0.24);
    transform: scale(0.24);
  }
}
@-webkit-keyframes shine {
  from {
    -webkit-transform: translateX(-70px) rotate(10deg);
    transform: translateX(-70px) rotate(10deg);
  }
  to {
    -webkit-transform: translateX(300px) rotate(10deg);
    transform: translateX(300px) rotate(10deg);
  }
}
@keyframes shine {
  from {
    -webkit-transform: translateX(-70px) rotate(10deg);
    transform: translateX(-70px) rotate(10deg);
  }
  to {
    -webkit-transform: translateX(300px) rotate(10deg);
    transform: translateX(300px) rotate(10deg);
  }
}
@-webkit-keyframes bubble {
  15% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border-color: #545461;
    border-width: 2rem;
  }
  30%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border-color: #545461;
    border-width: 0;
  }
}
@keyframes bubble {
  15% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border-color: #545461;
    border-width: 2rem;
  }
  30%,
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    border-color: #545461;
    border-width: 0;
  }
}
@-webkit-keyframes sparkles {
  0%,
  10% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  15% {
    opacity: 1;
    -webkit-transform: scale(1.2) rotate(-20deg);
    transform: scale(1.2) rotate(-20deg);
    box-shadow: 0.32476rem -2.1875rem 0 0rem #ff8080,
      -0.32476rem -1.8125rem 0 0rem #ffed80,
      1.91274rem -1.10998rem 0 0rem #ffed80,
      1.21459rem -1.38398rem 0 0rem #a4ff80,
      2.06039rem 0.80338rem 0 0rem #a4ff80, 1.83932rem 0.0867rem 0 0rem #80ffc8,
      0.65652rem 2.11178rem 0 0rem #80ffc8, 1.07901rem 1.4921rem 0 0rem #80c8ff,
      -1.24172rem 1.82996rem 0 0rem #80c8ff,
      -0.49382rem 1.77391rem 0 0rem #a480ff,
      -2.20492rem 0.17015rem 0 0rem #a480ff,
      -1.69479rem 0.71994rem 0 0rem #ff80ed,
      -1.50777rem -1.61779rem 0 0rem #ff80ed,
      -1.61955rem -0.87617rem 0 0rem #ff8080;
  }
}
@keyframes sparkles {
  0%,
  10% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  15% {
    opacity: 1;
    -webkit-transform: scale(1.2) rotate(-20deg);
    transform: scale(1.2) rotate(-20deg);
    box-shadow: 0.32476rem -2.1875rem 0 0rem #ff8080,
      -0.32476rem -1.8125rem 0 0rem #ffed80,
      1.91274rem -1.10998rem 0 0rem #ffed80,
      1.21459rem -1.38398rem 0 0rem #a4ff80,
      2.06039rem 0.80338rem 0 0rem #a4ff80, 1.83932rem 0.0867rem 0 0rem #80ffc8,
      0.65652rem 2.11178rem 0 0rem #80ffc8, 1.07901rem 1.4921rem 0 0rem #80c8ff,
      -1.24172rem 1.82996rem 0 0rem #80c8ff,
      -0.49382rem 1.77391rem 0 0rem #a480ff,
      -2.20492rem 0.17015rem 0 0rem #a480ff,
      -1.69479rem 0.71994rem 0 0rem #ff80ed,
      -1.50777rem -1.61779rem 0 0rem #ff80ed,
      -1.61955rem -0.87617rem 0 0rem #ff8080;
  }
}
</style>
