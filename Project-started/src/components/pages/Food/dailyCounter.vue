<template>
  <div id="app">
    <nav class="main-nav">
      <Burger></Burger>
    </nav>
    <Sidebar class="burger-button">
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
    <v-app>
      <h1>Here you can add what you have eaten for the day</h1>
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <v-row align="center">
              <v-data-table
                :headers="headers"
                :items="desserts"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-toolbar-title>Your total calories for the day is: {{totalCurrent}} kcal</v-toolbar-title>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon

                    class="ma-2"
                    color="purple"
                    dark
                    @click="editItem(item)"
                  >{{icons.mdiFileEdit}}</v-icon>
                  <v-icon
                    class="ma-2"
                    color="red"
                    dark
                    @click="deleteItem(item)"
                  >{{ icons.mdiDelete }}</v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
              </v-data-table>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template> 

<script>
import Vuetify from "vuetify";
import AppHeader from "@/components/core/Header.vue";
import Noty from "noty";
import Burger from "@/components/core/Menu/Burger.vue";
import Sidebar from "@/components/core/Menu/Sidebar.vue";
import UTable from "@/components/pages/Food/dailyCounter.vue";

import {
  mdiAccount,
  mdiFileEdit,
  mdiPencil,
  mdiShareVariant,
  mdiDelete,
  mdiFolderPlusOutline
} from "@mdi/js";

export default {
  name: "youTable",
  vuetify: new Vuetify(),
  components: {
    AppHeader,
    Burger,
    Sidebar,
    UTable
  },
  data() {
    return {
      absolute: true,
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
        mdiFileEdit,
        mdiFolderPlusOutline
      },
      miniVariant: true,
      sum: 0,
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "name",
      keys: [
        "Name",
        "Calories",
        "Fat",
        "Carbs",
        "Protein",
        "Sodium",
        "Calcium",
        "Iron"
      ],
      items: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ],

      dialog: false,
      headers: [
        {
          text: "Meal (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    totalCurrent() {
      return this.desserts.reduce((acc, cur) => acc + Number(cur.calories), 0);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      const i = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
      this.desserts.splice(i, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
#app {
  background-image: linear-gradient(
      to top right,
      rgba(138, 148, 209, 0.7),
      rgba(73, 82, 129, 0.7)
    ),
    url("https://images5.alphacoders.com/736/736373.jpg");
}
h1 {
  font-size: 50px;
  color: #1a1466;
  text-transform: uppercase;
  font-weight: normal;
  line-height: 1;
  text-align: center;
  margin: 0px 50px 0 50px;
  padding-top: -60px;
}
html {
  height: 100%;
  overflow: hidden;
}
body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: "Lato";
  height: 100%;
  background: rgb(101, 31, 87);
  background: linear-gradient(
    45deg,
    rgb(245, 245, 245) 0%,
    rgba(225, 113, 87, 1) 48%,
    rgba(249, 248, 113, 1) 100%
  );
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
</style>