import React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import ContentLoader, { Rect } from '../../lib/RNContentLoader';

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
});

export interface SerializableCartItemGhostProps {
  style?: ViewStyle;
  contentBackgroundColor?: string;
  contentForegroundColor?: string;
  width?: number;
  height: number;
}

export interface CartItemGhostProps
  extends Omit<
    SerializableCartItemGhostProps,
    'contentBackgroundColor' | 'contentForegroundColor' | 'height' | 'style' | 'width'
  > {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  contentBackgroundColor?: string;
  contentForegroundColor?: string;
}

export const CartItemGhost: React.FC<CartItemGhostProps> = React.memo((props) => {
  const {
    contentBackgroundColor,
    contentForegroundColor,
    height = 232,
    style,
    width = 350,
  } = props;

  const title = {
    width: 290,
    height: 23,
    x: 0,
    y: 0,
  };
  const image = {
    width: 132,
    height: 155,
    x: 0,
    y: title.y + title.height + 12,
  };
  const wishlist = {
    width: 138,
    height: 31,
    x: 0,
    y: image.y + image.height + 7,
  };
  const price = {
    width: 162,
    height: 22,
    x: image.width + 27,
    y: title.y + title.height + 18,
  };
  const line1 = {
    width: 162,
    height: 12,
    x: image.width + 27,
    y: price.y + price.height + 9,
  };
  const line2 = {
    width: 162,
    height: 14,
    x: image.width + 27,
    y: line1.y + line1.height + 9,
  };
  const line3 = {
    width: 162,
    height: 14,
    x: image.width + 27,
    y: line2.y + line2.height + 9,
  };
  const stepper = {
    width: 162,
    height: 45,
    x: image.width + 27,
    y: line3.y + line3.height + 38,
  };

  return (
    <View style={[styles.itemContainer, style]}>
      <ContentLoader
        backgroundColor={contentBackgroundColor || '#EFEFEF'}
        foregroundColor={contentForegroundColor || '#F9F9F9'}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
      >
        <Rect rx="4" ry="4" {...title} />
        <Rect rx="4" ry="4" {...image} />
        <Rect rx="19" ry="19" {...wishlist} />
        <Rect rx="4" ry="4" {...price} />
        <Rect rx="4" ry="4" {...line1} />
        <Rect rx="4" ry="4" {...line2} />
        <Rect rx="4" ry="4" {...line3} />
        <Rect rx="4" ry="4" {...stepper} />
      </ContentLoader>
    </View>
  );
});
