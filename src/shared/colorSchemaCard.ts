import { COLOR, type ColorT } from "./colors"

const schema: schemaT = {
  red: {
    background: COLOR.RED,
    text: COLOR.WHITE,
  },
  blue: {
    background: COLOR.ACCENT,
    text: COLOR.TEXT,
  },
  black: {
    background: COLOR.MAIN,
    text: COLOR.TEXT,
  },
  textgray: {
    background: COLOR.SECOND,
    text: COLOR.WHITE,
  },
  gray: {
    background: COLOR.SECOND,
    text: COLOR.WHITE,
  },
  green: {
    background: COLOR.TEXT,
    text: COLOR.ACCENT,
  },
  white: {
    background: COLOR.WHITE,
    text: COLOR.RED,
  },
  orange: {
    background: COLOR.ORANGE,
    text: COLOR.WHITE,
  },
}

export type ColorItemT = {
  background: ColorT
  text: ColorT
}
export type ColorItemCardT = {
  name: ColorsKey
  background: ColorT
  text: ColorT
}

type schemaT = Record<ColorsKey, ColorItemT>

type SchemaKey = keyof typeof schema

export default function colorSchemaCard(colorSchema: ColorsKey): {
  background: ColorT
  text: ColorT
} {
  return schema[colorSchema as SchemaKey]
}

export enum ColorsKey {
  RED = "red",
  BLUE = "blue",
  BLACK = "black",
  GRAY = "gray",
  TEXTGRAY = "textgray",
  GREEN = "green",
  WHITE = "white",
  ORANGE = "orange",
}

export const schemaColorCrard: ColorItemCardT[] = [
  {
    name: ColorsKey.TEXTGRAY,
    background: COLOR.WHITE,
    text: COLOR.SECOND,
  },
  {
    name: ColorsKey.BLUE,
    background: COLOR.ACCENT,
    text: COLOR.TEXT,
  },
  {
    name: ColorsKey.BLACK,
    background: COLOR.MAIN,
    text: COLOR.TEXT,
  },
  {
    name: ColorsKey.GRAY,
    background: COLOR.SECOND,
    text: COLOR.WHITE,
  },

  {
    name: ColorsKey.GREEN,
    background: COLOR.TEXT,
    text: COLOR.ACCENT,
  },
  {
    name: ColorsKey.WHITE,
    background: COLOR.WHITE,
    text: COLOR.RED,
  },
  {
    name: ColorsKey.RED,
    background: COLOR.RED,
    text: COLOR.WHITE,
  },
  {
    name: ColorsKey.ORANGE,
    background: COLOR.ORANGE,
    text: COLOR.WHITE,
  },
]
