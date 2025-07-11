import { Game as GameType } from '@/types/game'

export interface HoursState {
  totalHours: number
  hoursCompleted: number
  hoursRemaining: number
}

export interface LibraryState {
  completions: number
  hours: HoursState | null
  sourceOfTruth: GameType[]
  filterType: string
  sortType: string
}

export type Action =
  | { type: 'SET_COMPLETIONS'; payload: number }
  | { type: 'SET_HOURS'; payload: HoursState }
  | { type: 'SET_SOURCE'; payload: GameType[] }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SORT'; payload: string }

export const initialState: LibraryState = {
  completions: 0,
  hours: null,
  sourceOfTruth: [],
  filterType: 'all',
  sortType: 'rating',
}

export function libraryReducer(state: LibraryState, action: Action): LibraryState {
  switch (action.type) {
    case 'SET_COMPLETIONS':
      return { ...state, completions: action.payload }
    case 'SET_HOURS':
      return { ...state, hours: action.payload }
    case 'SET_SOURCE':
      return { ...state, sourceOfTruth: action.payload }
    case 'SET_FILTER':
      return { ...state, filterType: action.payload }
    case 'SET_SORT':
      return { ...state, sortType: action.payload }
    default:
      return state
  }
}
