import React from "react";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { authContext } from "./../context/auth";

function getCookies() {
  return document.cookie.split(";").reduce((res, c) => {
    const [key, val] = c.trim().split("=").map(decodeURIComponent);
    const allNumbers = (str) => /^\d+$/.test(str);
    try {
      return Object.assign(res, {
        [key]: allNumbers(val) ? val : JSON.parse(val),
      });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    try {
      await axios.post(
        "http://localhost:4000/login",
        { email, password },
        { withCredentials: true }
      );

      setUser(getCookies().login);
      // setUser({ email: "Urkel@gmail.com", id: 1 });
      localStorage.setItem("loggedIn", true);
    } catch (error) {
      throw error;
    }

    // function getCookies() {
    //   return document.cookie.split(";").reduce((res, c) => {
    //     const [key, val] = c.trim().split("=").map(decodeURIComponent);
    //     const allNumbers = (str) => /^\d+$/.test(str);
    //     try {
    //       return Object.assign(res, {
    //         [key]: allNumbers(val) ? val : JSON.parse(val),
    //       });
    //     } catch (e) {
    //       return Object.assign(res, { [key]: val });
    //     }
    //   }, {});
    // }
  }

  async function signUp(email, password) {
    try {
      const { user } = await axios.post(
        "http://localhost:4000/register",
        { email, password },
        { withCredentials: true }
      );
      // setUser(user);
      // setUser({ email: "Urkel@gmail.com", id: 1 });
      alert("registered, fix this method");
      // redirect to sign in
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(false);
      localStorage.setItem("loggedIn", false); // Required to log out sessions in other tabs
    } catch (error) {
      throw error;
    }
  }

  useEffect(function () {
    if (getCookies().login) {
      setUser(getCookies().login);
    } else {
      setUser(false);
    }
  }, []);

  return {
    user,
    signIn,
    signOut,
    signUp,
    setUser,
  };
}
