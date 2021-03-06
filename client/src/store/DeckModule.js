import axios from "axios";
import router from "../router";
let base = window.location.host.includes("localhost:")
  ? "//localhost:3000/"
  : "/";

let api = axios.create({
  baseURL: base + "api/",
  // timeout: 3000,
  withCredentials: true
});
export default {
  actions: {
    async getPublicDecks({ commit, dispatch }, id) {
      try {
        let res = await api.get("decks/");
        commit("setResource", { name: "publicDecks", data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async getUserDecks({ commit, dispatch }, id) {
      try {
        let res = await api.get("decks/private/" + id);
        commit("setResource", { name: "userDecks", data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async addDeck({ commit, dispatch }, payload) {
      try {
        let res = await api.post("decks", payload);
        commit("addUserDeck", res.data);
        router.push({
          name: "deckDetails",
          params: { id: res.data._id }
        });
      } catch (error) {
        console.error(error);
      }
    },

    async getDeckById({ commit, dispatch }, id) {
      try {
        let res = await api.get("decks/" + id);
        commit("setResource", { name: "activeDeck", data: res.data });
      } catch (error) {
        console.error(error);
      }
    },

    async editDeck({ commit, dispatch }, payload) {
      try {
        let res = await api.put("decks/" + payload._id, payload);
        commit("setResource", { name: "activeDeck", data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async removeDeck({ commit, dispatch }, _id) {
      try {
        let res = await api.delete("decks/" + _id);
        commit("clearActiveDeck");
        router.push({
          name: "home"
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
