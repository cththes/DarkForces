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
export type PlayersType = {
   [key: string]: PlayerTurn
}

type PlayerTurn = {
   turns: TurnType
   strength: number
}

type PlayerTurnCards = {
   cards: Array<string>
   strength: number
   bust?: number
}

type TurnType = {
   [key: string]: PlayerTurnCards
}

export type CardNamesType = {
   [key: string]: string
}

export type CardWithStrength = AllPeopleType & {
   strength: number
}

export type CardType = {
   [key: string]: CardWithStrength;
}

export type CurrentTurnType = {
   turn: string,
   player: string,
}



export type CurrentCardType = {
   Strength: number, name: string
}
export type PeopleWithStrengthType = AllPeopleType
export type RequestPeopleResultsType = AllPeopleType

