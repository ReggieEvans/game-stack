import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'

interface Params {
  id: string
}

// @route   GET /api/games/:id/all
export async function GET(req: Request, context: { params: Params }) {
  const params = await context.params

  try {
    await connectToDB()
    const games = await Game.find({ user: params.id })
    return new Response(JSON.stringify(games), { status: 200 })
  } catch {
    return new Response('Something went wrong. Failed to fetch library.', { status: 500 })
  }
}
