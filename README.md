# React Forward Props

Easily have your custom React components forward their props to a child

<a href="https://npmjs.com/package/react-forward-props" target="_blank" rel="noopener noreferrer">
  <img alt="" src="https://img.shields.io/npm/dm/react-forward-props.svg?style=flat-square" />
</a>
<a href="https://bundlephobia.com/result?p=react-forward-props@latest" target="_blank" rel="noopener noreferrer">
  <img alt="" src="https://img.shields.io/bundlephobia/minzip/react-forward-props@latest?style=flat-square" />
</a>
<a href="https://github.com/jacehensley/react-forward-props" target="_blank" rel="noopener noreferrer">
  <img alt="" src="https://img.shields.io/github/stars/jacehensley/react-forward-props.svg?style=flat-square&label=Star" />
</a>

- [React Forward Props](#react-forward-props)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Example](#example)
    - [Omit Keys From The Base Attributes](#omit-keys-from-the-base-attributes)
  - [Reason](#reason)
  - [Forwarding To Custom Components](#forwarding-to-custom-components)

## Installation

```
npm install react-forward-props
```

## Usage

`react-forward-props` comes with a few tools to let your components pass their props to what they are rendering.

- `forwardProps` removes used props in a strongly typed way.
- `FC`, `forwardRef`, and `Component` are type wrappers that add two generic parameters before any existing generic parameters.
  - The first is allowed to be a key of `JSX.IntrinsicElements` (any HTML tag name: 'div', 'a', etc.).
  - The second is the component's custom props. When there is a conflict between a custom prop type and an HTML attribute the custom prop type is accepted.

### Example

```tsx
import React from 'react'
import {FC, forwardProps, ComponentProps} from 'react-forward-props'

type MyCompProps = {
  myCustomProp: string
  title: number // overriding the `title: string` type that comes with HTMLAttributes
}

const MyComp1 = FC<'div', MyCompProps> = props => {
  // Warns that type `title: number` does not match type `title: string`
  return <div {...forwardProps(props, 'myCustomProp')} />
}

const MyComp2 = FC<'div', MyCompProps> = props => {
  // Does not warn
  return <div {...forwardProps(props, 'myCustomProp', 'title')} />
}

// You can also use the `ComponentProps` type and use the standard React.FC(.Component/.forwardRef)

type MyCompProps2 = ComponentProps<'div', {
  myCustomProp: string
  title: number // overriding the `title: string` type that comes with HTMLAttributes
}>

const MyComp3 = React.FC<MyCompProps2> = props => {
  // Does not warn
  return <div {...forwardProps(props, 'myCustomProp', 'title')} />
}
```

### Omit Keys From The Base Attributes

If you're component doesn't support all the attributes of the base HTML element then you can omit the keys with the third generic parameter:

```tsx
import {FC, forwardProps} from 'react-forward-props'

type MyCompProps = {
  to: string
}

const MyComp1 = FC<'a', MyCompProps, 'href'> = props => {
  return <div {...forwardProps(props, 'to')} href={props.to} />
}
```

## Reason

This library aims to help make custom components easily customizable by allowing any valid HTML attribute to be set on the component and forwared to the rendered HTML element (and avoid passing invalid HTML attributes).

By providing the type of element the props are going to be forwarded to you restrict the props to only valid ones.

```tsx
import React from 'react'
import clsx from 'clsx'
import {FC, forwardProps} from 'react-forward-props'

type ButtonProps = {
  size: 'sm' | 'md' 'lg'
}

const Button: FC<'button', ButtonProps> = props =>(
  <button
    {...cleanProps(props, 'size')}
    className={clsx('btn', `btn--${props.size}`, props.className)}
  >
    {props.children}
  </button>
)

const App: React.FC = props => (
  <Button size="md" type="button" onClick={() => window.alert('Button clicked!')}>Click Me!</Button>
)
```

## Forwarding To Custom Components

You can even forward to custom components!

```tsx
import React from 'react'
import clsx from 'clsx'
import {FC, forwardProps} from 'react-forward-props'

type ButtonProps = {
  size: 'sm' | 'md' 'lg'
}

const Button: FC<'button', ButtonProps> = props =>(
  <button
    {...forwardProps(props, 'size')}
    className={clsx('btn', `btn--${props.size}`, props.className)}
  >
    {props.children}
  </button>
)

type DropdownButtonProps = ButtonProps & {
  isOpen: boolean
  displayValue: React.ReactNode
}

const DropdownButton: FC<'button', DropdownButtonProps> = props => (
  <div className={clsx('dropdown-btn', {'dropdown-btn--open': props.isOpen}})>
    <Button
      {...forwardProps(props, 'isOpen')}
      className={clsx('dropdown-btn__trigger', props.className)}
    >
      {props.displayValue}
    </Button>
    {props.children}
  </div>
)

<DropdownButton size="lg" className="my-dropdown-btn">
  {/* DropdownMenu... */}
</DropdownButton>
```
