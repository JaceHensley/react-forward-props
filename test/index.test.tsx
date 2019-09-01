import React from 'react'

import {ComponentProps, FC, forwardRef, Component, forwardProps} from '../src/index'

describe('ComponentProps', () => {
  it('should allow not setting the second generic param', () => {
    ;({
      title: 'Title',
    } as ComponentProps<'div'>)
  })

  it('should combine props and HTML attributes', () => {
    type Props = {
      first: string
      second: string
    }

    type Combined = ComponentProps<'div', Props>
    ;({
      first: 'first',
      title: 'Title',
    } as Combined)
  })

  it('should combine accept given props type over the elements attributes if there is a conflicts', () => {
    type Props = {
      title: number
    }

    type Combined = ComponentProps<'div', Props>
    ;({
      title: 0,
    } as Combined)
  })
})

describe('FC', () => {
  it('should allow not setting the second generic param', () => {
    const Comp: FC<'div'> = () => <div />

    Comp({title: 'string'})
  })

  it('should combine props and HTML attributes', () => {
    type Props = {
      first: string
      second: string
    }

    const Comp: FC<'div', Props> = () => <div />

    Comp({first: 'string', second: 'string', title: 'string'})
  })

  it('should combine accept given props type over the elements attributes if there is a conflicts', () => {
    type Props = {
      title: number
    }

    const Comp: FC<'div', Props> = () => <div />

    Comp({title: 0})
  })
})

describe('forwardRef', () => {
  it('should allow not setting the second generic param', () => {
    forwardRef<'div'>((props, _) => {
      props.title as string
      return <div />
    })
  })

  it('should combine props and HTML attributes', () => {
    type Props = {
      first: string
      second: string
    }

    forwardRef<'div', Props>((props, _) => {
      props.title as string
      props.first as string
      props.second as string
      return <div />
    })
  })

  it('should combine accept given props type over the elements attributes if there is a conflicts', () => {
    type Props = {
      title: number
    }

    forwardRef<'div', Props>((props, _) => {
      props.title as number
      return <div />
    })
  })
})

describe('Component', () => {
  it('should allow not setting the second generic param', () => {
    class Comp extends Component<'div'> {
      render() {
        return <div />
      }
    }

    new Comp({title: 'title'})
  })

  it('should combine props and HTML attributes', () => {
    type Props = {
      first: string
      second: string
    }

    class Comp extends Component<'div', Props> {
      render() {
        return <div />
      }
    }

    new Comp({first: 'string', second: 'string', title: 'title'})
  })

  it('should combine accept given props type over the elements attributes if there is a conflicts', () => {
    type Props = {
      title: number
    }

    class Comp extends Component<'div', Props> {
      render() {
        return <div />
      }
    }

    new Comp({title: 0})
  })
})

describe('forwardProps', () => {
  it('should remove the given keys from the object and type', () => {
    type Props = {
      first: string
      second: string
    }
    const props: Props = {
      first: 'value',
      second: 'value',
    }

    const cleanedProps: Omit<Props, 'first'> = forwardProps(props, 'first')

    expect(cleanedProps).toMatchObject({second: 'value'})
  })
})
