import { createStore } from "redux";
import { navbarReducer, postReducer, userReducer } from ".";

export const navbarStore = createStore(navbarReducer);
export const userStore = createStore(userReducer);
export const postsStore = createStore(postReducer);