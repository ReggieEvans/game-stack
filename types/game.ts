export type Game = {
  _id: string
  user: string
  id: number
  name: string
  summary: string
  cover: Cover
  total_rating: number
  total_rating_count: number
  first_release_date: number
  involved_companies: InvolvedCompanies[]
  screenshots: Screenshots[]
  _userId: string
  _isInProgress: boolean
  _isQuit: boolean
  _isPileOfShame: boolean
  _isCompleted: boolean
  _gameplayHours: GameplayHours
  createdAt: string
  updatedAt: string
}

export type Cover = {
  url: string
}

export type Screenshots = {
  id: string
  url: string
  _id: string
}

export type InvolvedCompanies = {
  id: number
  company: object
  _id: string
}

export type GameplayHours = {
  gameplayMain: number
}
