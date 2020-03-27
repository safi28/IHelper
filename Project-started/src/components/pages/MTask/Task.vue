<template>
  <div id="app">
    <nav class="main-nav">
      <Burger></Burger>
      <router-link :to="{ name: 'privateHome' }">
        <img src="../../assets/slogo.png" class="slogo" />
      </router-link>
      <Sidebar>
        <v-list>
          <v-divider></v-divider>
          <router-link :to="{ name: 'privateHome' }">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Dashboard
                <router-link to="/dashboard"></router-link>
              </v-list-item-title>

              <v-list-item-icon></v-list-item-icon>
            </v-list-item>
          </router-link>
          <router-link :to="{ name: 'About'}">
            <v-list-item>
              <v-list-item-icon link class="title">
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Health
                <router-link to="/about"></router-link>
              </v-list-item-title>

              <v-list-item-icon></v-list-item-icon>
            </v-list-item>
          </router-link>
          <router-link :to="{ name: 'Calories'}">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-food-apple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Food
                <router-link to="/calories"></router-link>
              </v-list-item-title>

              <v-list-item-icon></v-list-item-icon>
            </v-list-item>
          </router-link>
          <router-link :to="{ name: 'About'}">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-help-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                About
                <router-link to="/about"></router-link>
              </v-list-item-title>

              <v-list-item-icon></v-list-item-icon>
            </v-list-item>
          </router-link>
          <router-link :to="{ name: 'About'}">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-help-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                About
                <router-link to="/about"></router-link>
              </v-list-item-title>

              <v-list-item-icon></v-list-item-icon>
            </v-list-item>
          </router-link>
        </v-list>
      </Sidebar>
    </nav>

    <v-app>
      <h1>Things To Do</h1>
      <hr />
      <v-card max-width="600">
        <v-row dense class="playlist">
          <v-dialog v-model="dialog" max-width="600px" dark>
            <template v-slot:activator="{ on }">
              <v-btn class="addbtn" color="#78244C" dark fab v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Thing to do:</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field v-model="todo.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field v-model="todo.text" label="Text"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field v-model="todo.img" label="Image"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.prevent="close">Cancel</v-btn>
                <v-btn v-if="modal !== 'edit'" color="blue darken-1" text @click="save">Save</v-btn>
                <v-btn v-else color="blue darken-1" text @click="updateEdit">Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-row dense>
            <v-col v-for="item in tasks" :key="item.id" :class="{fade: item.isCompleted}">
              <v-card color="#59253A" dark>
                <div class="d-flex">
                  <div>
                    <v-card-title class="headline" v-text="item.title"></v-card-title>
                    <v-card-subtitle v-text="item.text"></v-card-subtitle>
                  </div>
                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.img"></v-img>
                  </v-avatar>
                  <v-divider class="mx-2" inset vertical></v-divider>

                  <v-card-actions>
                    <v-btn color="white" :checked="item.update" @click="edit(item)" text>Edit</v-btn>

                    <v-btn color="white" @click="deleteItem(item.id)" text>Delete</v-btn>
                    <v-divider class="mx-2" inset vertical></v-divider>

                    <span class="checkbox-container circular-container">
                      <label class="checkbox-label">
                        <input
                          type="checkbox"
                          :checked="item.isCompleted"
                          @change="updateTodoItem(item.id, $event)"
                        />
                        <span class="checkbox-custom circular"></span>
                      </label>
                    </span>
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-card>
      <v-container>
        <v-card class="pa-2" color="grey lighten-4" max-width="650">
          <v-row class="fill-height">
            <v-col>
              <v-sheet height="64">
                <v-toolbar flat color="white">
                  <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
                  <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                      <v-btn outlined color="grey darken-2" v-on="on">
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :event-color="getEventColor"
                  :now="today"
                  :type="type"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange"
                ></v-calendar>
                <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
                >
                  <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Vuetify from "vuetify";
import Burger from "@/components/core/Menu/Burger.vue";
import Sidebar from "@/components/core/Menu/Sidebar.vue";
import db from "@/main.js";
import * as firebase from "firebase/app";
import router from "@/router/index.js";
import Noty from "noty";
export default {
  vuetify: new Vuetify(),
  name: "meist",
  components: { Burger, Sidebar },
  data() {
    return {
      active: null,
      tasks: [],
      selected: false,
      ref: firebase.firestore().collection("tasks"),
      key: this.$route.params.id,
      todo: {
        title: "",
        text: "",
        img: "",
        createdAt: new Date().getHours()
      },
      modal: null,
      items: [],
      editedIndex: -1,
      dialog: false,
      editedItem: {
        title: "",
        text: ""
      },
      defaultItem: {
        title: "",
        artist: "",
        src: ""
      },
      keys: ["Title", "Text"],
      //Calendar data:
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ["blue", "indigo", "deep-purple", "cyan", "grey darken-1"],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party"
      ]
    };
  },
  created() {
    this.getTodos();
  },
  mounted() {
    this.ref.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.items.push({
          key: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          src: doc.data().img
        });
      });
      this.close();
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    updateTodoItem(docId, e) {
      var isChecked = e.target.checked;
      firebase
        .firestore()
        .collection("tasks")
        .doc(docId)
        .update({
          isCompleted: isChecked
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          this.$noty.error("Error");
        });
    },
    edit(item) {
      this.modal = "edit";
      this.todo = item;
      this.active = item.id;
      this.dialog = true;
    },
    updateEdit() {
      firebase
        .firestore()
        .collection("tasks")
        .doc(this.active)
        .update({
          title: this.todo.title,
          text: this.todo.text,
          img: this.todo.img
        })
        .then(el => {
          this.todo.title = "";
          this.todo.text = "";
          this.modal = "";
          this.todo.img = "";
        });
    },
    deleteItem(item) {
      firebase
        .firestore()
        .collection("tasks")
        .doc(item)
        .delete();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      firebase
        .firestore()
        .collection("tasks")
        .add({
          title: this.todo.title,
          text: this.todo.text,
          createdAt: new Date().getHours(),
          isCompleted: false,
          img: this.todo.img
        })
        .then(el => {
          this.todo.title = "";
          this.todo.text = "";
          this.todo.img = "";
        })
        .catch(err => {
          this.$noty.error("Error");
        });
      this.close();
    },
    async getTodos() {
      var todosRef = await firebase.firestore().collection("tasks");
      todosRef.onSnapshot(snap => {
        this.tasks = [];
        snap.forEach(doc => {
          var todo = doc.data();
          todo.id = doc.id;
          this.tasks.push(todo);
        });
      });
    },

    //Calendar data:
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.start = start;
      this.end = end;
      this.events = events;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
};
</script>

<style scoped>
.playlist {
  background-image: url("https://images.pexels.com/photos/1373965/pexels-photo-1373965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    linear-gradient(
      to top right,
      rgba(236, 235, 131, 0.7),
      rgba(201, 47, 20, 0.7)
    );
}
.d-flex {
  left: 42px;
}
.playlist {
  position: absolute;
}
.pa-2 {
  left: 72%;
  bottom: 10%;
  position: absolute;
}
.checkbox-container {
  float: left;
  width: 30%;
  box-sizing: border-box;
  text-align: center;
  /* padding: 30px 0px; */
}

.checkbox-label {
  display: block;
  position: relative;
  margin: auto;
  cursor: pointer;
  font-size: 10px;
  line-height: 8px;
  height: 20px;
  width: 20px;
  clear: both;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-label .checkbox-custom {
  position: absolute;
  top: 0px;
  left: -5px;
  right: 10px;
  height: 24px;
  width: 24px;
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid #d31d1d;
}

.checkbox-label input:checked ~ .checkbox-custom {
  background-color: #c7184d;
  border-radius: 5px;
  -webkit-transform: rotate(0deg) scale(1);
  -ms-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  opacity: 1;
  border: 2px solid #ffffff;
}

.checkbox-label .checkbox-custom::after {
  position: absolute;
  content: "";
  left: 25px;
  top: 12px;
  height: 0px;
  width: 0px;
  border-radius: 5px;
  border: solid #009bff;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(0deg) scale(0);
  -ms-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  opacity: 1;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.1s ease-out;
  -moz-transition: all 0.1s ease-out;
  -ms-transition: all 0.1s ease-out;
  -o-transition: all 0.1s ease-out;
}

.checkbox-label input:checked ~ .checkbox-custom::after {
  -webkit-transform: rotate(45deg) scale(1);
  -ms-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  opacity: 1;
  left: 8px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid #f3f7fa;
  border-width: 0 2px 2px 0;
  background-color: transparent;
  border-radius: 0;
}
.checkbox-label .checkbox-custom::before {
  position: absolute;
  content: "";
  left: 10px;
  top: 10px;
  width: 0px;
  height: 0px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.checkbox-label input:checked ~ .checkbox-custom::before {
  left: -3px;
  top: -3px;
  width: 24px;
  height: 20px;
  border-radius: 5px;
  -webkit-transform: scale(3);
  -ms-transform: scale(3);
  transform: scale(3);
  opacity: 0;
  z-index: 999;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

/* Style for Circular Checkbox */
.checkbox-label .checkbox-custom.circular {
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.checkbox-label input:checked ~ .checkbox-custom.circular {
  background-color: #52032a;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
.checkbox-label input:checked ~ .checkbox-custom.circular::after {
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
}
.checkbox-label .checkbox-custom.circular::after {
  border-radius: 50%;
}

.checkbox-label .checkbox-custom.circular::before {
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.checkbox-label input:checked ~ .checkbox-custom.circular::before {
  border-radius: 50%;
}
.flower {
  left: 565px;
}
.addbtn {
  left: 660px;
  top: 190px;
}
.headline {
  color: #f1d1d9;
  font-family: "Trocchi", serif;
  font-size: 45px;
  font-weight: normal;
  line-height: 48px;
  margin: 0;
}
.slogo {
  width: 90px;
}
.elevation-1 {
  border-radius: 5%;
}
.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
}
.burger-button {
  right: 50%;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
#burger {
  left: 50%;
}
ul.sidebar-panel-nav {
  list-style-type: none;
}
ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
h1 {
  text-align: center;
  color: #ecece7;
  font-family: "Trocchi", serif;
  font-size: 45px;
  font-weight: normal;
  line-height: 48px;
}
#app {
  /* background-image: url("https://images.pexels.com/photos/1373965/pexels-photo-1373965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"); */
  /* linear-gradient(
      to top right,
      rgba(236, 235, 131, 0.7),
      rgba(201, 47, 20, 0.7)
    ); */
  /* background-image: url("https://images.pexels.com/photos/2038556/pexels-photo-2038556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"); */
  background-image: linear-gradient(
      to top right,
      rgba(115, 129, 209, 0.171),
      rgba(25, 36, 97, 0.322)
    ),
    url("https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");

  /* box-shadow: white 0px 0px 0px 2px, rgb(0, 170, 255) 0px 0px 0px 4px; */
  background-position: center center;
  background-size: cover;
}
</style>