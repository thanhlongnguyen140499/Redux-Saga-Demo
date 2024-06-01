import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeView, {RootStackParamList} from './src/views/HomeView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddUser from './src/views/AddUser';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeView"
            component={HomeView}
            options={{title: 'User List'}}
          />
          <Stack.Screen
            name="AddUser"
            component={AddUser}
            options={{title: 'Add User'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
