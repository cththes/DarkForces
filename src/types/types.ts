export type PlayersType = Array<Array<Array<CurrentCardType>>>
export type AllCardsType = PlayersType

export type AllPeopleType = {
   name: string
   height: number
   mass: number
   hair_color: string
   skin_color: string
   eye_color: string
   birth_year: string
   gender: string
   homeworld: string
   films: Array<string>
   species: Array<string>
   vehicles: Array<string>
   starships: Array<string>
   created: string
   edited: string
   url: string
}



export type CurrentCardType = {
   points: number, name: string
}
export type PeopleWithStrengthType = AllPeopleType
export type RequestPeopleResultsType = AllPeopleType

