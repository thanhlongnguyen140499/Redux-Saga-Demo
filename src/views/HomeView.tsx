/* eslint-disable react-hooks/exhaustive-deps */
import {View, Button, FlatList, StyleSheet} from 'react-native';
import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {FIREBASE_DOCUMENTS, USER_TYPE} from '../types/user';
import UserItem from './UserItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
};

export type RootStackParamList = {
  HomeView: undefined;
  AddUser: undefined;
};

type HomeViewScreenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'HomeView'
>;

type HomeViewProps = {
  navigation: HomeViewScreenNavigation;
};

const HomeView: FC<HomeViewProps> = ({navigation}) => {
  const [userList, setUserList] = useState<USER_TYPE[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate('AddUser')} />
      ),
    });
  }, []);

  // Ensure the Firebase app is initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    fetchDatabase();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection(FIREBASE_DOCUMENTS.users)
      .onSnapshot(documentSnapshot => {
        let usersTemp: USER_TYPE[] = [];
        const users = documentSnapshot.docs;
        users.forEach(user => {
          const newUser: USER_TYPE = user.data() as USER_TYPE;
          usersTemp.push(newUser);
          setUserList([...usersTemp]);
        });
      });

    return () => subscriber();
  }, []);

  const fetchDatabase = async () => {
    const users = await firestore().collection(FIREBASE_DOCUMENTS.users).get();

    let usersTemp: USER_TYPE[] = [];
    users.forEach(user => {
      const newUser: USER_TYPE = user.data() as USER_TYPE;
      usersTemp.push(newUser);
      setUserList([...usersTemp]);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({item}) => <UserItem user={item} />}
      />
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
