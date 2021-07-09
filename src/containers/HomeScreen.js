import React, {useState} from 'react';
import {Alert, Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SearchBar} from 'react-native-elements';

import MovieListItem from '../components/MovieListItem.js';

import {searchMovies} from '../api/themoviedb.js';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [showSearchBarLoading, setShowSearchBarLoading] = useState(false);

  const onSearchTextChange = text => {
    setSearchText(text);
    if (text) {
      getMoviesFromApi(text);
      setShowSearchBarLoading(true);
    } else {
      setMovies([]);
    }
  };

  const getMoviesFromApi = async query => {
    try {
      const response = await searchMovies(query);
      setMovies(response);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error fetching movies, please try again');
    }
    setShowSearchBarLoading(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SearchBar
          style={styles.searchBar}
          placeholder="Type Here To Search..."
          onChangeText={onSearchTextChange}
          value={searchText}
          showLoading={showSearchBarLoading}
          lightTheme
        />
        {movies.length ? (
          <FlatList
            data={movies}
            renderItem={({item}) => (
              <MovieListItem
                onPress={() => {
                  console.log('press');
                  navigation.navigate('Movie', {movieId: item.id});
                }}
                movie={item}
              />
            )}
          />
        ) : null}
        {!searchText ? (
          <View style={styles.contentContainer}>
            <Image
              style={styles.image}
              source={require('../assets/search_movie.png')}
            />
            <Text style={styles.tipText}>Search for a movie</Text>
          </View>
        ) : null}
        {searchText && !movies.length ? (
          <View style={styles.contentContainer}>
            <Image
              style={styles.image}
              source={require('../assets/no_results.png')}
            />
            <Text style={styles.tipText}>No Results :(</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 60,
    padding: 15,
    color: 'black',
  },
  tipText: {
    fontSize: 24,
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default HomeScreen;
