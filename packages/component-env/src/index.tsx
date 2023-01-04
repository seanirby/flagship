import { NativeModules } from 'react-native';

const env = {
  get current(): string {
    return NativeModules.Env.envName;
  },

  set current(value: string) {
    NativeModules.Env.setEnv(value);
  }
}