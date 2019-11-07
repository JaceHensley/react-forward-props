import React from 'react'
import {O} from 'ts-toolbelt'

export type ComponentProps<K extends keyof JSX.IntrinsicElements, P extends {[key: string]: any} = {}> = O.Diff<
  JSX.IntrinsicElements[K],
  P
> &
  P

export type FC<K extends keyof JSX.IntrinsicElements, P extends {[key: string]: any} = {}> = React.FC<ComponentProps<K, P>>

export const forwardRef = <K extends keyof JSX.IntrinsicElements, P extends {[key: string]: any} = {}, T = any>(
  component: React.RefForwardingComponent<T, ComponentProps<K, P>>,
) => React.forwardRef<T, ComponentProps<K, P>>(component)

export class Component<K extends keyof JSX.IntrinsicElements, P extends {[key: string]: any} = {}, S = {}> extends React.Component<
  ComponentProps<K, P>,
  S
> {}

export const forwardProps = <P extends {[key: string]: any}, S extends string = ''>(props: P, ...rm: S[]): Omit<P, S> => {
  if (!rm || rm.length === 0) return {...props}
  const forwardedProps = {} as P
  const rmObj: {[key in S]?: true} = {}
  rm.forEach(key => {
    rmObj[key] = true
  })
  Object.keys(props).forEach(key => {
    if (!rmObj[key as S]) forwardedProps[key as S] = props[key]
  })
  return forwardedProps
}
