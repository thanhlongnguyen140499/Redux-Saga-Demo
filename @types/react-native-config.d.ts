declare module 'react-native-config' {
  export interface NativeConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
