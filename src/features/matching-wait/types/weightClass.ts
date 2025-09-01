export enum WeightClass {
  LIGHT_FLY,
  FLY,
  BANTAM,
  FEATHER,
  LIGHT,
  LIGHT_WELTER,
  WELTER,
  LIGHT_MIDDLE,
  MIDDLE,
  LIGHT_HEAVY,
  HEAVY,
  SUPER_HEAVY,
}

export type WeightClassStrings = keyof typeof WeightClass

export type WeightClassData = {
  name: WeightClassStrings
  displayName: string
  upperLimit: number | null
}
