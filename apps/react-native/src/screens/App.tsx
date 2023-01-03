/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Section from '../components/Section';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPressLocationPermissions = () =>
    Platform.select({
      ios: request(PERMISSIONS.IOS.LOCATION_ALWAYS),
      android: request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
    });

  const onPressCameraPermissions = () =>
    Platform.select({
      ios: request(PERMISSIONS.IOS.CAMERA),
      android: request(PERMISSIONS.ANDROID.CAMERA),
    });

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <TouchableOpacity onPress={onPressLocationPermissions}>
            <Section title="Location Permissions">
              <Text>
                <Text style={styles.highlight}>Press Here</Text> to request
                location permissions.
              </Text>
            </Section>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCameraPermissions}>
            <Section title="Camera Permissions">
              <Text>
                <Text style={styles.highlight}>Press Here</Text> to request
                camera permissions.
              </Text>
            </Section>
          </TouchableOpacity>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
