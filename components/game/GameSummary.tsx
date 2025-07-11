import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Game as GameType } from '@/types/game'
import { CircleEllipsis } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import GameActions from './GameActions'
import { getCompletionHours, getRatingStyle, getRatingText } from '@/lib/utils'
import ScreenshotModal from './ScreenshotModal'

export default function GameSummary({
  game,
  summary,
  screenshots,
  handleStatus,
  handleDelete,
  submittingState,
}: {
  game: GameType
  summary: string
  screenshots: { url: string }[]
  handleStatus: (status: string, id: string) => void
  handleDelete: (id: string) => void
  submittingState: {
    _isInProgress: boolean
    _isCompleted: boolean
    _isQuit: boolean
    _hours: boolean
    _delete: boolean
  }
}) {
  const companies = game?.involved_companies?.map(c => c.company.name).join(', ')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-4 mt-2 md:mt-8">
      {/* Game Title Mobile  */}
      <div className="flex justify-between gap-4 items-start md:hidden mt-8 border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <div className="text-4xl font-black text-white mb-1">{game.name}</div>
          <div className="text-sm text-white">{companies}</div>
          <div className="text-sm text-white">Hours to complete: {getCompletionHours(game)}</div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CircleEllipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50">
            <GameActions
              game={game}
              handleStatus={handleStatus}
              handleDelete={handleDelete}
              isHiddenOnMobile={false}
              submittingState={submittingState}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Game Rating Mobile  */}
      <div className="flex items-center gap-4 sm:hidden py-4 px-6 bg-card border border-border rounded">
        <div
          className={`flex items-center justify-center text-3xl font-bold bg-white w-[50px] h-[50px] p-8 rounded-full border-[6px] ${getRatingStyle(
            game.total_rating,
          )}`}
        >
          {(game.total_rating / 10).toFixed(1)}
        </div>
        <div className="text-3xl font-black text-foreground uppercase">{getRatingText(game.total_rating)}</div>
      </div>

      <div>
        <div className="slate_gradient font-black text-2xl md:text-4xl mb-2">Summary</div>
        <p className="mb-6">{summary}</p>
      </div>

      <div>
        {screenshots?.length > 0 && (
          <>
            <div className="slate_gradient font-black text-2xl md:text-4xl mb-2">Screenshots</div>
            <div className="flex gap-2 flex-wrap">
              {screenshots.map((s, i) => (
                <Image
                  key={i}
                  src={`https:${s.url.replace('t_thumb', 't_screenshot_med')}`}
                  alt={`Screenshot ${i + 1}`}
                  width={160}
                  height={90}
                  className="rounded cursor-pointer hover:brightness-110"
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </>
        )}

        {selectedIndex !== null && (
          <ScreenshotModal
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            screenshots={screenshots}
          />
        )}
      </div>
    </div>
  )
}
