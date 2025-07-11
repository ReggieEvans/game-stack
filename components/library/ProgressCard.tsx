import { Skeleton } from '@/components/ui/skeleton'

interface ProgressCardProps {
  title: string
  value: number
  total: number
  unit?: string
  isLoading?: boolean
  hasData?: boolean
}

export default function ProgressCard({
  title,
  value,
  total,
  unit = '',
  isLoading = false,
  hasData = true,
}: ProgressCardProps) {
  const percentage = total === 0 ? 0 : (value / total) * 100

  if (isLoading) {
    return (
      <div className="flex flex-col bg-card py-2 px-4 mb-1 border border-border rounded-md w-full md:w-1/2">
        <div className="flex justify-between pt-4 items-center">
          <Skeleton className="h-8 w-32 bg-skeleton" />
          <Skeleton className="h-6 w-16 bg-skeleton" />
        </div>
        <Skeleton className="h-3 w-full mt-2 rounded-full" />
      </div>
    )
  }

  if (!hasData) {
    return (
      <div className="flex flex-col bg-card py-2 px-4 mb-1 border border-border rounded-md w-full md:w-1/2 text-white justify-center items-center h-[96px]">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-card py-2 px-4 mb-1 border border-border rounded-md w-full md:w-1/2 text-white">
      <div className="flex flex-col sm:flex-row justify-between pt-4 sm:items-center">
        <div className="text-3xl font-bold slate_gradient">
          {unit ? Math.round(percentage) : value}
          {unit && <span className="text-lg"> {unit}</span>} <span className="text-lg">{title}</span>
        </div>
        <div className="font-bold slate_gradient">
          {value} <span className="text-sm">OF </span>
          {total}
        </div>
      </div>
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden mt-2">
        <div
          className="relative h-full bg-gradient-to-r from-purple-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute top-0 right-0 h-full w-[6px] rounded-full bg-white animate-pulse-glow shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  )
}
