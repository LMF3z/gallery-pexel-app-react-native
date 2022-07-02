import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { getImagesFromAPI } from '../API/handlePhotosApi';
import ImageList from '../Components/ImageList';

const ImageScreen = (props) => {
  const { route } = props;
  const { image } = route.params;

  const [resultBrowser, setResultBrowser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [errorHandler, setErrorHandler] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async (text = 'cars') => {
    try {
      const response = await getImagesFromAPI(text);
      setPhotos(response.data.photos);
    } catch (error) {
      setErrorHandler(true);
      console.log('error al obtener imagénes', error);
    }
  };

  const handlerPress = async () => {
    await WebBrowser.openBrowserAsync(image.url);
  };

  const downloadFile = async () => {
    const fileUrl = FileSystem.documentDirectory + image.id + '_pexel.jpeg';
    try {
      const { uri } = await FileSystem.downloadAsync(
        image.src.original,
        fileUrl
      );
      saveFile(uri);
    } catch (error) {
      console.log('error al descargar imagen');
    }
  };

  const saveFile = async (fileUrl) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUrl);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    }
  };

  const handlerDownload = async () => {
    await downloadFile();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.src.original, height: 350 }} />
      <View
        style={{
          display: 'flex',
          paddingVertical: 18,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View style={styles.containerAvatar}>
          <Avatar
            title={image.photographer
              .split(' ')
              .map((string) => string[0])
              .join('')
              .toUpperCase()}
            containerStyle={styles.avatar}
            rounded
          />
          <TouchableOpacity onPress={handlerPress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={styles.buttonDownload}
          onPress={handlerDownload}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 15,
  },
  containerAvatar: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    backgroundColor: 'red',
  },
  textPhotographer: {
    color: '#fff',
    fontWeight: 'bold',
    marginStart: 5,
    fontSize: 18,
  },
  buttonDownload: {
    backgroundColor: '#228783',
    borderRadius: 5,
  },
});

export default ImageScreen;
