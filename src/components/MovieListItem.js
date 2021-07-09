import React from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';

const monthNumberToText = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

const MovieListItem = ({movie, onPress}) => {
  const formatDate = date => {
    const [year, month] = date.split('-');
    return `${monthNumberToText[month]} of ${year}`;
  };

  const imgSource = movie.poster_path
    ? {uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    : require('../assets/movie_poster_placeholder.png');
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={imgSource} style={styles.poster} />
        <View style={styles.movieDataContainer}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {movie.original_title}
          </Text>
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
          <Text>
            {movie?.release_date
              ? formatDate(movie.release_date)
              : 'No date of release'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    flex: 1,
  },
  poster: {
    // posters are generally 500 * 750 so this should keep the aspect ratio ok in most of the cases
    width: 100,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  movieDataContainer: {
    margin: 10,
    flex: 1,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  movieRating: {
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MovieListItem;
