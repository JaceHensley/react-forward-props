import React from 'react'
import {O} from 'ts-toolbelt'
import R from 'ramda'

export type ComponentProps<K extends keyof JSX.IntrinsicElements, P extends object = {}> = O.Diff<JSX.IntrinsicElements[K], P> & P

export type FC<K extends keyof JSX.IntrinsicElements, P extends object = {}> = React.FC<ComponentProps<K, P>>

export const forwardRef = <K extends keyof JSX.IntrinsicElements, P extends object = {}, T = any>(
  component: React.RefForwardingComponent<T, ComponentProps<K, P>>,
) => React.forwardRef<T, ComponentProps<K, P>>(component)

export class Component<K extends keyof JSX.IntrinsicElements, P extends object = {}, S = {}> extends React.Component<
  ComponentProps<K, P>,
  S
> {}

export const forwardProps = <P extends object = {}, S extends string = string>(props: P, ...rm: S[]) => R.omit(rm, props)
