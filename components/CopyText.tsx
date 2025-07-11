'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'

export default function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {text}
      <button
        onClick={handleCopy}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontSize: '1rem',
        }}
        aria-label="Copy text"
      >
        <Copy size="16" className="text-primary" />
      </button>
      {copied && <span style={{ fontSize: '12px', color: '#0080ff' }}>Copied!</span>}
    </p>
  )
}
