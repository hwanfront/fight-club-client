import React from 'react'

interface DividerWithTextProps {
  text: string
}

export function DividerWithText({ text }: DividerWithTextProps) {
  return (
    <div className={`relative h-4`}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"></span>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background text-muted-foreground px-2">{text}</span>
      </div>
    </div>
  )
}
