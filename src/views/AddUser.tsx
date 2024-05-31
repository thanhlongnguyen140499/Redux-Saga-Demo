import {View, Alert, Button, TextInput, StyleSheet} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './HomeView';

interface AddUserProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddUser'>;
}

const AddUser: FC<AddUserProps> = ({navigation}) => {
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(0);

  const addUser = useCallback(async () => {
    try {
      const res = await firestore().collection('Users').add({
        name: userName,
        age: userAge,
      });

      console.log('res: ', res.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding user: ', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  }, [navigation, userName, userAge]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={userName}
        onChangeText={setUserName}
        placeholder="User Name"
      />
      <TextInput
        style={styles.textInput}
        value={userAge.toString()}
        onChangeText={age => setUserAge(Number(age))}
        keyboardType="numeric"
        placeholder="Age"
      />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  textInput: {
    lineHeight: 20,
    height: 40,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
