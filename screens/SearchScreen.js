import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const SearchScreen = (props) => {
  const { navigation } = props;

  // const [isGlutenFree, setIsGlutenFree] = useState(false);
  // const [isLactoseFree, setIsLactoseFree] = useState(false);
  // const [isVegan, setIsVegan] = useState(false);
  // const [isVegetarian, setIsVegetarian] = useState(false);

  // const dispatch = useDispatch();

  // const saveFilters = useCallback(() => {
  //   const appliedFilters = {
  //     isGlutenFree,
  //     isLactoseFree,
  //     isVegan,
  //     isVegetarian,
  //   };

  //   dispatch(setFilters(appliedFilters));
  // }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  // useEffect(() => {
  //   props.navigation.setParams({ save: saveFilters });
  // }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text>Search Screen</Text>
    </View>
  );
};

SearchScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Search Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
});

export default SearchScreen;
