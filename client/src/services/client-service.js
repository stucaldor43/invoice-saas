import { http } from "../utils/http";

/*

// class UserService {
//   static async signIn({ name, password }) {
//     // make call to api route
//     await axios.post("/login")
//   }
// }



export default UserService;

*/
/* {limit: 2} */
export class ClientService {
  static async addClient(clientData) {
    try {
      const { data } = await http.post("/api/client", clientData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getClients(options = {}) {
    const queryString = Object.keys(options).reduce(function (
      accumulator,
      key,
      index,
      arr
    ) {
      return (
        accumulator +
        `${key}=${options[key]}${index === arr.length - 1 ? "" : "&"}`
      );
    },
    "");

    try {
      const { data } = await http.get(`/api/client?${queryString}`, {});
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getClientsBySearchTerm(options) {
    const queryString = Object.keys(options).reduce(function (
      accumulator,
      key,
      index,
      arr
    ) {
      if (key === "q") options[key] = encodeURI(options[key]);

      return (
        accumulator +
        `${key}=${options[key]}${index === arr.length - 1 ? "" : "&"}`
      );
    },
    "");

    try {
      const { data } = await http.get(
        `/api/client/search?${encodeURI(queryString)}`,
        {}
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
