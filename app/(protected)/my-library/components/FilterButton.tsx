interface FilterButtonProps {
  label: string
  filterKey: string
  active: boolean
  colorClass?: string
  onClick: () => void
}

export default function FilterButton({ label, filterKey, active, colorClass = '', onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-label={`Filter by ${filterKey}`}
      onClick={onClick}
      className={`flex gap-2 items-center bg-gradient-to-r hover:brightness-110 text-white px-2 py-1 rounded-full min-w-[75px] font-medium mr-4 mb-2 ${
        active ? 'from-primary to-primary' : 'from-transparent to-transparent border border-primary brightness-50'
      }`}
    >
      <div className={`h-[10px] w-[10px] rounded-full mb-[2px] ${colorClass}`} />
      {label}
    </button>
  )
}
