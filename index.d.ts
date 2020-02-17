import React from 'react';
import { ViewProps } from 'react-native';
interface SVGAPlayerProps extends ViewProps {
    onFinished?: () => void;
    onFrame?: (value: number) => void;
    onPercentage?: (value: number) => void;
    source: string;
}
interface SVGAPlayerState {
    source: string;
    toFrame: number;
    currentState: string;
    toPercentage: number;
}
export default class SVGAPlayer extends React.Component<SVGAPlayerProps, SVGAPlayerState> {
    constructor(props: Readonly<SVGAPlayerProps>);
    load(source: string): void;
    startAnimation(): void;
    pauseAnimation(): void;
    stopAnimation(): void;
    stepToFrame(toFrame: any, andPlay: boolean): void;
    stepToPercentage(toPercentage: any, andPlay: boolean): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
}
export {};
