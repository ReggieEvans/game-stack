'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { CircleArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Game as GameType } from '@/types/game'
import GameActions from '@/components/game/GameActions'
import GameSummary from '@/components/game/GameSummary'
import GameHeader from '@/components/game/GameHeader'
// import AddHours from '@/components/AddHours'

export default function GameDetailsPage() {
  const [game, setGame] = useState<GameType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hourOptions, setHourOptions] = useState([])
  const [showAddHours, setShowAddHours] = useState(false)
  const [isLoadingHourOptions, setIsLoadingHourOptions] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [submittingState, setSubmittingState] = useState({
    _isInProgress: false,
    _isCompleted: false,
    _isQuit: false,
    _hours: false,
    _delete: false,
  })

  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()

  const fetchGame = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/games/${params.id}`)
      const data = await res.json()
      setGame(data)
    } catch (e) {
      toast({
        title: 'Something went wrong! 👎',
        description: e instanceof Error ? e.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [params.id, toast])

  useEffect(() => {
    fetchGame()
  }, [fetchGame])

  if (isLoading) {
    return <GameSkeleton />
  }

  if (!game) {
    return <div className="p-4 text-red-500">Game not found</div>
  }

  return (
    <div>
      <Link href="/my-library" className="flex items-center pb-3 text-sm">
        <CircleArrowLeft className="mr-2 text-muted-foreground" size={16} /> Back to Library
      </Link>

      <GameHeader game={game} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="hidden md:flex mt-8 border border-border rounded bg-card p-4">
          <GameActions game={game} isHiddenOnMobile={true} />
        </div>
        <GameSummary game={game} summary={game.summary} screenshots={game.screenshots} />
      </div>

      {/* {showAddHours && (
        <AddHours
          setShowAddHours={setShowAddHours}
          isLoadingHourOptions={isLoadingHourOptions}
          hourOptions={hourOptions}
          handleAddCompletionHours={async (gameId, hoursObj) => {
            setSubmittingState(s => ({ ...s, _hours: true }))
            try {
              const res = await fetch(`/api/hours`, {
                method: 'PATCH',
                body: JSON.stringify({ gameId, hoursObj }),
              })
              const data = await res.json()
              setGame(data[0])
              toast.success('Hours added')
            } catch (err) {
              toast.error('Failed to update hours')
            } finally {
              setSubmittingState(s => ({ ...s, _hours: false }))
              setShowAddHours(false)
            }
          }}
          gameId={game._id}
          submittingHours={submittingState._hours}
        />
      )} */}
    </div>
  )
}

function GameSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-6 w-40 bg-skeleton" />
      <Skeleton className="h-[250px] w-full bg-skeleton" />
      <Skeleton className="h-5 w-full bg-skeleton" />
      <Skeleton className="h-[250px] w-full bg-skeleton" />
      <Skeleton className="h-[250px] w-full bg-skeleton" />
    </div>
  )
}
