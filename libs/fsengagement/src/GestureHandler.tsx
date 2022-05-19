import React, { Component } from 'react';

import type { PanResponderInstance } from 'react-native';
import { PanResponder, View } from 'react-native';

export interface GestureHandlerProps {
  onSwipe: () => void;
  setScrollEnabled: (enabled: boolean) => void;
}
export interface GestureHandlerState {
  stateSet: boolean;
}
export interface GestureState {
  dy: number;
  dx: number;
}
export default class GestureHandler extends Component<GestureHandlerProps, GestureHandlerState> {
  constructor(props: GestureHandlerProps) {
    super(props);
    this.state = {
      stateSet: false,
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  private readonly panResponder: PanResponderInstance;

  private readonly onMoveShouldSetPanResponder = (
    event: unknown,
    gestureState: GestureState
  ): boolean =>
    // don't set panresponder if we are tapping the card
    !(gestureState.dx === 0 && gestureState.dy === 0);

  private readonly onPanResponderMove = (event: unknown, gestureState: GestureState): void => {
    // if we make an initial gesture UP, we assume were attempting
    // a swipe up motion so freeze the carousel
    if (!this.state.stateSet && gestureState.dy <= -7 && Math.abs(gestureState.dx) < 7) {
      this.props.setScrollEnabled(false);
      this.setState({
        stateSet: true,
      });
    }
  };

  private readonly onPanResponderRelease = (event: unknown, gestureState: GestureState): void => {
    // if we have swiped up 50 pixels or more, swipe the story up into view
    // if not, cancel the swipe and re-enable the carousel
    if (gestureState.dy <= -50) {
      this.props.onSwipe();
    } else {
      this.props.setScrollEnabled(true);
    }
    this.setState({
      stateSet: false,
    });
  };

  public render(): JSX.Element {
    return (
      <View {...this.panResponder.panHandlers} collapsable={false}>
        {this.props.children}
      </View>
    );
  }
}
