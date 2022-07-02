import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardImage = (props) => {
  const { image } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardImage}
      onPress={() => navigation.navigate('ImageScreen', { image })}
    >
      <Image
        source={{
          uri: image.src.medium
            ? image.src.medium
            : 'https://www.hazteveg.com/img/empty-photo.jpg',
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '49.5%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#2c292c',
    borderWidth: 0,
    borderRadius: 5,
    margin: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
});

export default CardImage;
