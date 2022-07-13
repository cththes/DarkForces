import axios from "axios";
import { AllPeopleType } from "../types/types";

const instance = axios.create({
  baseURL: `https://swapi.dev/api/people/`,
});



let promises: any = [];
for (let i = 0; i < 9; i++) {
  promises.push(instance.get<AllPeopleType>(`?page=${i + 1}`));
}

export const peopleAPI = {
  getPeople() {
    return Promise.all(promises).then((responses) => {
      return responses;
    });
  },
};

