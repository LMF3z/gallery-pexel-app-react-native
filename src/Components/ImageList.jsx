import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CardImage from './CardImage';

const ImageList = ({ photos }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) => <CardImage image={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '#ff0000',
    borderWidth: 2,
  },
});

export default ImageList;
