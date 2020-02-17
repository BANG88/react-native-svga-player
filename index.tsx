import React from 'react'
import { requireNativeComponent, Platform, ViewProps } from 'react-native'
const RNSvgaPlayer = requireNativeComponent('RNSvgaPlayer')

interface SVGAPlayerProps extends ViewProps {
  onFinished?: () => void
  onFrame?: (value: number) => void
  onPercentage?: (value: number) => void
  source: string
}
interface SVGAPlayerState {
  source: string
  toFrame: number
  currentState: string
  toPercentage: number
}
export default class SVGAPlayer extends React.Component<
  SVGAPlayerProps,
  SVGAPlayerState
> {
  constructor(props: Readonly<SVGAPlayerProps>) {
    super(props)
    this.state = {} as any
  }
  load(source: string) {
    this.setState({
      source,
    })
  }
  startAnimation() {
    this.setState({
      currentState: 'start',
    })
  }
  pauseAnimation() {
    this.setState({
      currentState: 'pause',
    })
  }
  stopAnimation() {
    this.setState({
      currentState: 'stop',
    })
  }
  stepToFrame(toFrame: any, andPlay: boolean) {
    this.setState(
      {
        currentState: andPlay === true ? 'play' : 'pause',
        toFrame: -1,
      },
      () => {
        this.setState({
          toFrame,
        })
      }
    )
  }
  stepToPercentage(toPercentage: any, andPlay: boolean) {
    this.setState(
      {
        currentState: andPlay === true ? 'play' : 'pause',
        toPercentage: -1,
      },
      () => {
        this.setState({
          toPercentage,
        })
      }
    )
  }
  componentWillUnmount() {
    this.stopAnimation()
  }
  render() {
    if (!this.props.source) {
      return null
    }
    let eventListeners: any = {}
    if (Platform.OS === 'android') {
      eventListeners.onChange = (event: {
        nativeEvent: { value?: any; action?: any }
      }) => {
        const { action } = event.nativeEvent
        if (action === 'onFinished') {
          if (typeof this.props.onFinished === 'function') {
            this.props.onFinished()
          }
        } else if (action === 'onFrame') {
          if (typeof this.props.onFrame === 'function') {
            this.props.onFrame(event.nativeEvent.value)
          }
        } else if (action === 'onPercentage') {
          if (typeof this.props.onPercentage === 'function') {
            this.props.onPercentage(event.nativeEvent.value)
          }
        }
      }
    } else if (Platform.OS === 'ios') {
      if (typeof this.props.onFrame === 'function') {
        eventListeners.onFrame = (event: {
          nativeEvent: { value: number }
        }) => {
          this.props.onFrame!(event.nativeEvent.value)
        }
      }
      if (typeof this.props.onPercentage === 'function') {
        eventListeners.onPercentage = (event: {
          nativeEvent: { value: number }
        }) => {
          this.props.onPercentage!(event.nativeEvent.value)
        }
      }
    }
    return <RNSvgaPlayer {...this.props} {...this.state} {...eventListeners} />
  }
}
