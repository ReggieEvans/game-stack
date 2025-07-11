import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

const filterMetadata: Record<string, { label: string; colorClass: string; tooltip: string }> = {
  all: {
    label: 'ALL',
    colorClass: '',
    tooltip: 'All games in your library',
  },
  _isInProgress: {
    label: 'IN PROGRESS',
    colorClass: 'bg-sky-400',
    tooltip: 'Games you are currently playing',
  },
  _isCompleted: {
    label: 'COMPLETED',
    colorClass: 'bg-amber-400',
    tooltip: 'Games you have completed',
  },
  _isQuit: {
    label: 'QUIT',
    colorClass: 'bg-rose-600',
    tooltip: 'Games you gave up on',
  },
  _isPileOfShame: {
    label: 'PILE OF SHAME',
    colorClass: 'bg-orange-600',
    tooltip: "Games that are more than 5 years old that you haven't completed",
  },
}

interface FilterButtonProps {
  label: string
  filterKey: string
  active: boolean
  onClick: () => void
}

export default function FilterButton({ label, filterKey, active, onClick }: FilterButtonProps) {
  const { colorClass, tooltip } = filterMetadata[filterKey]

  return (
    <button
      type="button"
      aria-label={`Filter by ${filterKey}`}
      onClick={onClick}
      className={`flex gap-2 items-center hover:brightness-110 text-foreground px-2 py-1 rounded-full min-w-[75px] font-medium mr-4 mb-2 ${
        active
          ? 'bg-primary text-white'
          : 'bg-white border border-primary dark:bg-transparent opacity-50 hover:opacity-100'
      }`}
    >
      <div className={`h-[10px] w-[10px] rounded-full mb-[2px] ${colorClass}`} />
      {label}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Info size={14} className="text-primary hover:text-white transition-colors" />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-card">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </button>
  )
}
