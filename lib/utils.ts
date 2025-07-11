import { Game as GameType } from '@/types/game'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRatingStyle(rating: number) {
  switch (true) {
    case rating >= 94.6:
      return 'text-color-amazing border-color-amazing'
    case rating >= 84.6:
      return 'text-color-great border-color-great'
    case rating >= 79.6:
      return 'text-color-good border-color-good'
    case rating >= 69.6:
      return 'text-color-okay border-color-okay'
    default:
      return 'text-color-bad border-color-bad'
  }
}

export function getRatingText(rating: number) {
  switch (true) {
    case rating >= 94.6:
      return 'Amazing'
    case rating >= 84.6:
      return 'Its Great'
    case rating >= 79.6:
      return 'Its Good'
    case rating >= 69.6:
      return 'Its Okay'
    default:
      return 'Pass'
  }
}

export function getCompletionHours(game: GameType) {
  return game._gameplayHours?.gameplayMain ?? 'N/A'
}
