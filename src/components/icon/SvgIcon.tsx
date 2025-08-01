import React from 'react'

type SvgIconProps = {
  name: string
  width?: number
  height?: number
  className?: string
}

export function SvgIcon({ name, width, height, className }: SvgIconProps) {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/sprite.svg?#${name}`} />
    </svg>
  )
}
