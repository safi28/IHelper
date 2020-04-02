import { store } from "../store/index";
import {Noty} from 'noty';

export default (to, from, next) => {
  if (store.getters.user !== null) {
    next();
    this.$router.success('user')
  } else {
    next("/");
    this.$router.error('Error')
  }
};
