import React from 'react'

type SvgIconProps = {
  name: string
  width?: number
  height?: number
  className?: string
}

const spriteVersion = process.env.NEXT_PUBLIC_SPRITE_VERSION

export function SvgIcon({ name, width, height, className }: SvgIconProps) {
  const spriteUrl = spriteVersion
    ? `/sprite.svg?v=${spriteVersion}#${name}`
    : `/sprite.svg#${name}`

  return (
    <svg className={className} width={width} height={height}>
      <use href={spriteUrl} />
    </svg>
  )
}
