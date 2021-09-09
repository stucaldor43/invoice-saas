import { createContext } from "react";

const defaultValue = {
  user: null,
  signUp: async function (email, password) {},
  signIn: async function (email, password) {},
  signOut: async function () {},
  setUser: function () {},
};
export const authContext = createContext(defaultValue);
