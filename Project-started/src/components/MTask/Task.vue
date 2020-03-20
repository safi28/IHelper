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
      <!-- <v-card max-width="3000" height="1000" class="mx-auto"> -->
      <!-- <hr /> -->
      <h1>Your TODO list</h1>

      <hr />

      <v-container>
        <v-row dense>
          <!-- <v-col :cols="items.flex">
                <v-card color="#385F73" dark>
                  <v-card-title class="headline">Unlimited music now</v-card-title>

                  <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                  <v-card-actions>
                    <v-btn text>Listen Now</v-btn>
                  </v-card-actions>
                </v-card>
          </v-col>-->
          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on }">
              <v-btn class="addbtn" color="pink" dark fab v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field v-model="editedItem.text" label="Text"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.prevent="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <template v-slot:item.actions="{ item }">
            <v-icon class="ma-2" color="purple" dark @click="editItem(item)">edit</v-icon>
            <v-icon class="ma-2" color="red" dark @click="deleteItem(item)">delete</v-icon>
          </template>
          <v-col v-for="(item, i) in items" :key="i" :cols="items.flex">
            <v-card :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="item.title"></v-card-title>

                  <v-card-subtitle v-text="item.title"></v-card-subtitle>
                </div>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.text"></v-img>
                </v-avatar>
                <v-card-actions>
                  <v-btn color="white" text>Share</v-btn>

                  <v-btn color="white " text>Explore</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- </v-card> -->
    </v-app>
  </div>
</template>

<script>
import Vuetify from "vuetify";
import Burger from "@/components/core/Menu/Burger.vue";
import Sidebar from "@/components/core/Menu/Sidebar.vue";
export default {
  vuetify: new Vuetify(),
  name: "meist",
  components: { Burger, Sidebar },
  data() {
    return {
      items: [
        // {
        //   color: "#e0b2ab",
        //   title: "Halcyon Days",
        //   text: "TODO some homework",
        //   flex: 6
        // },
        // {
        //   color: "#952175",
        //   src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        //   title: "Halcyon Days",
        //   artist: "Ellie Goulding",
        //   flex: 6
        // },
        // {
        //   color: "#1F7087",
        //   src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   title: "Supermodel",
        //   artist: "Foster the People",
        //   flex: 12
        // },
        // {
        //   color: "#e0b2ab",
        //   title: "Halcyon Days",
        //   text: "TODO some homework",
        //   flex: 6
        // }
      ],
      selected: [],

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
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
.addbtn {
  top: 100px;
  right: 190px;
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