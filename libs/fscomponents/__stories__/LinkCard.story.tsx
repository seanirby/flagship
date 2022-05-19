import React from 'react';

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import {
  // boolean,
  object,
  text,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { LinkCard } from '../src/components/LinkCard';

const defaultTitleStyle: TextStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: 23,
  letterSpacing: 0.5,
};

const defaultSubtitleStyle: TextStyle = {
  fontSize: 15,
  lineHeight: 22,
  letterSpacing: 0.5,
};

const defaultImageStyle: ImageStyle = {
  marginBottom: 10,
  width: 300,
  height: 130,
};

const defaultStyle: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 41,
  paddingTop: 10,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: '#DBDBDB',
};

storiesOf('LinkCard', module).add('basic usage', () => (
  <LinkCard
    image={object('Image', { uri: 'https://via.placeholder.com/300x130' })}
    imageStyle={object('Image Style', defaultImageStyle)}
    style={object('Style', defaultStyle)}
    subtitle={text('Subtitle', 'Promo Subtitle')}
    subtitleStyle={object('Subtitle Style', defaultSubtitleStyle)}
    title={text('Title', 'Promo Title')}
    titleStyle={object('Title Style', defaultTitleStyle)}
  />
));
