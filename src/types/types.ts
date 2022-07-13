export type PlayersType = Array<Array<Array<CurrentCardType>>>
export type AllCardsType = PlayersType

export type AllPeopleType = Array<{
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
}>

export type CurrentCardType = {
   Points: number, Name: string
}
export type PeopleWithStrengthType = AllPeopleType
export type RequestPeopleResultsType = AllPeopleType

