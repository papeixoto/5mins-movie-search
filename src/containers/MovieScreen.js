import React, {useState, useEffect} from 'react';
import {Alert, Text, View, Image, StyleSheet} from 'react-native';
import {Rating} from 'react-native-elements';

import {getMovieById} from '../api/themoviedb.js';

const MovieScreen = ({navigation, route}) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const movieId = route.params.movieId;
      console.log('antes de chamar');
      const response = await getMovieById(movieId);
      console.log(response);
      setMovie(response);
      console.log('321');
    };
    try {
      getMovie();
    } catch (error) {
      console.log('123');
      console.error(error);
      Alert.alert('Error', 'Error fetching movie, please try again');
    }
  }, [route.params.movieId]);

  const getImgSource = () =>
    movie.poster_path
      ? {uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      : require('../assets/movie_poster_placeholder.png');

  return movie ? (
    <View style={styles.container}>
      <Image source={getImgSource()} style={styles.poster} />
      <Text style={styles.movieTitle}>{movie.original_title}</Text>
      <View style={styles.flexRow}>
        {movie.genres.map(genre => (
          <View style={styles.genreContainer}>
            <Text style={styles.genre}>{genre.name}</Text>
          </View>
        ))}
      </View>
      <Rating
        ratingCount={10}
        count={movie.vote_average}
        fractions={10}
        startingValue={movie.vote_average}
        readonly
        ratingBackgroundColor="blue"
        imageSize={25}
        defaultRating={0}
        tintColor="#f4f4f4"
        style={styles.rating}
        ratingTextColor="blue"
      />
      <Text style={styles.movieRating}>
        {movie?.vote_count ? (
          <>
            <Text style={styles.bold}>{movie.vote_average}</Text>
            <Text>{` / 10 (${movie.vote_count} votes)`}</Text>
          </>
        ) : (
          'No votes yet'
        )}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  poster: {
    width: 250,
    height: 375,
    resizeMode: 'contain',
    borderRadius: 15,
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  genreContainer: {
    backgroundColor: 'royalblue',
    padding: 5,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  genre: {
    color: 'white',
  },
  rating: {
    marginTop: 20,
  },
  overviewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  overviewTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  overviewText: {
    textAlign: 'justify',
  },
  flexRow: {
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MovieScreen;
