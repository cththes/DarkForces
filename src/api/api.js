import * as axios from "axios";

const instance = axios.create({
  baseURL: `https://swapi.dev/api/people/`,
});

let promises = [];
for (let i = 0; i < 9; i++) {
  promises.push(instance.get(`?page=${i + 1}`));
}

console.log("promises", promises);

export const peopleAPI = {
  getPeople() {
    return Promise.all(promises).then((responses) => {
      console.log("api", responses);
      return responses;
    });
  },
};
