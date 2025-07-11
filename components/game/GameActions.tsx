'use client'

import React from 'react'
import { Game as GameType } from '@/types/game'
import { CheckSquare, Loader, Skull, Square, Trash2 } from 'lucide-react'

export default function GameActions({
  game,
  handleStatus,
  handleDelete,
  setShowAddHoursModal,
  isHiddenOnMobile,
  submittingState,
}: {
  game: GameType
  handleStatus: (status: string, id: string) => void
  handleDelete: (id: string) => void
  setShowAddHoursModal: (value: boolean) => void
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
    onClick,
    isSubmitting,
    isChecked,
    specialIcon,
  }: {
    label: string
    onClick: () => void
    isSubmitting: boolean
    isChecked: boolean
    specialIcon?: React.ComponentType // Prop to allow passing a unique icon for special cases
  }) => (
    <button className="game_action_btn text-white" onClick={onClick} disabled={isSubmitting}>
      <div className="flex gap-2 items-center">
        {isSubmitting ? (
          <span className="animate-spin">
            <Loader size={16} />
          </span>
        ) : specialIcon ? (
          // @ts-expect-error: specialIcon is a React component
          React.createElement(specialIcon, { size: 16, fill: 'white', stroke: 'red' })
        ) : isChecked ? (
          // Render empty or checked square depending on `isChecked`
          <CheckSquare size={16} className="text-green-400" />
        ) : (
          <Square size={16} />
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
        onClick={() => setShowAddHoursModal(true)}
        isSubmitting={submittingState['_hours']}
        isChecked={game._gameplayHours.gameplayMain > 0}
      />

      {/* Start Playing Button */}
      <ActionButton
        label={game._isInProgress ? 'In Progress!' : 'Start Playing'}
        onClick={() => handleStatus('_isInProgress', game._id)}
        isSubmitting={submittingState['_isInProgress']}
        isChecked={game._isInProgress}
      />

      {/* I Beat It Button */}
      <ActionButton
        label={game._isCompleted ? 'I Beat It!' : 'Complete'}
        onClick={() => handleStatus('_isCompleted', game._id)}
        isSubmitting={submittingState['_isCompleted']}
        isChecked={game._isCompleted}
      />

      {/* I Quit Button */}
      <ActionButton
        label={game._isQuit ? 'Try Again?' : 'Quit'}
        onClick={() => handleStatus('_isQuit', game._id)}
        isSubmitting={submittingState['_isQuit']}
        isChecked={game._isQuit}
        specialIcon={Skull}
      />

      {/* Delete Button */}
      <button
        className="bg-gradient-to-br from-destructive to-red-700 py-2 px-4 rounded hover:brightness-90 transition-all duration-300"
        onClick={() => handleDelete(game._id)}
        disabled={submittingState['_delete']}
      >
        <div className="flex gap-2 items-center text-white">
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
