import React from 'react';
import { requireNativeComponent, Platform } from 'react-native';
const RNSvgaPlayer = requireNativeComponent('RNSvgaPlayer');
export default class SVGAPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    load(source) {
        this.setState({
            source,
        });
    }
    startAnimation() {
        this.setState({
            currentState: 'start',
        });
    }
    pauseAnimation() {
        this.setState({
            currentState: 'pause',
        });
    }
    stopAnimation() {
        this.setState({
            currentState: 'stop',
        });
    }
    stepToFrame(toFrame, andPlay) {
        this.setState({
            currentState: andPlay === true ? 'play' : 'pause',
            toFrame: -1,
        }, () => {
            this.setState({
                toFrame,
            });
        });
    }
    stepToPercentage(toPercentage, andPlay) {
        this.setState({
            currentState: andPlay === true ? 'play' : 'pause',
            toPercentage: -1,
        }, () => {
            this.setState({
                toPercentage,
            });
        });
    }
    componentWillUnmount() {
        this.stopAnimation();
    }
    render() {
        if (!this.props.source) {
            return null;
        }
        let eventListeners = {};
        if (Platform.OS === 'android') {
            eventListeners.onChange = (event) => {
                const { action } = event.nativeEvent;
                if (action === 'onFinished') {
                    if (typeof this.props.onFinished === 'function') {
                        this.props.onFinished();
                    }
                }
                else if (action === 'onFrame') {
                    if (typeof this.props.onFrame === 'function') {
                        this.props.onFrame(event.nativeEvent.value);
                    }
                }
                else if (action === 'onPercentage') {
                    if (typeof this.props.onPercentage === 'function') {
                        this.props.onPercentage(event.nativeEvent.value);
                    }
                }
            };
        }
        else if (Platform.OS === 'ios') {
            if (typeof this.props.onFrame === 'function') {
                eventListeners.onFrame = (event) => {
                    this.props.onFrame(event.nativeEvent.value);
                };
            }
            if (typeof this.props.onPercentage === 'function') {
                eventListeners.onPercentage = (event) => {
                    this.props.onPercentage(event.nativeEvent.value);
                };
            }
        }
        return <RNSvgaPlayer {...this.props} {...this.state} {...eventListeners}/>;
    }
}
