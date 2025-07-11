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
import { useUser } from '@/context/UserContext'

export default function GameDetailsPage() {
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const user = useUser()

  const [state, setState] = useState({
    game: null as GameType | null,
    isLoading: true,
    submittingState: {
      _isInProgress: false,
      _isCompleted: false,
      _isQuit: false,
      _hours: false,
      _delete: false,
    },
    hourOptions: [],
    isLoadingHourOptions: false,
    showAddHours: false,
    toggleDropdown: false,
  })

  const fetchGame = useCallback(async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))
    try {
      const res = await fetch(`/api/games/${params.id}`)
      const data = await res.json()
      setState(prevState => ({ ...prevState, game: data, isLoading: false }))
    } catch (e) {
      showErrorToast(e)
    }
  }, [params.id])

  const handleStatus = async (status: string, gameId: string) => {
    setState(prevState => ({
      ...prevState,
      submittingState: { ...prevState.submittingState, [status]: true },
    }))
    try {
      const response = await fetch(`/api/games/${gameId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          userId: user?.id,
          status,
        }),
      })
      const data = await response.json()
      setState(prevState => ({ ...prevState, game: data }))
      showSuccessToast(`Game status changed to ${status}`)
    } catch (e) {
      showErrorToast(e)
    } finally {
      setState(prevState => ({
        ...prevState,
        submittingState: { ...prevState.submittingState, [status]: false },
        toggleDropdown: false,
      }))
    }
  }

  const handleDelete = async (gameId: string) => {
    setState(prevState => ({
      ...prevState,
      submittingState: { ...prevState.submittingState, _delete: true },
    }))
    try {
      await fetch(`/api/games/${gameId}`, { method: 'DELETE' })
      router.push('/my-library')
      showSuccessToast('Game has been deleted!')
    } catch (e) {
      showErrorToast(e)
    } finally {
      setState(prevState => ({
        ...prevState,
        submittingState: { ...prevState.submittingState, _delete: false },
      }))
    }
  }

  const showErrorToast = (error: unknown) => {
    toast({
      title: 'Something went wrong! 👎',
      description: error instanceof Error ? error.message : 'An unknown error occurred',
      variant: 'destructive',
    })
  }

  const showSuccessToast = (message: string) => {
    toast({
      title: message,
      description: '',
      variant: 'default',
    })
  }

  useEffect(() => {
    fetchGame()
  }, [fetchGame])

  if (state.isLoading) {
    return <GameSkeleton />
  }

  if (!state.game) {
    return <div className="p-4 text-red-500">Game not found</div>
  }

  return (
    <div>
      <Link href="/my-library" className="flex items-center pb-3 text-sm">
        <CircleArrowLeft className="mr-2 text-muted-foreground" size={16} /> Back to Library
      </Link>

      <GameHeader game={state.game} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="hidden md:flex mt-8 border border-border rounded bg-card p-4">
          <GameActions
            game={state.game}
            handleStatus={handleStatus}
            handleDelete={handleDelete}
            isHiddenOnMobile={true}
            submittingState={state.submittingState}
          />
        </div>
        <GameSummary
          game={state.game}
          summary={state.game.summary}
          screenshots={state.game.screenshots}
          handleStatus={handleStatus}
          handleDelete={handleDelete}
          submittingState={state.submittingState}
        />
      </div>
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
