import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'
import { NextRequest } from 'next/server'

type GameInput = {
  id: number
  name: string
  first_release_date: number
  [key: string]: unknown
}

type RequestBody = {
  userId: string
  game: GameInput
}

const POSITIVE_DATE = 1577836800 // 1/1/2020

// @desc    Add Games to Library
// @route   POST /api/games/new
export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const { userId, game }: RequestBody = await request.json()

    await connectToDB()

    const gameAlreadyInLibrary = await Game.findOne({
      id: game.id,
      _userId: userId,
    })

    if (gameAlreadyInLibrary) {
      return new Response(
        JSON.stringify({ message: `"${game.name}" is already in your library!` }),
        { status: 409 }, // Conflict
      )
    }

    const newGame = new Game({
      user: userId,
      _userId: userId,
      ...game,
      _isPileOfShame: game.first_release_date < POSITIVE_DATE,
    })

    await newGame.save()

    return new Response(
      JSON.stringify({ game: newGame, message: 'Game added to library!' }),
      { status: 201 }, // Created
    )
  } catch (error) {
    console.error('Failed to add game:', error)
    return new Response(JSON.stringify({ message: 'Something went wrong. Failed to add game to library.' }), {
      status: 500,
    })
  }
}
