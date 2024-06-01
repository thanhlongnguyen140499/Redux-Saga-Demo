import {View, Alert, Button, TextInput, StyleSheet} from 'react-native';
import React, {FC, memo, useCallback, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './HomeView';

interface AddUserProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddUser'>;
}

const AddUser: FC<AddUserProps> = ({navigation}) => {
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(0);
  const [userSchool, setUserSchool] = useState<string>('');

  const addUser = useCallback(async () => {
    try {
      const res = await firestore().collection('Users').add({
        name: userName,
        age: userAge,
        school: userSchool,
      });

      console.log('res: ', res.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding user: ', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  }, [navigation, userName, userAge, userSchool]);

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
      <TextInput
        style={styles.textInput}
        value={userSchool}
        onChangeText={setUserSchool}
        placeholder="School"
      />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

export default memo(AddUser);

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
