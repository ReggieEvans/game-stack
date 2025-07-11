'use client'

import { useEffect, useState, useMemo, useReducer } from 'react'
import Link from 'next/link'
import { CircleX, Plus, SortDesc } from 'lucide-react'

import { Game as GameType } from '@/types/game'
import { useUser } from '@/context/UserContext'
import Game from '@/components/Game'
import { Skeleton } from '@/components/ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import { initialState, libraryReducer, HoursState } from '@/hooks/use-library-reducer'
import ProgressCard from '@/components/library/ProgressCard'
import FilterButton from '@/components/library/FilterButton'
import { PopoverClose } from '@radix-ui/react-popover'

const filterLabels: Record<string, string> = {
  all: 'ALL',
  _isInProgress: 'IN PROGRESS',
  _isCompleted: 'COMPLETED',
  _isQuit: 'QUIT',
  _isPileOfShame: 'PILE OF SHAME',
}

function sortLibrary(games: GameType[], sortType: string): GameType[] {
  switch (sortType) {
    case 'alphabetical':
      return [...games].sort((a, b) => a.name.localeCompare(b.name))
    case 'rating':
      return [...games].sort((a, b) => b.total_rating - a.total_rating)
    case 'hours':
      return [...games].sort((a, b) => {
        const aHours = a._gameplayHours?.gameplayMain || 0
        const bHours = b._gameplayHours?.gameplayMain || 0
        return bHours - aHours
      })
    case 'release':
      return [...games].sort((a, b) => b.first_release_date - a.first_release_date)
    default:
      return games
  }
}

export default function MyLibraryPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(libraryReducer, initialState)
  const [hasMounted, setHasMounted] = useState(false)
  const user = useUser()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/library/${user?.id}`)
        if (!response.ok) throw new Error('Failed to fetch games')
        const data: GameType[] = await response.json()

        const completed = data.filter(game => game._isCompleted)
        const totalHours = data.reduce((acc, game) => acc + (game._gameplayHours?.gameplayMain || 0), 0)
        const hoursCompleted = completed.reduce((acc, game) => acc + (game._gameplayHours?.gameplayMain || 0), 0)
        const hoursState: HoursState = {
          totalHours,
          hoursCompleted,
          hoursRemaining: totalHours - hoursCompleted,
        }

        dispatch({ type: 'SET_SOURCE', payload: data })
        dispatch({ type: 'SET_COMPLETIONS', payload: completed.length })
        dispatch({ type: 'SET_HOURS', payload: hoursState })
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchGames()
    }
  }, [user])

  const filteredLibrary = useMemo(() => {
    if (state.filterType === 'all') return state.sourceOfTruth
    return state.sourceOfTruth.filter((game: GameType) => game[state.filterType as keyof GameType])
  }, [state.filterType, state.sourceOfTruth])

  const sortedLibrary = useMemo(() => {
    return sortLibrary(filteredLibrary, state.sortType)
  }, [filteredLibrary, state.sortType])

  return (
    <section className="w-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="head_text text-left sm:mb-2">
          <span className="dark:slate_gradient dark_gradient header_text">MY LIBRARY</span>
        </h1>
        <Link href="/add-games">
          <button type="button" aria-label="Add a game" className="flex gap-2 btn-primary-round font-bold">
            <Plus size="20" className="mb-[2px]" /> <span className="hidden sm:block">Add Game</span>
          </button>
        </Link>
      </div>

      {/* Progress Bars */}
      <div className="rounded-md text-white flex flex-col md:flex-row gap-4 w-full mb-4">
        {hasMounted ? (
          <>
            <ProgressCard
              title="COMPLETE"
              value={state.completions}
              total={state.sourceOfTruth.length}
              unit="%"
              isLoading={isLoading}
              hasData={!isLoading && state.sourceOfTruth.length > 0}
            />

            <ProgressCard
              title="HRS COMPLETED"
              value={state.hours?.hoursCompleted || 0}
              total={state.hours?.totalHours || 1}
              isLoading={isLoading}
              hasData={!isLoading && !!state.hours}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col bg-card rounded-md w-1/2 h-[96px] animate-pulse" />
            <div className="flex flex-col bg-card rounded-md w-1/2 h-[96px] animate-pulse" />
          </>
        )}
      </div>

      {/* Filters & Sort */}
      <div className="flex w-full text-xs items-start">
        <div className="flex flex-wrap items-center">
          {Object.entries(filterLabels).map(([key, label]) => (
            <FilterButton
              key={key}
              label={label}
              filterKey={key}
              active={state.filterType === key}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: key })}
            />
          ))}
        </div>
        <div className="relative ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <SortDesc />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="leading-none font-bold">Sort by:</h4>
                  <PopoverClose>
                    <CircleX size={20} className="mb-1" />
                  </PopoverClose>
                </div>
                <div className="grid gap-2">
                  {['alphabetical', 'rating', 'hours', 'release'].map(sortType => (
                    <div
                      key={sortType}
                      className="dropdown_link flex items-center hover:text-primary cursor-pointer"
                      onClick={() => dispatch({ type: 'SET_SORT', payload: sortType })}
                    >
                      {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
        ) : sortedLibrary.length === 0 ? (
          <p className="text-4xl font-black text-muted-foreground mx-auto py-24 opacity-30 uppercase">No games found</p>
        ) : (
          sortedLibrary.map((game, i) => (
            <Link href={`/my-library/${game._id}`} key={game._id}>
              <Game index={i} game={game} />
            </Link>
          ))
        )}
      </div>
    </section>
  )
}
