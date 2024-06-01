import {Button, StyleSheet, Text, View} from 'react-native';
import React, {FC, memo} from 'react';
import {FIREBASE_DOCUMENTS, USER_TYPE} from '../types/user';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface UserItemProps {
  user: USER_TYPE;
}

const RightActions: FC<UserItemProps> = item => {
  const removeUser = async () => {
    try {
      await firestore()
        .collection(FIREBASE_DOCUMENTS.users)
        .doc(item.user.id)
        .delete();
    } catch (error: any) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.rightAction}>
      <Button onPress={removeUser} title="Delete" color="white" />
    </View>
  );
};

const UserItem: FC<UserItemProps> = ({user}) => {
  return (
    <Swipeable renderRightActions={() => <RightActions user={user} />}>
      <View style={styles.item}>
        <Text style={styles.title}>{user.name}</Text>
        <Text>Age: {user.age}</Text>
        <Text>School: {user.school}</Text>
      </View>
    </Swipeable>
  );
};

export default memo(UserItem);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  leftAction: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    marginVertical: 8,
    marginRight: 16,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    paddingHorizontal: 10,
    fontWeight: '600',
  },
});
