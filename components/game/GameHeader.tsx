import { getCompletionHours, getRatingStyle } from '@/lib/utils'
import { Game as GameType } from '@/types/game'
import Image from 'next/image'

export default function GameHeader({ game }: { game: GameType }) {
  const screenshot = game?.screenshots?.[0]?.url.replace('t_thumb', 't_screenshot_big')
  const cover = game?.cover?.url.replace('t_thumb', 't_cover_big')
  const companies = game?.involved_companies?.map(c => c.company.name).join(', ')

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 w-full h-[250px] -z-10 overflow-hidden rounded">
        {screenshot && (
          <Image
            src={`https:${screenshot}`}
            alt="Background screenshot"
            fill
            className="object-cover blur-xs brightness-50"
            priority
          />
        )}
      </div>

      <div className="flex items-end h-[250px] justify-between relative z-10">
        <div className="flex min-h-[250px] min-w-[175px] -mb-4 ml-4 items-end">
          {cover && (
            <Image
              className="rounded-md"
              src={`https:${cover}`}
              width={175}
              height={233}
              alt="Video game cover"
              priority
            />
          )}
          <div className="hidden md:block mb-8 px-6">
            <div className="text-5xl font-black text-white mb-1">{game.name}</div>
            <div className="text-sm text-white">{companies}</div>
            <div className="text-sm text-white">Hours to complete: {getCompletionHours(game)}</div>
          </div>
        </div>

        <div
          className={`hidden sm:flex items-center justify-center text-3xl font-bold bg-white w-[50px] h-[50px] p-8 rounded-full border-[6px] -mb-4 mr-4 ${getRatingStyle(
            game.total_rating,
          )}`}
        >
          {(game.total_rating / 10).toFixed(1)}
        </div>
      </div>
    </div>
  )
}
