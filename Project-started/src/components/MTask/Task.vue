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
           <v-btn class="addbtn" color="pink" dark fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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

          <v-col v-for="(item, i) in items" :key="i" :cols="items.flex">
            <v-card :color="item.color" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="item.title"></v-card-title>

                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                </div>

                <v-avatar class="ma-3" size="125" tile>
                  <v-img :src="item.src"></v-img>
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
        //   color: "#1F7087",
        //   src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   title: "Supermodel",
        //   artist: "Foster the People",
        //   flex: 12
        // },
        // {
        //   color: "#1F7087",
        //   src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   title: "Supermodel",
        //   artist: "Foster the People",
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
        //   color: "#1F7087",
        //   src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        //   title: "Supermodel",
        //   artist: "Foster the People",
        //   flex: 6
        // },

        {
          color: "#e0b2ab",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
          flex: 6
        },
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
        {
          color: "#d98971",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
          flex: 6
        }
      ],
      selected: [],
      options: [
        { item: "A", name: "Option A" },
        { item: "B", name: "Option B" },
        { item: "D", name: "Option C", notEnabled: true },
        { item: { d: 1 }, name: "Option D" }
      ]
    };
  }
};
</script>

<style scoped>
.addbtn {
  top: 100px;
  right: 150px;
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