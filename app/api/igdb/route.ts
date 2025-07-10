import { IGDBGame, IGDBRequestBody } from '@/types/igdb'
import axios from 'axios'

// @desc    Get Games from IDGB
// @route   POST /api/igdb

interface IGDBResponse {
  status: 'success' | 'error'
  message: string
  data: { games: IGDBGame[] } | null
}

export const POST = async (request: Request): Promise<Response> => {
  const { searchText }: IGDBRequestBody = await request.json()

  const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } = process.env as {
    IGDB_CLIENT_ID?: string
    IGDB_CLIENT_SECRET?: string
  }

  // Ensure client ID and secret are available
  if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Missing IGDB Client Credentials',
        data: null,
      } as IGDBResponse),
      { status: 500 },
    )
  }

  let body: string
  // Build the query based on searchText or fallback to a default query
  if (!searchText) {
    body = `fields name,total_rating,total_rating_count,cover.url,screenshots.url,total_rating,total_rating_count,first_release_date,involved_companies.company.name,summary; limit 100; where release_dates.date > 948805691;`
  } else {
    body = `search "${searchText}"; fields name,total_rating,total_rating_count,cover.url,screenshots.url,total_rating,total_rating_count,first_release_date,involved_companies.company.name,summary; limit 100; where release_dates.date > 948805691;`
  }

  const fetchAccessToken = async (): Promise<string> => {
    try {
      const tokenRes = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`,
      )

      if (!tokenRes.data.access_token) {
        throw new Error('Failed to fetch access token from IGDB')
      }

      return tokenRes.data.access_token as string
    } catch (error) {
      throw new Error(`Token request failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const fetchGamesFromIGDB = async (token: string): Promise<IGDBGame[]> => {
    try {
      const igdbRes = await axios.post<IGDBGame[]>('https://api.igdb.com/v4/games', body, {
        headers: {
          Accept: 'application/json',
          'Client-ID': IGDB_CLIENT_ID,
          Authorization: 'Bearer ' + token,
        },
      })

      return igdbRes.data
    } catch (error) {
      throw new Error(`IGDB API request failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleRateLimiting = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
    try {
      return await fn()
    } catch (error: any) {
      if (retries === 0) throw error

      if (error.response?.status === 429) {
        const response = error.response
        const retryAfter = parseInt(response?.headers['retry-after'] || '1000', 10) * 1000
        const delayTime = isNaN(retryAfter) ? 1000 : retryAfter
        console.log(`Rate limited, retrying in ${delayTime / 1000}s...`)

        await new Promise(resolve => setTimeout(resolve, delayTime))

        return handleRateLimiting(fn, retries - 1, delayTime)
      } else {
        throw error
      }
    }
  }

  try {
    const token: string = await handleRateLimiting(fetchAccessToken)
    const rawGames: IGDBGame[] = await handleRateLimiting(() => fetchGamesFromIGDB(token))

    // Filter and sort games by rating
    const gamesWithNoRating: IGDBGame[] = rawGames.filter((g: IGDBGame) => g.total_rating === undefined)
    const gamesWithRating: IGDBGame[] = rawGames.filter((g: IGDBGame) => g.total_rating !== undefined)
    const sortedGames: IGDBGame[] = gamesWithRating.sort((a, b) => {
      const ratingA = a.total_rating ?? 0
      const ratingB = b.total_rating ?? 0
      return ratingB - ratingA
    })

    // Combine the sorted games and those without ratings
    const games: IGDBGame[] = [...sortedGames, ...gamesWithNoRating]

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Games fetched successfully',
        data: { games },
      } as IGDBResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error(error)

    return new Response(
      JSON.stringify({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to retrieve games from IGDB',
        data: null,
      } as IGDBResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
