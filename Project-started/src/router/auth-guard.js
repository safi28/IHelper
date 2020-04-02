import { store } from "../store/index";
import {Noty} from 'noty';

export default (to, from, next) => {
  if (localStorage.getItem('token') !== null) {
    next();
  } else {
    next("/");
  }
};
