import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const SearchMoviesEmptyView = () => {
  return (
    <View style={styles.contentContainer}>
      <Image
        style={styles.image}
        source={require('../assets/search_movie.png')}
      />
      <Text style={styles.tipText}>Search for a movie</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
  tipText: {
    fontSize: 24,
  },
});

export default SearchMoviesEmptyView;
