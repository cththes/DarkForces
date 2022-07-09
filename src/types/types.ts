export type PlayersType = Array<Array<Array<number>>>

export type AllPeopleType = {
   name: string
   height: string
   mass: string
   hair_color: string
   skin_color: string
   eye_color: string
   birth_year: string
   gender: string
   homeworld: string
   films: Array<string>
   species: Array<any>
   vehicles: Array<any>
   starships: Array<any>
   created: string
   edited: string
   url: string
}
export type PeopleWithStrengthType = AllPeopleType
export type RequestPeopleResultsType = AllPeopleType