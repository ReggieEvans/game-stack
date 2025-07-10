'use client'

import Game from '@/components/Game'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/context/UserContext'
import { useToast } from '@/hooks/use-toast'
import { Game as GameType } from '@/types/game'
import { CircleArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const AddGames = () => {
  const user = useUser()
  const { toast } = useToast()
  const [games, setGames] = useState<GameType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [submitting, setIsSubmitting] = useState<{
    isSubmitting: boolean
    index: number | null
  }>({
    isSubmitting: false,
    index: null,
  })

  const fetchGames = async (text = '') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/igdb', {
        method: 'POST',
        body: JSON.stringify({
          searchText: text,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch games')
      }

      const res = await response.json()
      setGames(res.data.games || [])
    } catch (error) {
      toast({
        title: 'Something went wrong! 👎',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()

    // Cleanup searchTimeout when component unmounts
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    setSearchText(e.target.value)

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        fetchGames(e.target.value)
      }, 500),
    )
  }

  const handleAddGame: {
    (game: GameType, i: number): Promise<void>
  } = async (game, i) => {
    setIsSubmitting((prevState: { isSubmitting: boolean; index: number | null }) => ({
      ...prevState,
      isSubmitting: true,
      index: i,
    }))

    try {
      const response = await fetch('/api/games/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: user?.id,
          game,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Server returned an error status (e.g. 409)
        toast({
          title: 'Could not add game 😕',
          description: data.message ?? 'Something went wrong.',
          variant: 'destructive',
        })
      } else {
        // Success
        toast({
          title: 'Game Added! 👍',
          description: data.message ?? 'Game added successfully to your library.',
          variant: 'default',
        })
      }
    } catch (error) {
      toast({
        title: 'Something went wrong! 👎',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting((prevState: { isSubmitting: boolean; index: number | null }) => ({
        ...prevState,
        isSubmitting: false,
        index: null,
      }))
    }
  }

  // Early return if user is not loaded or invalid
  if (!user?.id) {
    return <div>Loading...</div>
  }

  return (
    <section className="w-full">
      <Link href={'/my-library'} className="flex items-center text-sm text-muted-foreground mb-2">
        <CircleArrowLeft size={16} className="mr-2" /> Back to Library
      </Link>
      <h1 className="head_text text-left mb-4">
        <span className="slate_gradient header_text">ADD GAMES</span>
      </h1>
      <div className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a video game"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full bg-white/10 border border-neutral-800 rounded-md px-4 py-2 text-sm text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
        />
      </div>

      {/* Game List */}
      <div className="flex gap-x-8 flex-wrap justify-start py-4">
        {isLoading ? (
          Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="flex flex-col mb-4 space-y-3">
              <Skeleton className="h-[200px] w-[150px] rounded-md bg-skeleton" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px] bg-skeleton" />
                <Skeleton className="h-4 w-[100px] bg-skeleton" />
              </div>
            </div>
          ))
        ) : games.length === 0 ? (
          <p className="text-4xl font-black text-muted-foreground mx-auto py-24 opacity-30 uppercase">No games found</p>
        ) : (
          games.map((game, i) => (
            <button key={game.id} onClick={() => handleAddGame(game, i)} className="group">
              <Game
                index={i}
                game={game}
                handleAddGame={() => null}
                submitting={submitting}
                showOverlayOnHover={true}
              />
            </button>
          ))
        )}
      </div>
    </section>
  )
}

export default AddGames
