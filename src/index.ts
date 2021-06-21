import React from 'react'
import { O } from 'ts-toolbelt'

export type ComponentProps<
  Element extends keyof JSX.IntrinsicElements,
  Props extends { [key: string]: any } = {},
  Exclude extends keyof JSX.IntrinsicElements[Element] = never,
> = O.Diff<Omit<JSX.IntrinsicElements[Element], 'ref' | 'key' | Exclude>, Props> & Props

export type FC<
  Element extends keyof JSX.IntrinsicElements,
  Props extends { [key: string]: any } = {},
  Exclude extends keyof JSX.IntrinsicElements[Element] = never,
> = React.FC<ComponentProps<Element, Props, Exclude>>

export const forwardRef = <
  Element extends keyof JSX.IntrinsicElements,
  Props extends { [key: string]: any } = {},
  T = any,
  Exclude extends keyof JSX.IntrinsicElements[Element] = never,
>(
  component: React.ForwardRefRenderFunction<T, ComponentProps<Element, Props, Exclude>>,
) => React.forwardRef<T, ComponentProps<Element, Props, Exclude>>(component)

export class Component<
  Element extends keyof JSX.IntrinsicElements,
  Props extends { [key: string]: any } = {},
  S = {},
  Exclude extends keyof JSX.IntrinsicElements[Element] = never,
> extends React.Component<ComponentProps<Element, Props, Exclude>, S> {}

export const forwardProps = <P extends { [key: string]: any }, S extends string = ''>(props: P, ...rm: S[]): Omit<P, S> => {
  if (!rm || rm.length === 0) return { ...props }
  const forwardedProps = {} as P
  const rmObj: { [key in S]?: true } = {}
  rm.forEach((key) => {
    rmObj[key] = true
  })
  Object.keys(props).forEach((key) => {
    if (!rmObj[key as S]) forwardedProps[key as S] = props[key]
  })
  return forwardedProps
}
