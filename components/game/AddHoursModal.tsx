import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Loader, PlusCircle } from 'lucide-react'

export default function AddHoursModal({
  setShowAddHours,
  handleSubmitHours,
  showAddHoursModal,
  currentHours,
  searchText,
  submittingState,
}: {
  setShowAddHours: (value: boolean) => void
  handleSubmitHours: (e: React.FormEvent<HTMLFormElement>, hours: number | '') => Promise<void>
  showAddHoursModal: boolean
  currentHours: number | ''
  searchText: string
  submittingState: {
    _isInProgress: boolean
    _isCompleted: boolean
    _isQuit: boolean
    _hours: boolean
    _delete: boolean
  }
}) {
  const [hours, setHours] = useState<number | ''>('')

  return (
    <Dialog open={showAddHoursModal} onOpenChange={() => setShowAddHours(false)}>
      <DialogContent className="w-full max-w-[800px] bg-card rounded shadow-lg p-8">
        <DialogHeader>
          <DialogTitle className="dark:slate_gradient dark_gradient text-3xl font-black text-left">
            <span className="dark:slate_gradient dark_gradient">{searchText} Hours</span>
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm" id="dialog-description">
          Adding Hours lets you add gameplay hours for this game. The link below will open a new tab with completion
          hours from HowLongToBeat. Take a look at the hours listed there and then come back here to add them here.
        </p>
        <div className="flex flex-col items-center justify-center space-y-8 my-8">
          <a href={`https://howlongtobeat.com/?q=${searchText}`} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary">Open HowLongToBeat</button>
          </a>

          <form onSubmit={e => handleSubmitHours(e, hours)} className="space-y-4 w-full">
            <div className="flex flex-col justify-center mx-auto max-w-[200px]">
              <Input
                type="number"
                placeholder={currentHours === '' ? '0' : currentHours.toString()}
                max={200}
                min={1}
                style={{
                  fontSize: '3rem',
                  paddingTop: '2rem',
                  paddingBottom: '2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                value={hours}
                onChange={e => setHours(parseInt(e.target.value))}
                required
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 btn-primary-round mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={hours === '' || submittingState._hours}
              >
                {submittingState['_hours'] ? (
                  <span className="animate-spin">
                    <Loader size={16} />
                  </span>
                ) : (
                  <PlusCircle size={16} />
                )}{' '}
                Add Hours
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
