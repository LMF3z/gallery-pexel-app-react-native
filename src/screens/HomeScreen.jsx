import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { getImagesFromAPI } from '../API/handlePhotosApi';
import ImageList from '../Components/ImageList';

const HomeScreen = (props) => {
  const { openSearch } = props;

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorHandler, setErrorHandler] = useState(null);
  const [toSearch, setToSearch] = useState('');

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async (text = 'programing') => {
    try {
      const response = await getImagesFromAPI(text);
      setPhotos(response.data.photos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorHandler(true);
      console.log('error al obtener imagénes', error);
    }
  };

  const handleSearch = async () => {
    await getImages(toSearch);
  };

  return (
    <>
      {openSearch && (
        <View style={styles.containerInputSearch}>
          <Input
            leftIcon={{ type: 'feather', name: 'search', color: '#fff' }}
            leftIconContainerStyle={styles.searchInputIcon}
            placeholder="Search image theme"
            inputContainerStyle={styles.searchInput}
            inputStyle={{ color: '#fff' }}
            onChangeText={(value) => setToSearch(value)}
          />
          <Button
            title="search"
            buttonStyle={styles.searchButton}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        {errorHandler && <Text>Error al cargar imagénes</Text>}
        {photos.length > 0 && (
          <>
            <Text style={styles.resultsText}>Total</Text>
            <ImageList photos={photos} />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsText: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#d0d0d0',
    textAlign: 'right',
    width: '100%',
  },
  containerInputSearch: {
    backgroundColor: '#0d0d0d',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 50,
    flex: 1 / 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputIcon: {
    paddingStart: 2,
    marginRight: 7,
  },
  searchInput: {
    backgroundColor: '#2c292c',
    borderBottomWidth: 0,
    color: '#fff',
    width: '100%',
    paddingHorizontal: 4,
    paddingLeft: 10,
  },
  searchButton: {
    height: '65%',
    backgroundColor: '#228783',
    marginBottom: 30,
  },
});

export default HomeScreen;
