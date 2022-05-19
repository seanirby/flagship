import React from 'react';

import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { EngagementContext } from '../lib/contexts';
import type { Action, ScreenProps } from '../types';

import { ImageBlock } from './ImageBlock';
import { TextBlock } from './TextBlock';

export interface RecipeBlockProps extends ScreenProps {
  items: any;
  thumbnail: any;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const styles = StyleSheet.create({
  container: {},
  recipeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkContainer: {
    width: '100%',
  },
  imageStyle: {
    width: 19,
    height: 23,
    resizeMode: 'cover',
  },
  whenIcon: {
    width: 20,
    height: 20,
  },
  imageContainer: {
    width: 20,
    alignItems: 'center',
    paddingTop: 2,
    marginRight: 7,
  },
  recipeTitle: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'normal',
  },
  eventText: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const RecipeBlock: React.FC<RecipeBlockProps> = React.memo((props) => {
  const { containerStyle, items, textStyle } = props;

  const { handleAction } = React.useContext(EngagementContext);

  const onButtonPress = (actions: Action) => (): void => {
    if (actions && actions.type && handleAction) {
      handleAction({
        ...actions,
      });
    }
  };

  const recipeItems = (items || []).map((item: any, index: number) => (
    <View key={index}>
      {item.link ? (
        <TouchableOpacity
          onPress={onButtonPress(item.link.actions)}
          activeOpacity={0.8}
          style={[styles.linkContainer, styles.recipeContainer]}
        >
          {item.thumbnail && item.thumbnail.source && (
            <ImageBlock
              source={item.thumbnail.source}
              containerStyle={styles.imageContainer}
              imageStyle={[styles.whenIcon, item.thumbnail.customSize]}
            />
          )}
          <View style={styles.eventText}>
            <TextBlock
              text={item.text}
              textStyle={[styles.recipeTitle, textStyle, { textDecorationLine: 'underline' }]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.recipeContainer}>
          {item.thumbnail && item.thumbnail.source && (
            <ImageBlock
              source={item.thumbnail.source}
              containerStyle={styles.imageContainer}
              imageStyle={[styles.whenIcon, item.thumbnail.customSize]}
            />
          )}
          <View
            style={[
              styles.eventText,
              !(item.thumbnail && item.thumbnail.source) && { marginLeft: 27 },
            ]}
          >
            <TextBlock text={item.text} textStyle={[styles.recipeTitle, textStyle]} />
          </View>
        </View>
      )}
    </View>
  ));

  return <View style={[styles.container, containerStyle]}>{recipeItems}</View>;
});
