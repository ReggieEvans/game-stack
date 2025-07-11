import { connectToDB } from '@/lib/mongodb'
import Game from '@/models/Game'

// @desc    Update Game with Completion Hours
// @route   PATCH /api/hours
export const PATCH = async (req: Request) => {
  const { gameId, hours } = await req.json()

  try {
    await connectToDB()

    const completionHours = {
      gameplayMain: hours,
      gameplayMainExtra: hours,
      gameplayCompletionist: hours,
    }

    await Game.findByIdAndUpdate(gameId, {
      _gameplayHours: completionHours,
    })

    const updatedGame = await Game.find({ _id: gameId })

    return new Response(JSON.stringify(updatedGame), { status: 200 })
  } catch {
    return new Response('Something went wrong. Failed to add completion hours.', {
      status: 500,
    })
  }
}
