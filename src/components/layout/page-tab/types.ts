export type PageTabMode = 'button' | 'chrome'

export interface PageTabProps {
  darkMode?: boolean
  mode?: PageTabMode
  commonClass?: string
  buttonClass?: string
  chromeClass?: string
  active?: boolean
  activeColor?: string
  closable?: boolean
}

export type PageTabCssVarsProps = {
  primaryColor: string
  primaryColor1: string
  primaryColor2: string
  primaryColorOpacity1: string
  primaryColorOpacity2: string
  primaryColorOpacity3: string
}

type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

type Prefix = '--dy-'

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S

export type PageTabCssVars = {
  [K in keyof PageTabCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}
