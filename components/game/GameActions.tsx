import { Game as GameType } from '@/types/game'
import { CheckSquare, Clock, PlayCircle, Skull, Trash2 } from 'lucide-react'

export default function GameActions({ game, isHiddenOnMobile }: { game: GameType; isHiddenOnMobile: boolean }) {
  return (
    <div className={`${isHiddenOnMobile ? 'hidden md:flex' : 'flex'} flex flex-col gap-2 min-w-[200px] bg-card`}>
      <button className="game_action_btn">
        <div className="flex gap-2 items-center">
          <Clock size={16} /> Add Hours
        </div>
      </button>
      <button className="game_action_btn">
        <div className="flex gap-2 items-center">
          <PlayCircle size={16} /> {game._isInProgress ? 'Stop Playing' : 'Start Playing!'}
        </div>
      </button>
      <button className="game_action_btn">
        <div className="flex gap-2 items-center">
          <CheckSquare size={16} /> {game._isCompleted ? 'Not Beaten' : 'I Beat It!'}
        </div>
      </button>
      <button className="game_action_btn">
        <div className="flex gap-2 items-center">
          <Skull size={16} /> {game._isQuit ? 'UnQuit Game' : 'I Quit!'}
        </div>
      </button>
      <button className="bg-gradient-to-br from-destructive to-red-700 py-2 px-4 rounded hover:brightness-90 transition-all duration-300">
        <div className="flex gap-2 items-center">
          <Trash2 size={16} /> Delete Game
        </div>
      </button>
    </div>
  )
}
