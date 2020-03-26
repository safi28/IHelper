<template>
  <div id="app">
    <nav class="main-nav">
      <Burger></Burger>
      <router-link :to="{ name: 'LoggedHome' }">
        <img src="../../assets/slogo.png" class="slogo" />
      </router-link>
      <Sidebar>
        <v-list>
          <v-divider></v-divider>
          <router-link :to="{ name: 'LoggedHome' }">
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

      <v-container>
        <v-dialog v-model="dialog" max-width="600px" dark>
          <template v-slot:activator="{ on }">
            <v-img
              src="https://images.vexels.com/media/users/3/130407/isolated/preview/1baad1e614f56cbdb220a518ca35e106-floral-swirls-decorations-by-vexels.png"
              height="70"
              width="500"
              class="flower"
            ></v-img>
            <v-btn class="addbtn" color="pink" dark fab v-on="on">
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
          <v-col v-for="item in tasks" :key="item.id" cols="4" :class="{fade: item.isCompleted}">
            <v-card color="#EC2049" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="item.title"></v-card-title>
                  <v-card-subtitle v-text="item.text"></v-card-subtitle>
                </div>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-card-actions>
                  <v-btn color="white" :checked="item.update" @click="edit(item)" text>Edit</v-btn>

                  <v-btn color="white" @click="deleteItem(item.id)" text>Delete</v-btn>
                  <v-divider class="mx-4" inset vertical></v-divider>

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
      keys: ["Title", "Text"]
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
          text: doc.data().text
        });
      });
      this.close();
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        .update({ title: this.todo.title, text: this.todo.text })
        .then(el => {
          this.todo.title = "";
          this.todo.text = "";
          this.modal = "";
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
          isCompleted: false
        })
        .then(el => {
          this.todo.title = "";
          this.todo.text = "";
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
.checkbox-container {
  float: left;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
  padding: 38px 0px;
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
  height: 24px;
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
  left: 330px;
}
.addbtn {
  top: 100px;
  right: 190px;
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
  background-image: url("https://images.pexels.com/photos/1373965/pexels-photo-1373965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  /* linear-gradient(
      to top right,
      rgba(236, 235, 131, 0.7),
      rgba(201, 47, 20, 0.7)
    ); */

  box-shadow: white 0px 0px 0px 2px, rgb(0, 170, 255) 0px 0px 0px 4px;
  background-position: center center;
  background-size: cover;
}
</style>