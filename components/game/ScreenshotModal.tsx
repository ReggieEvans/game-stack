import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import Image from 'next/image'

export default function ScreenshotModal({
  selectedIndex,
  setSelectedIndex,
  screenshots,
}: {
  selectedIndex: number | null
  setSelectedIndex: (index: number | null) => void
  screenshots: { url: string }[]
}) {
  if (selectedIndex === null) return null

  const close = () => setSelectedIndex(null)
  const next = () => setSelectedIndex((selectedIndex + 1) % screenshots.length)
  const prev = () => setSelectedIndex((selectedIndex - 1 + screenshots.length) % screenshots.length)

  return (
    <Dialog open onOpenChange={close}>
      <DialogTitle className="sr-only">Screenshot {selectedIndex + 1}</DialogTitle>
      <DialogContent
        className="bg-transparent border-none shadow-none p-0 max-w-5xl animate-scale-fade-in"
        aria-labelledby="Screenshot Modal"
        aria-describedby="Game Screenshot Modal"
      >
        <div className="relative flex items-center justify-center">
          <button onClick={prev} className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full">
            <ArrowBigLeft />
          </button>

          <Image
            src={`https:${screenshots[selectedIndex].url.replace('t_thumb', 't_screenshot_big')}`}
            alt={`Screenshot ${selectedIndex + 1}`}
            width={960}
            height={540}
            className="rounded shadow-lg max-w-full max-h-[80vh]"
          />

          <button onClick={next} className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full">
            <ArrowBigRight />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
