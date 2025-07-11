/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'
import { Types } from 'mongoose'

// @route   GET /api/games/:id
export const GET = async (_req: Request, context: any) => {
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

// @desc    Update User Game
// @route   PATCH /api/games/:id
export const PATCH = async (req: Request, context: any) => {
  const { userId, status } = await req.json()
  const params = await context.params

  try {
    await connectToDB()
    const game = await Game.findOne({ user: userId, _id: params.id })
    const currentStatus = game[status]

    await Game.findByIdAndUpdate(game._id, {
      [status]: !currentStatus,
    })
    const updatedGame = await Game.findById({ _id: game._id })

    return new Response(JSON.stringify(updatedGame), { status: 200 })
  } catch {
    return new Response('Something went wrong. Failed to fetch library.', {
      status: 500,
    })
  }
}

// @desc    Delete User Game
// @route   DELETE /api/games/:id
export const DELETE = async (_req: Request, context: any) => {
  const params = await context.params

  try {
    await connectToDB()
    await Game.findByIdAndDelete(params.id)

    return new Response('Game deleted successfully!', { status: 200 })
  } catch {
    return new Response('Something went wrong. Failed to delete from library.', {
      status: 500,
    })
  }
}
