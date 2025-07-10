import Image from 'next/image'
import { Game as GameType } from '@/types/game'
import { Award, Hourglass } from 'lucide-react'

interface GameProps {
  game: GameType
  index: number
  submitting?: { isSubmitting: boolean; index: number | null }
  handleAddGame: (game: GameType, index: number) => void
  showOverlayOnHover?: boolean
  // add other props as needed
}

const Game: React.FC<GameProps> = ({ game, index, handleAddGame, submitting, showOverlayOnHover = false }) => {
  const cover = game.cover?.url.replace('t_thumb', 't_cover_big')

  const getRatingStyle = (rating: number): string => {
    switch (true) {
      case rating >= 95:
        return 'bg-purple-600'
      case rating >= 80:
        return 'bg-green-600'
      case rating >= 70:
        return 'bg-yellow-600'
      default:
        return 'bg-red-600'
    }
  }

  return (
    <div className="flex flex-col w-[130px] text-sm py-1 hover:scale-105 transition-all duration-300">
      <div className={`relative w-[130px] h-[173px] rounded-md ${showOverlayOnHover ? 'group' : ''}`}>
        <Image
          src={cover ? `https:${cover}` : '/assets/images/cover-not-found.png'}
          width={130}
          height={173}
          alt="Video Game Cover"
          className=" rounded-lg"
          priority={index < 11}
        />
        {/* Conditionally render overlay */}
        {showOverlayOnHover && (
          <button
            className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-md"
            onClick={() => handleAddGame(game, index)}
            disabled={submitting?.isSubmitting && submitting.index === index}
          >
            {submitting?.isSubmitting && submitting.index === index ? (
              <span className="text-8xl text-white animate-spin">
                <Hourglass />
              </span>
            ) : (
              <span className="text-8xl text-white">+</span>
            )}
          </button>
        )}

        <div className="absolute top-0 right-0 -mr-4 flex flex-col items-center">
          <div
            className={`flex justify-center items-center h-[28px] w-[28px] rounded-full mb-2 text-white font-bold text-md ${getRatingStyle(
              game.total_rating,
            )}`}
          >
            {game.total_rating ? (game.total_rating / 10).toFixed(1) : '--'}
          </div>
          {game._isCompleted && (
            <div className="mb-4 text-4xl text-completed-status">
              <Award size="40px" />
            </div>
          )}
          {game._isInProgress && (
            <div className="h-[16px] w-[16px] bg-inprogress-status rounded-full mb-2 shadow-md shadow-black/80"></div>
          )}

          {game._isPileOfShame && (
            <div className="h-[16px] w-[16px] bg-pileofshame-status rounded-full mb-2  shadow-md shadow-black/80"></div>
          )}

          {game._isQuit && (
            <div className="h-[16px] w-[16px] bg-quit-status rounded-full mb-2  shadow-md shadow-black/80"></div>
          )}
        </div>

        <div className="absolute bottom-0 right-0 flex flex-col items-center">
          {game._gameplayHours?.gameplayMain && (
            <div className="bg-primary text-white font-medium rounded-tl-md rounded-br-md p-1">
              {game._gameplayHours.gameplayMain}h
            </div>
          )}
        </div>
      </div>
      <div className="py-1 flex justify-between items-start">
        <div className="flex flex-col">
          <p className="font-medium">{game.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Game
