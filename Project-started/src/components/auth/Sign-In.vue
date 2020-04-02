<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs14 sm89 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
         
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <div class="text-xs-center">
                      <v-btn rounded type="submit" :disabled="loading" :loading="loading">
                        Sign in
                        <span slot="loader" class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </v-btn>
                    </div>

                    <br />
                 
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/dashboard");
      }
    }
  },
  methods: {
    onSignin() {
      this.$store
        .dispatch("signUserIn", {
          email: this.email,
          password: this.password
        })
        .catch(err => {
          this.$noty.error("Error while log in!");
        });
      this.$noty.success("Logged in successfully!");
      this.$router.replace({ name: "privateHome" });
    },

    onResetPassword() {
      if (this.email === "") {
        return this.$store.dispatch("setError", {
          message: "Email can not be blank"
        });
      }
      this.$store.dispatch("resetPasswordWithEmail", { email: this.email });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style lang="css" scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif;
  font-weight: 300;
  margin: 0;
}

html, body {
  height: 100vh;
  width: 100vw;
  margin: 0 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: start;
          align-items: flex-start;
  -webkit-box-pack: start;
          justify-content: flex-start;
  background: #f3f2f2;
}

h4 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  opacity: .85;
}

label {
  font-size: 12.5px;
  color: #000;
  opacity: .8;
  font-weight: 400;
}

form {
  padding: 40px 30px;
  background: #fefefe;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-align: start;
          align-items: flex-start;
  padding-bottom: 20px;
  width: 300px;
}
form h4 {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.5);
}
form h4 span {
  color: black;
  font-weight: 700;
}
form p {
  line-height: 155%;
  margin-bottom: 5px;
  font-size: 14px;
  color: #000;
  opacity: .65;
  font-weight: 400;
  max-width: 200px;
  margin-bottom: 40px;
}


</style>