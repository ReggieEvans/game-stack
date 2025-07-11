/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'

// @route   GET /api/library/:id
export async function GET(req: Request, context: any) {
  const params = await context.params

  try {
    await connectToDB()
    const games = await Game.find({ user: params.id })
    return new Response(JSON.stringify(games), { status: 200 })
  } catch {
    return new Response('Something went wrong. Failed to fetch library.', { status: 500 })
  }
}
