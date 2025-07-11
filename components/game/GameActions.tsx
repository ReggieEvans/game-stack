'use client'

import { Game as GameType } from '@/types/game'
import { CheckSquare, Clock, Loader, PlayCircle, Skull, Trash2 } from 'lucide-react'

export default function GameActions({
  game,
  handleStatus,
  handleDelete,
  isHiddenOnMobile,
  submittingState,
}: {
  game: GameType
  handleStatus: (status: string, id: string) => void
  handleDelete: (id: string) => void
  isHiddenOnMobile: boolean
  submittingState: {
    _isInProgress: boolean
    _isCompleted: boolean
    _isQuit: boolean
    _hours: boolean
    _delete: boolean
  }
}) {
  // Reusable button for each action
  const ActionButton = ({
    label,
    icon: Icon,
    statusKey,
    onClick,
    isSubmitting,
  }: {
    label: string
    icon: React.ComponentType
    statusKey: string
    onClick: () => void
    isSubmitting: boolean
  }) => (
    <button className="game_action_btn" onClick={onClick} disabled={isSubmitting}>
      <div className="flex gap-2 items-center">
        {isSubmitting ? (
          <span className="animate-spin">
            <Loader size={16} />
          </span>
        ) : (
          // @ts-ignore
          <Icon size={16} />
        )}{' '}
        {isSubmitting ? 'Processing...' : label}
      </div>
    </button>
  )

  return (
    <div className={`${isHiddenOnMobile ? 'hidden md:flex' : 'flex'} flex flex-col gap-2 min-w-[160px] bg-card`}>
      {/* Add Hours Button */}
      <ActionButton
        label="Add Hours"
        icon={Clock}
        statusKey="_hours"
        onClick={() => handleStatus('_hours', game._id)}
        isSubmitting={submittingState['_hours']}
      />

      {/* Start Playing Button */}
      <ActionButton
        label={game._isInProgress ? 'Stop Playing' : 'Start Playing!'}
        icon={PlayCircle}
        statusKey="_isInProgress"
        onClick={() => handleStatus('_isInProgress', game._id)}
        isSubmitting={submittingState['_isInProgress']}
      />

      {/* I Beat It Button */}
      <ActionButton
        label={game._isCompleted ? 'Not Beaten' : 'I Beat It!'}
        icon={CheckSquare}
        statusKey="_isCompleted"
        onClick={() => handleStatus('_isCompleted', game._id)}
        isSubmitting={submittingState['_isCompleted']}
      />

      {/* I Quit Button */}
      <ActionButton
        label={game._isQuit ? 'Try Again' : 'I Quit!'}
        icon={Skull}
        statusKey="_isQuit"
        onClick={() => handleStatus('_isQuit', game._id)}
        isSubmitting={submittingState['_isQuit']}
      />

      {/* Delete Button */}
      <button
        className="bg-gradient-to-br from-destructive to-red-700 py-2 px-4 rounded hover:brightness-90 transition-all duration-300"
        onClick={() => handleDelete(game._id)}
        disabled={submittingState['_delete']}
      >
        <div className="flex gap-2 items-center">
          {submittingState['_delete'] ? (
            <span className="animate-spin">
              <Loader size={16} />
            </span>
          ) : (
            <Trash2 size={16} />
          )}{' '}
          {submittingState['_delete'] ? 'Deleting...' : 'Delete Game'}
        </div>
      </button>
    </div>
  )
}
