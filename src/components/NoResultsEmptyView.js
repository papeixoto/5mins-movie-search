import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const NoResultsEmptyView = () => {
  return (
    <View style={styles.contentContainer}>
      <Image
        style={styles.image}
        source={require('../assets/no_results.png')}
      />
      <Text style={styles.tipText}>No Results :(</Text>
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

export default NoResultsEmptyView;
