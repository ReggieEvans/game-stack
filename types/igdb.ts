export type IGDBGame = {
  name: string
  total_rating?: number
  total_rating_count?: number
  cover?: { url: string }
  screenshots?: { url: string }[]
  first_release_date?: number
  involved_companies?: { company: { name: string } }[]
  summary?: string
}

export type IGDBTokenResponse = {
  access_token: string
  expires_in: number
  token_type: string
}

export type IGDBRequestBody = {
  searchText?: string
}

export type IGDBResponse = {
  games: IGDBGame[]
}
