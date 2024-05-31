import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeView, {RootStackParamList} from './src/views/HomeView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddUser from './src/views/AddUser';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
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
  );
};

export default App;
