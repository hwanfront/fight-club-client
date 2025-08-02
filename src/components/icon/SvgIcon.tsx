import React from 'react'

type SvgIconProps = {
  name: string
  width?: number
  height?: number
  className?: string
}

const spriteVersion = process.env.NEXT_PUBLIC_SPRITE_VERSION

export function SvgIcon({ name, className }: SvgIconProps) {
  const spriteUrl = spriteVersion
    ? `/sprite.svg?v=${spriteVersion}#${name}`
    : `/sprite.svg#${name}`

  return (
    <svg className={className} viewBox="0 0 35 35">
      <use href={spriteUrl} />
    </svg>
  )
}
