<template>
  <div id="app">
    <nav class="main-nav">
      <mainMenu></mainMenu>
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
                  <v-avatar class="ma-1" size="125" tile>
                    <v-img :src="item.img"></v-img>
                  </v-avatar>
                  <v-divider class="mx-6" inset vertical></v-divider>

                  <v-card-actions>
                    <v-btn color="white" :checked="item.update" @click="edit(item)" text>Edit</v-btn>

                    <v-btn color="white" @click="deleteItem(item.id)" text>Delete</v-btn>
                    <v-divider class="mx-6" inset vertical></v-divider>

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

import mainMenu from "@/components/core/Menu/Main.vue";
import db from "@/main.js";
import * as firebase from "firebase/app";
import router from "@/router/index.js";
import Noty from "noty";
export default {
  vuetify: new Vuetify(),
  name: "meist",
  components: { mainMenu },
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
        img: ""
      },
      modal: null,
      items: [],
      dialog: false,

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
        .then(data => {})
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
      this.close();
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
    }
  }
};
</script>

<style scoped>
@import url("./styles.css");
</style>