import React from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

export default function BackButton(props) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={{ ...styles.btnContainer, ...props.style }}
    >
      <Image
        source={require('../assets/backArrow.png')}
        style={styles.btnIcon}
      />
    </TouchableHighlight>
  );
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    left: 5,
    top: 5,
  },
  btnIcon: {
    height: 17,
    width: 17,
  },
});
