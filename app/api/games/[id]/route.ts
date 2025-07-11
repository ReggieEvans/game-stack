import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'
import { Types } from 'mongoose'

interface Params {
  id: string
}

// @route   GET /api/games/:id
export const GET = async (_req: Request, context: { params: Params }) => {
  const params = await context.params

  try {
    await connectToDB()

    // Validate ID format before querying
    if (!Types.ObjectId.isValid(params.id)) {
      return new Response('Invalid game ID format', { status: 400 })
    }

    const game = await Game.findById(params.id)

    if (!game) {
      return new Response('Game not found', { status: 404 })
    }

    return new Response(JSON.stringify(game), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('GET /api/games/:id error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
