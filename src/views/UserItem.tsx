import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {USER_TYPE} from '@/types/user';

interface UserItemProps {
  user: USER_TYPE;
}

const UserItem: FC<UserItemProps> = ({user}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>{user.age}</Text>
    </View>
  );
};

export default UserItem;

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
});
